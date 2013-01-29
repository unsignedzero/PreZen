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
 *Version 0.3.0.0
 */

var zxPowerPoint = (function(slideArray,width,height,maxLayerCount){

  var DEBUG = false;
  
//////////////////////////////////////////////////////////////////////////////
//Creates the default variables it needs/uses
  var stage = new Kinetic.Stage({
    container: 'container',
    width:  width,
    height: height,
  });

  var outlineShift = externOutlineShift;

  var globalFrontLayer   = new Kinetic.Layer();
  var globalBackLayer    = new Kinetic.Layer();
  var globalOutLayerAry  = [];
                              
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
  var hasInitialized = false;

//////////////////////////////////////////////////////////////////////////////
//Creates a support object that passes local functions to the board
  supportFunc.center = function (temp){
    //Centers the graphic object (hor only)
    temp.setOffset({
      x: temp.getWidth()>>1
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

  supportFunc.drawPixelCircle = function (
      LocalLayer, width, height, side, size, alt){
    var floor = supportFunc.floor;
    var sqrt  = supportFunc.sqrt;
    var abs   = supportFunc.abs;

    var rad = size&1 ? (size>>1)-1 : size>>1;
    var sub = size&1 ? (size>>1) : (size>>1)- 0.5;

    var x, y, i, max, del, fill, tempval;

    LocalLayer.removeChildren();
    max = size * size;

    i = -1;
    del = side/size;

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
        stroke: 'black',
        strokeWidth: 3,
      }));
    }

    //Reference circle for demo
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
 
  function fadeOutAll(OutLayerAry, nextFunc){
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
          nextFunc();
      }
    },stage);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  }
  
//////////////////////////////////////////////////////////////////////////////
  function frontUI(localBackLayer, localFrontLayer, width, height){
    //Sets up the initial screen for use
    
    var squareSide = width/16;
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

    //Draw all the boxes
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
        fontSize: setObj.fontSize + 20,
        fontFamily: setObj.fontFamily,
        text: text,
        opacity: 0.5,
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
        opacity: 0.5,
      });

      transObjAry[i].call = transFunAry[i];
      
      transObjAry[i].on('tap mousedown', function(){
        this.call(outLayerAry);
      });
      
      transObjAry[i].on('mouseover', function(){
        this.setStroke("white");
        localFrontLayer.draw();
      });

      transObjAry[i].on('mouseout', function(){
        this.setStroke("black");
        localFrontLayer.draw();
      });

      localFrontLayer.add(transObjAry[i]);
    }
    
    //Load First Slide
    loadNextSlide(globalOutLayerAry);
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

      //Assemble the Layers
      stage.add(globalBackLayer);

      i = -1;
      while( i++ < max )
        stage.add(globalOutLayerAry[i]);

      stage.add(globalFrontLayer);
    }
  };

//////////////////////////////////////////////////////////////////////////////
//Public accessor functions

  this.startUI = function(){
    externStartUI();
  };

  this.next = function(){
    nextSegment(globalOutLayerAry);
  };

  this.previous = function(){
    previousSegment(globalOutLayerAry);
  };

  this.nextSlide = function(){
    nextSlide(globalOutLayerAry);
  };

  this.previousSlide = function(){
    previousSlide(globalOutLayerAry);
  };

//////////////////////////////////////////////////////////////////////////////
  return{
    startUI         : this.startUI,
    next            : this.next,
    previous        : this.previous,
    nextSlide       : this.nextSlide,
    previousSlide   : this.previousSlide,
  };
  
})(externDrawFunctionArray,externWidth,externHeight,externMaxLayerCount);
