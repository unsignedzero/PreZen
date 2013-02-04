/*Created by David Tran (unsignedzero)
 *PreZen
 *
 *Allows one to "code" up a presentation aimed for browsers
 *This methodology will take a long longer than just using PowerPoint, or
 *related tools but on the flip side, if done correctly, will display
 *properly on mostly all devices that support the KineticJS Lib
 *and JavaScript. If text and locations are made to scale, then it will
 *work on all screen sizes too.
 *
 *Created 01-25-2013
 *Version 0.3.1.1
 */

var zxPowerPoint = (function(slideArray,width,height,maxLayerCount,containerName){

  var DEBUG = false;
  var showButtons = true;
  var hideButtons = isMobile() ? false : true;
  
//////////////////////////////////////////////////////////////////////////////
//Creates the default variables it needs/uses
  var stage = new Kinetic.Stage({
    container: containerName,
    width:  width,
    height: height,
  });

  var outlineShift = externOutlineShift;

  var globalFrontLayer   = new Kinetic.Layer();
  var globalBackLayer    = new Kinetic.Layer();
  var globalOutLayerAry  = [];
  var globalFadeUI       = false;
                              
  var timerLength = externTimer;
  
  var slideIndex = -1;
  var slideLayer = 0;
  var slideLayerMax = 0;
  var slideIndexMax = slideArray.length - 1;
  
  var globalCurAnim = {};
  var supportFunc = {};
//////////////////////////////////////////////////////////////////////////////
//Creates a settings object and passes it to the board
  var setObj = {};
    setObj.fontFamily = externFont;
    setObj.fontSize  = height/32;
    setObj.animTime  = 2000;
    setObj.maxLayerCount = maxLayerCount;
    setObj.outlineShift = externOutlineShift;
    setObj.minDim = width > height ? height : width;
    setObj.maxDim = width > height ? width : height;
    setObj.PI = Math.PI;
  var hasInitialized = false;

//////////////////////////////////////////////////////////////////////////////
//Creates a support object that passes local functions to the board
  supportFunc.left = function (temp){
    //Left justifies the graphical object
    temp.setOffset({
      x: 0
    });
    return (temp);
  };

  supportFunc.center = function (temp){
    //Center justifies the graphic object (hor only)
    temp.setOffset({
      x: temp.getWidth()>>1
    });
    return (temp);
  };

  supportFunc.right = function (temp){
    //Right justifies the graphical object
    temp.setOffset({
      x: temp.getWidth()
    });
    return (temp);
  };

  supportFunc.align = function(temp){
    //Centers the graphic object
    temp.setOffset({
      x: temp.getWidth()>>1,
      y: temp.getHeight()>>1
    });
    return (temp);
  };

  supportFunc.drawText = function(x,y,str,fontDelSize,font){
    //Faster call to drawText
    return new Kinetic.Text({
      x: x,
      y: y,

      fontSize: fontDelSize ? fontDelSize : height/32,
      fontFamily: font ? font : externFont,
      
      fill: 'black',
      text: str,
    });
  }

  supportFunc.createBullet = function(x,y,fontDelSize){
    fontDelSize = fontDelSize ? fontDelSize : height/32;
    //Creates bullets for text
    return new Kinetic.Circle({
      x: x-1.5*fontDelSize,
      y: y+fontDelSize/2,

      fill: 'black',
      radius: fontDelSize/2,
    });
  }

  supportFunc.drawPixelCircle = function (
      LocalLayer, width, height, side, size, alt){
    var floor = supportFunc.floor;
    var sqrt  = supportFunc.sqrt;
    var abs   = supportFunc.abs;

    var rad = size&1 ? (size>>1)-1 : size>>1;
    var sub = size&1 ? (size>>1) : (size>>1)- 0.5;

    var x, y, i, max, del, fill, tempval, stroke;

    LocalLayer.removeChildren();
    max = size * size;

    i = -1;
    del = side/size;
    
    stroke = size > 2 ? 'black' : 'grey';

    while( ++i < max ){
      x = floor(i / size);
      y = i % size;
      tempval = abs(sqrt((x-sub)*(x-sub) + (y-sub)*(y-sub))-rad);
      fill = tempval <= 0.5 ? 'black' : 'white';
      if ( alt && tempval <= 1.0 && tempval >= 0.5)
        fill = 'grey';

      LocalLayer.add( new Kinetic.Rect({
        x: width  + del * x,
        y: height + del * y,

        width:  del,
        height: del,

        fill: fill,
        stroke: stroke,
        strokeWidth: 3,
      }));
    }

    //Reference circle for demo
    if ( size > 3 )
      LocalLayer.add( new Kinetic.Circle({
        x: width + (side>>1) - 1,
        y: height + (side>>1) - 1,
        radius: side>>1,
        stroke: 'red',
        strokeWidth: 5,
      }));
    LocalLayer.draw();
  };

  supportFunc.clean = function(outLayerAry, setObj){
    var i, max;

    i = -1;
    max = setObj.maxLayerCount;
    while( ++i < max ){
      outLayerAry[i].removeChildren();
      outLayerAry[i].setOpacity(0.0);
    }
  }

  supportFunc.floor = Math.floor;

  supportFunc.abs = Math.abs;

  supportFunc.sqrt = Math.sqrt;

//////////////////////////////////////////////////////////////////////////////
  //Load functions
  function nextSegment(outLayerAry){
    //Call to load next anim if possible
    if (slideLayer+1 < slideLayerMax)
      fadeIn(outLayerAry[++slideLayer]).start();
    else
      nextSlide(outLayerAry);
  }

  function previousSegment(outLayerAry){    
    //Call to unload previous anim is possible
    if (slideLayer > 0)
      fadeOut(outLayerAry[slideLayer--]).start();
    else
      previousSlide(outLayerAry);
  }
  
  function nextSlide(outLayerAry){
    //Call to load the previous slide
    if (slideIndex < slideIndexMax)
      fadeOutAll(outLayerAry,loadNextSlide).start();
    else
      globalCurAnim.end=true;
  }

  function previousSlide(outLayerAry){    
    //Call to load the previous slide
    if (slideIndex > 0)
      fadeOutAll(outLayerAry,loadPreviousSlide).start();
    else
      globalCurAnim.end=true;
  }

  function loadNextSlide(){
    //Loads the next slide if possible
    if(slideIndex < slideIndexMax){
      slideLayer = 0;
      slideLayerMax = slideArray[++slideIndex](globalOutLayerAry,
      width, height, setObj, supportFunc);
      fadeIn(globalOutLayerAry[slideLayer]).start();
    }
  }

  function loadPreviousSlide(){
    //Loads the previous slide if possible
    if(slideIndex > 0){
      slideIndex -= 1;
      slideLayerMax = slideArray[slideIndex](globalOutLayerAry,
      width, height, setObj, supportFunc);
      slideLayer = slideLayerMax-1;
      fadeInAll(globalOutLayerAry).start();
    }
  }
//////////////////////////////////////////////////////////////////////////////
  //Internal Support Functions

  function getLayerStatus(OuterLayer){
    var i, max = slideLayerMax;
    var ret = [];

    i = -1;
    while( i++ < max )
      ret.push(OuterLayer[i].getOpacity() > 0.5 );

    return ret;
  }
  
//////////////////////////////////////////////////////////////////////////////
  //Animations for load functions
  function fadeIn(OutLayer, nextFunc){
    globalCurAnim.end = true;
    var localTimerLength = timerLength;
    
    globalCurAnim = new Kinetic.Animation(function(frame){
      OutLayer.setOpacity(frame.time/localTimerLength);

      if ( this.end ){
        frame.time = localTimerLength;
      }

      if ( frame.time >= timerLength ){
        this.stop();
        frame.time = 0;
        OutLayer.setOpacity(1.0);
        if ( nextFunc )
          nextFunc();
      }
    },OutLayer);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  }

  function fadeOut(OutLayer, nextFunc){
    //Fades out one layer and possibly run the nextFunc
    globalCurAnim.end = true;
    var localTimerLength = timerLength;

    globalCurAnim = new Kinetic.Animation(function(frame){
      OutLayer.setOpacity(1 - frame.time/localTimerLength);

      if ( this.end ){
        frame.time = localTimerLength;
      }

      if ( frame.time >= timerLength ){
        this.stop();
        frame.time = 0;
        OutLayer.setOpacity(0.0);
        if ( nextFunc )
          nextFunc();
      }
    },OutLayer);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  }
 
  function fadeInAll(OutLayerAry, nextFunc){
    //Fades in all layers, regardless of opacity
    globalCurAnim.end = true;
    var localTimerLength = timerLength;
    var curVal;
    var i,max = slideLayerMax;
    
    globalCurAnim = new Kinetic.Animation(function(frame){
      curVal = frame.time/localTimerLength;

      i = -1;
      while( i++ < max )
        OutLayerAry[i].setOpacity(curVal);

      if (this.end){
        frame.time = localTimerLength;
      }

      if (frame.time >= timerLength){
        this.stop();
        frame.time = 0;
        i = -1;
        while( i++ < max )
          OutLayerAry[i].setOpacity(1.0);
        if (nextFunc)
          nextFunc();
      }
    },stage);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  }

  function fadeInSelected(OutLayerAry, SelectAry, nextFunc){
    //Fades in selected layers, regardless of opacity
    globalCurAnim.end = true;
    var localTimerLength = timerLength;
    var curVal;
    var i,max = slideLayerMax;
    
    globalCurAnim = new Kinetic.Animation(function(frame){
      curVal = frame.time/localTimerLength;

      i = -1;
      while( i++ < max )
        if (SelectAry[i])
          OutLayerAry[i].setOpacity(curVal);

      if (this.end){
        frame.time = localTimerLength;
      }

      if (frame.time >= timerLength){
        this.stop();
        frame.time = 0;
        i = -1;
        while( i++ < max )
          if (SelectAry[i])
            OutLayerAry[i].setOpacity(1.0);
        if (nextFunc)
          nextFunc();
      }
    },stage);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  }
 
  function fadeOutAll(OutLayerAry, nextFunc, nextFuncArgs){
    //Fades out all layers, whose opacity is larger than 0.5
    globalCurAnim.end = true;
    var localTimerLength = timerLength;
    var curVal;
    var i,max = slideLayerMax;
    var seeLayer = [];

    i = -1;
    while( i++ < max )
      seeLayer.push(OutLayerAry[i].getOpacity() > 0.5);
    
    globalCurAnim = new Kinetic.Animation(function(frame){
      curVal = 1-frame.time/localTimerLength;

      i = -1;
      while( i++ < max )
        if(seeLayer[i])
          OutLayerAry[i].setOpacity(curVal);
      if (this.end){
        frame.time = localTimerLength;
      }

      if(frame.time >= localTimerLength){
        this.stop();
        frame.time = 0;
        i = -1;
        while( i++ < max )
          OutLayerAry[i].setOpacity(0.0);
        if (nextFunc)
          nextFunc(nextFuncArgs);
      }
    },stage);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  };
//////////////////////////////////////////////////////////////////////////////
  //Resize Functions

  function reSizeSupport( newWidth, newHeight ){
    //Loads the new values to resize the screen

    //Add ratio checks
    width  = newWidth;
    height = newHeight;
    
    //Update Code
    setObj.fontSize = height/32;
    setObj.minDim   = width > height ? height : width;
    setObj.maxDim   = width > height ? width  : height;

    stage.setWidth(newWidth);
    stage.setHeight(newHeight);
  }

  function reSize(OutLayerAry, width, height){
    //Call this function to reszie the screen
    //Save State
    globalFadeUI = true;

    var funcArgs = {};
    funcArgs.OutLayerAry = OutLayerAry;
    funcArgs.state = getLayerStatus(OutLayerAry);
    funcArgs.width = width;
    funcArgs.height = height;

    //Fade Out
    fadeOutAll(OutLayerAry, function(funcArgs){
      //On Animation finish...
      reSizeSupport(funcArgs.width, funcArgs.height);
      reSizeFadeOutUI(funcArgs).start();

    }, funcArgs).start();
  };

  function reSizeFadeOutUI(funcArgs){
    //reSize part 2. Fades out and in the UI
    //DO NOT call this function

    //Saves local variables so repeatedly calls don't slow it down
    var localTimerLength = timerLength;
    var BackLayer = globalBackLayer;
    var FrontLayer = globalFrontLayer;

    //First animation to fade out UI
    globalCurAnim = new Kinetic.Animation(function(frame){
      curVal = 1-frame.time/localTimerLength;

      BackLayer.setOpacity(curVal);
      FrontLayer.setOpacity(curVal);

      if (frame.time >= localTimerLength){
        this.stop();
        frame.time = 0;
        BackLayer.setOpacity(0.0);
        FrontLayer.setOpacity(0.0);

        globalBackLayer.removeChildren();
        globalFrontLayer.removeChildren();
        frontUI(globalBackLayer, globalFrontLayer, funcArgs.width, funcArgs.height);

        //Second animation to fade in UI
        (new Kinetic.Animation(function(frame){

          curVal = frame.time/localTimerLength;

          BackLayer.setOpacity(curVal);
          FrontLayer.setOpacity(curVal);

          if (frame.time >= localTimerLength){
            this.stop();
            frame.time = 0;
            BackLayer.setOpacity(curVal);
            FrontLayer.setOpacity(curVal);

            globalFadeUI = false;
            reSizeAfter(funcArgs);
          }
          
        },stage)).start();
      }
      
    },stage);

    return globalCurAnim;
  }


  function reSizeAfter( funcArgs ){
    //Clean up reSizing function

    slideLayerMax = slideArray[slideIndex](globalOutLayerAry,
    width, height, setObj, supportFunc);
    fadeInSelected(funcArgs.OutLayerAry,funcArgs.state).start();
  }


//////////////////////////////////////////////////////////////////////////////
  function frontUI(localBackLayer, localFrontLayer, width, height){
    //Sets up the initial screen for use
    
    var squareSide = setObj.minDim/16;
    var squarePad  = 20 + outlineShift;
    var shiftDown = squareSide*1 + squarePad;
    
    var outLayerAry = globalOutLayerAry;

    var transObjAry = [{},{},{},{}];
                      
    var transFunAry = [previousSegment, nextSegment,
                       previousSlide, nextSlide];
    var i = -1;
    var max = 4;
    var x, y, text, temp;

    //Outline
    localBackLayer.add( new Kinetic.Rect({
      x: outlineShift,
      y: outlineShift,
      width: width - 2*outlineShift,
      height: height - 2*outlineShift,

      stroke: 'black',
      strokeWidth: 5,
      cornerRadius: 10,
    }));

    //Draw all the movement boxes
    if ( showButtons ){
      while( ++i < max ){
        x = squarePad + squareSide/2;
        x = i&1 ? width - x : x;
        y = height*(3/4) + (i&2 ? shiftDown : 0);
        text = i&1 ? '>' : '<';
        text += i&2 ? text : '';

        temp = new Kinetic.Text({
          x: x,
          y: y,
          offset: [squareSide/2,squareSide/2],
          Fill: 'black',
          fontSize: setObj.fontSize + 10,
          fontFamily: setObj.fontFamily,
          text: text,
          opacity: hideButtons ? 0.0 : 0.5,
        });
        
        temp.setOffset({
          x: temp.getWidth()>>1,
          y: temp.getHeight()>>1,
        });
        
        localFrontLayer.add(temp);
        
        transObjAry[i] = new Kinetic.Rect({
          x: x,
          y: y,
          width: squareSide,
          height: squareSide,
          offset: [squareSide/2,squareSide/2],

          stroke: 'black',
          strokeWidth: 5,
          cornerRadius: 10,
          opacity: hideButtons ? 0.0 : 0.5,
        });

        transObjAry[i].call = transFunAry[i];

        transObjAry[i].label = temp;
        
        transObjAry[i].on('tap mousedown', function(){
          if(!globalFadeUI)
            this.call(outLayerAry);
        });
        
        transObjAry[i].on('mouseover', function(){
          if(!globalFadeUI){
            this.setOpacity(0.5);
            this.label.setOpacity(0.5);
            localFrontLayer.draw();
          }
        });

        transObjAry[i].on('mouseout', function(){
          if(!globalFadeUI){
            this.setOpacity(hideButtons ? 0.0 : 0.5);
            this.label.setOpacity(hideButtons ? 0.0 : 0.5);
            localFrontLayer.draw();
          }
        });

        localFrontLayer.add(transObjAry[i]);
      }
    }

    //Draw bottom nav
    temp = supportFunc.center(new Kinetic.Rect({
      x: width/2,
      y: height*0.9,
      width: squareSide,
      height: height*0.1-outlineShift,

      stroke: 'black',
      strokeWidth: 5,
      cornerRadius: 10,
      opacity: hideButtons ? 0.0 : 0.5,
    }));

    temp.on('mousedown tap', function(){
      if(!globalFadeUI)
        reSize(globalOutLayerAry,window.innerWidth-10,window.innerHeight-10);
    });

    temp.on('mouseover', function(){
      if(!globalFadeUI){
        this.setOpacity(0.5);
        localFrontLayer.draw();
      }
    });

    temp.on('mouseout', function(){
      if(!globalFadeUI){
        this.setOpacity(hideButtons ? 0.0 : 0.5);
        localFrontLayer.draw();
      }
    });

    localFrontLayer.add(temp);
    
  };

//////////////////////////////////////////////////////////////////////////////
  function externStartUI(){
    if ( !hasInitialized ) {
      hasInitialized = true;
      var i, max = maxLayerCount;

      i = -1;
      while( i++ < max )
        globalOutLayerAry.push(new Kinetic.Layer());

      frontUI(globalBackLayer, globalFrontLayer, width, height);

      //Load First Slide
      loadNextSlide(globalOutLayerAry);

      //Assemble the Layers
      stage.add(globalBackLayer);

      i = -1;
      while( i++ < max )
        stage.add(globalOutLayerAry[i]);

      stage.add(globalFrontLayer);
    }
  };

  function externResize(){
    if(!globalFadeUI)
      reSize(globalOutLayerAry,window.innerWidth-10,window.innerHeight-10);
  };

//////////////////////////////////////////////////////////////////////////////
//Public accessor functions

  this.startUI = function(){
    externStartUI();
  };

  this.reSize = function(){
    externResize();
  }

  this.next = function(){
    if(!globalFadeUI)
      nextSegment(globalOutLayerAry);
  };

  this.previous = function(){
    if(!globalFadeUI)
      previousSegment(globalOutLayerAry);
  };

  this.nextSlide = function(){
    if(!globalFadeUI)
      nextSlide(globalOutLayerAry);
  };

  this.previousSlide = function(){
    if(!globalFadeUI)
      previousSlide(globalOutLayerAry);
  };

//////////////////////////////////////////////////////////////////////////////
  return{
    reSize          : this.reSize,
    startUI         : this.startUI,
    next            : this.next,
    previous        : this.previous,
    nextSlide       : this.nextSlide,
    previousSlide   : this.previousSlide,
  };
  
})(externDrawFunctionArray,externWidth,externHeight,externMaxLayerCount,
'container');
