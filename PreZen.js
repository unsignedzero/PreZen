/*! PreZen
 *
 * Allows one to "code" up a presentation aimed for browsers
 * This methodology will take a long longer than just using PowerPoint, or
 * related tools but on the flip side, if done correctly, it will display
 * properly on mostly all devices that support the KineticJS Lib
 * and JavaScript. If text and locations are made to scale, then it will
 * work on all screen sizes too.
 *
 * Unlike PowerPoint, one can code up live demos that are embedded in the slide
 * At the time of writing, pictures and images are supported and,
 * will scale correctly
 *
 * Created 01-25-2013
 * Updated 04-15-2013
 * Version 0.6.0.0 Beta 3
 * Created by David Tran (unsignedzero)
 */

var zxPowerPoint = (function(settings) {
  "use strict";

  //Unfolding the settings object
  var slideArray = settings["externDrawFunctionArray"];
  var width = settings["externWidth"];
  var height = settings["externHeight"];

  var maxLayerCount = settings["externMaxLayerCount"];
  var containerName = settings["container"];
  var showSlideNumber = settings["showSlideNumber"];
  var DEBUG = settings["externDEBUG"];

  var showButtons = settings["externShowButtons"];
  //var hideButtons = isMobile() ? false : true;
  var hideButtons = true;

  var externFont = settings["externFont"];
  var outlineShift = settings["externOutlineShift"];
  var externTimer = settings["externTimer"];

  var supportFunc = settings["supportFunc"];

  //Input Error Scan
  if (!slideArray === undefined) {
    alert("ERROR:No slide passed in");
    throw new Error("No slide passed in");
  }
  if (!width === undefined) {
    alert("WARNING:externWidth not set. Default 800");
    width = 800;
  }
  if (!height === undefined) {
    alert("WARNING:externHeight not set. Default 1000");
    height = 1000;
  }
  if (!maxLayerCount === undefined) {
    alert("WARNING:externMaxLayerCount not set. Default 10");
    maxLayerCount = 10;
  }
  if (!containerName === undefined) {
    alert("ERROR:No container name passed");
    throw new Error("No container name passed");
  }
  if (showSlideNumber === undefined) {
    alert("WARNING:showSlideNumber not set. Default false");
    showSlideNumber = false;
  }
  if (DEBUG === undefined) {
    alert("WARNING:externDEBUG not set. Default false");
    DEBUG = false;
  }
  if (showButtons === undefined) {
    alert("ERROR:externShowButtons not set. Default false");
    showButtons = false;
  }
  if (externFont === undefined) {
    alert("ERROR:externFont not set. Default Palatino");
    externFont = 'Palatino';
  }
  if (outlineShift === undefined) {
    alert("ERROR:externOutlineShift not set. Default 20");
    outlineShift = 20;
  }
  if (externTimer === undefined) {
    alert("ERROR:externTimer not set. Default 0.5s");
    externTimer = 500;
  }
  if (supportFunc === undefined){
    alert("ERROR:SupportFunc function object undefined. Default {}");
    supportFunc = {};
  }

  //Set Debug Settings
  if (DEBUG) {
    hideButtons = false;
  }
//////////////////////////////////////////////////////////////////////////////
//Creates the default variables it needs/uses
  var stage = new Kinetic.Stage({
    container: containerName,
    width:  width,
    height: height
  });

  var globalDebugLayer    = new Kinetic.Layer();
  var globalFrontLayer    = new Kinetic.Layer();
  var globalBackLayer     = new Kinetic.Layer();
  var globalOutLayerAry   = [];
  var globalUIBlock       = false;
  var globalMsgBoxVisible = false;
                              
  var timerLength = externTimer;
  
  var slideIndex = -1;
  var slideLayer = 0;
  var slideLayerMax = 0;
  var slideIndexMax = slideArray.length - 1;
  
  var globalCurAnim = {};
//////////////////////////////////////////////////////////////////////////////
//Creates a settings object and passes it to the board
  var setObj = {
    fontFamily    : externFont,
    fontSize      : height/32,
    animTime      : 2000,
    maxLayerCount : maxLayerCount,
    outlineShift  : outlineShift,
    minDim        : width > height ? height : width,
    maxDim        : width > height ? width  : height,
    PI            : Math.PI,
    height        : height,
    width         : width
  };

  var hasInitialized = false;
//////////////////////////////////////////////////////////////////////////////
//Creates a support object that passes local functions to the board
//Contained here are all local functions that will be used by PreZen
//but can also be used by users
  supportFunc.left = function (temp) {
    //Left justifies the graphical object
    "use strict";

    temp.setOffset({
      x: 0
    });
    return temp;
  };

  supportFunc.center = function (temp) {
    //Center justifies the graphic object (hor only)
    "use strict";
     
    temp.setOffset({
      x: temp.getWidth()/2
    });
    return temp;
  };

  supportFunc.right = function (temp) {
    //Right justifies the graphical object
    "use strict";

    temp.setOffset({
      x: temp.getWidth()
    });
    return temp;
  };

  supportFunc.align = function(temp) {
    //Centers the graphic object
    "use strict";

    temp.setOffset({
      x: temp.getWidth()/2,
      y: temp.getHeight()/2
    });
    return temp;
  };

  supportFunc.middle = function(temp) {
    //Centers the graphic object
    "use strict";

    temp.setOffset({
      y: temp.getHeight()/2
    });
    return temp;
  };

  supportFunc.drawText = function(x,y,str,fontDelSize,font) {
    //Faster call to drawText
    "use strict";

    return new Kinetic.Text({
      x: x,
      y: y,

      fontSize: fontDelSize ? fontDelSize : height/32,
      fontFamily: font ? font : externFont,
      
      fill: 'black',
      text: str
    });
  };

  supportFunc.createBullet = function(x,y,fontDelSize) {
    "use strict";

    fontDelSize = fontDelSize ? fontDelSize : height/32;
    //Creates bullets for text
    return new Kinetic.Circle({
      x: x-1.5*fontDelSize,
      y: y+fontDelSize/2,

      fill: 'black',
      radius: fontDelSize/2
    });
  };

  supportFunc.clean = function(outLayerAry, setObj) {
    "use strict";

    var i, max;

    i = 0;
    max = setObj.maxLayerCount;
    while(i < max) {
      outLayerAry[i].removeChildren();
      outLayerAry[i].setOpacity(0.0);
      i += 1;
    }
  };

  supportFunc.floor = Math.floor;

  supportFunc.abs = Math.abs;

  supportFunc.sqrt = Math.sqrt;
//////////////////////////////////////////////////////////////////////////////
/* Test generator objects that will be updated accordingly and
 * integrated into PreZen. Once integrated we will update the slides
 *
 * For this codeset to work we assume that externFont and height are
 * well defined in PreZen.js
 */
  supportFunc.drawTextGenerator = function( input ){
    // This function sets above textPosGenerator and acts as a front
    // that generators text objects for KineticJS that can be drawn
    //
    // Data type and checks are done in the constructor of the respective
    // generator objects
    "use strict";

    var textPosObj, fontSize, fontFamily, temp, tempTextObj;

    textPosObj = supportFunc.textPosGenerator( input );

    fontSize = ( typeof input.fontSize === "number" ) ?
      fontSize : height/32;
    fontFamily = ( typeof input.fontFamily === "number" ) ?
      fontFamily : externFont;

     temp = { fontSize: fontSize, fontFamily : externFont,
         fill: 'black',
         text: "" };

     return { 
       Text : function (str, type){

         // General text function that will set the text as main or sub
         // depending on type

         tempTextObj = type ? textPosObj.subText() : textPosObj.mainText();

         temp.x = tempTextObj.x;
         temp.y = tempTextObj.y;
         temp.str = str;
         return supportFunc.drawText2(temp);
       },

       mainText : function (str){

         // Text function sets text as mainText

         tempTextObj = textPosObj.mainText();

         temp.x = tempTextObj.x;
         temp.y = tempTextObj.y;
         temp.str = str;

         return supportFunc.drawText2(temp);
       },

       subText : function (str){

         // Text function sets text as subText

         tempTextObj = textPosObj.subText();

         temp.x = tempTextObj.x;
         temp.y = tempTextObj.y;
         temp.str = str;

         return supportFunc.drawText2(temp);
       }
     };
  };

  supportFunc.bulletTextPosGenerator = function( input ){
    // This function combines textPosGenerator with bullets
    // giving users more options
    //
    // Data type and checks are done in the constructor of the respective
    // generator objects
    "use strict";

    var layer, curObj, retObj, subBulXShift, mainBulXShift, hasMainBul,
      hasSubBul, mainFontSizeDelta, subFontSizeDelta,
      textPosObj = supportFunc.textPosGenerator(input);

    if ( typeof input.deltaBulletFontSize === "number" )
      input.deltaBulletFontSize = 0;

    subBulXShift = ( typeof input.subBulXShift !== "number" ) ?
      0 : input.subBulXShift;
    mainBulXShift = ( typeof input.mainBulXShift !== "number" ) ?
      0 : input.mainBulXShift;
    subFontSizeDelta = ( typeof input.subFontSizeDelta !== "number" ) ?
      0 : input.subFontSizeDelta;
    mainFontSizeDelta = ( typeof input.mainFontSizeDelta !== "number" ) ?
      0 : input.mainFontSizeDelta;
    hasMainBul = ( typeof input.hasMainBul !== "boolean" ) ?
      true : input.hasMainBul;
    hasSubBul = ( typeof input.hasSubBul !== "boolean" ) ?
      false : input.hasSubBul;

    retObj = { 
      bulText : function (str, type){

       // General text function that will set the text as main or sub
       // depending on type

       temp = { fontSize: fontSize, fontFamily : fontFamily,
           fill: 'black',
           text: str };

       tempTextObj = type ? textPosObj.subtext() : textPosObj.maintext();

       temp.x = tempTextObj.x;
       temp.y = tempTextObj.y;
       return temp;
      },

      bulMainText : function (layer, str){
        // Text function sets text as mainText
        curObj = textPosObj.mainText();

        input.x = curObj.x + mainBulXShift;
        input.y = curObj.y;
        input.str = str;
        input.deltaFontSize = mainFontSizeDelta;

        if ( hasMainBul )
          layer.add(supportFunc.createBullet2(input));
        layer.add(supportFunc.drawText2(input));
      },

      bulSubText : function (layer, str){
        // Text function sets text as subText
        curObj = textPosObj.subText();

        input.x = curObj.x + subBulXShift;
        input.y = curObj.y;
        input.str = str;
        input.deltaFontSize = subFontSizeDelta;

        if ( hasSubBul )
          layer.add(supportFunc.createBullet2(input));
        layer.add(supportFunc.drawText2(input));
      }
    };

    //We make all methods of the textPosGenerator publicly accessible
    for ( var curMethod in textPosObj ) {
      if ( textPosObj.hasOwnProperty(curMethod) ){
        if ( typeof curMethod === "function" )
         retObj[curMethod.name] = curMethod;
      }
    }
   
    return retObj;
  };

  supportFunc.createBullet2 = function( input ){
    // Object facade version of createBullet
    "use strict";

    var x, y, fontSize;

    x  = ( typeof input.x === "number" ) ? input.x : 0;
    y  = ( typeof input.y === "number" ) ? input.y : 0;

    fontSize = ( typeof input.fontSize === "number" ) ?
      fontSize : input.height/32;

    return input.createBullet(x, y, fontSize);
  };

  supportFunc.drawHeader = function(layer, input , str){
    // Object facade that creates the header (non-existent in original)
    "use strict";

    layer.add(input.center(input.drawText(
      input.width/2, input.outlineShift + 0.05*input.height, str,
      input.fontSize+20, input.fontFamily)));
  };

  supportFunc.drawSubHeader = function(layer, input , str){
    // Object facade that creates the subheader (non-existent in original)
    "use strict";

    layer.add(input.center(input.drawText(
      input.width/2, input.outlineShift + 0.1*input.height, str,
      input.fontSize+10, input.fontFamily)));
  };

  supportFunc.generatorStateObject = function(settingsObj, supportFunc){
    // Assembles a generic state object that will be used in the generators
    "use strict";

    return {
        // We set the default fluff settings
        fontSize: settingsObj.fontSize, fontFamily: settingsObj.fontFamily,
        width: settingsObj.width, height: settingsObj.height,
        outlineShift: settingsObj.outlineShift,

        // We set default spacing. Change as needed
        maintexty: 3*settingsObj.fontSize,
        subtexty: settingsObj.fontSize,

        // We load our functions here
        drawText: supportFunc.drawText, createBullet: supportFunc.createBullet,
        center: supportFunc.center,

        // If we want the fonts to be bigger than the bullets set this
        deltaBulletFontSize: 5

      };
  };

  supportFunc.drawText2 = function( input ){
    // Object facade version of drawText
    "use strict";

    var x, y, fontSize, fontFamily, str;

    x  = ( typeof input.x === "number" ) ? input.x : 0;
    y  = ( typeof input.y === "number" ) ? input.y : 0;

    fontSize = ( typeof input.fontSize === "number" ) ?
      input.fontSize : input.height/32;
    fontSize += ( typeof input.deltaBulletFontSize === "number" ) ?
      input.deltaBulletFontSize : 0;
    fontSize += ( typeof input.deltaFontSize === "number" ) ?
      input.deltaFontSize : 0;
    fontFamily = ( typeof input.fontFamily === "string" ) ?
      input.fontFamily : externFont;

    str = ( typeof input.str === "string" ) ? input.str : "";

    return supportFunc.drawText(x, y, str, fontSize, fontFamily);
  };

  supportFunc.textPosGenerator = function( input ){
    // This function creates a generator object that will allow users
    // to specify the spacing between bullet points (maintext)
    // and substrings between lines of a bullet point (subtext)
    "use strict";

    var curx, cury, maintextx, maintexty, subtextx, subtexty,
        DEBUG, firstCall;

    // Check input
    curx  = ( typeof input.curx === "number" ) ? input.curx : 0;
    cury  = ( typeof input.cury === "number" ) ? input.cury : 0;
    DEBUG = ( typeof input.DEBUG === "boolean" ) ? input.DEBUG : false;
    firstCall = ( typeof input.firstCall === "boolean" ) ?
      input.firstCall : true;

    if ( typeof input.maintextx === "number" )
      maintextx = input.maintextx;
    else if ( DEBUG )
      alert( new Error("input.maintextx in textPosGenerator not a number"));
    else 
      maintextx = 0;

    if ( typeof input.maintexty === "number" )
      maintexty = input.maintexty;
    else if ( DEBUG )
      alert(new Error("input.maintexty in textPosGenerator not a number"));
    else
      maintexty = 0;

    if ( typeof input.subtextx === "number" )
      subtextx = input.subtextx;
    else if ( DEBUG )
      alert(new Error("input.subtextx in textPosGenerator not a number"));
    else
      subtextx = 0;

    if ( typeof input.subtexty === "number" )
      subtexty = input.subtexty;
    else if ( DEBUG )
      alert(new Error("input.subtexty in textPosGenerator not a number"));
    else
      subtexty = 0;

    return {
      mainText : function(){

        // Returns the new mainText coords

        if ( !firstCall ){
          curx += maintextx;
          cury += maintexty;
        }
        else
          firstCall = false;

        return {
          x: curx,
          y: cury
        };
      },
      subText : function(){

        // Returns the new mainText coords

        if ( !firstCall ){
          curx += subtextx;
          cury += subtexty;
        }
        else
          firstCall = false;

        return {
          x: curx,
          y: cury
        };
      }
    };
  };

  supportFunc.imgPosGenerator = function(minDim){
    // This function creates a generator object that will allow users
    // to create images on the fly and hides the ugly image editing details
    "use strict";

    var imgAry = [], imgAryCur = -1, imgMetaAry = [],
      curMeta, curImg = undefined;

    return {
      pushImage : function(path){

        // Adds the image to the array but creates the index as well

        curImg = new Image();
        curImg.src = path;
        curImg.onload = function () {};

        imgAry.push(curImg);

        imgAryCur += 1;

        // Pushes blank objects so imgMetaAry array aligns with imgAry

        imgMetaAry.push({});

        // Here we set the index publicly so that any external call can
        // call and access the element, without accessing the internal
        // variables
        this[imgAryCur] = imgAry[imgAryCur];

        return imgAry[imgAryCur];
      },

      pushImage2 : function(path, scalex, scaley, alignFunc){

        //Stores meta information for draw

        var ret = this.pushImage(path);

        curMeta = {
          scalex: scalex,
          scaley: scaley
        };

        if ( typeof alignFunc === "function")
          curMeta.alignFunc = alignFunc;

        imgMetaAry[imgAryCur] = curMeta;

        return ret;
      },

      drawImage : function(layer, posx, posy){

        var temp = new Kinetic.Image({
          x: posx,
          y: posy,
          width: minDim/curMeta.scalex,
          height: minDim/curMeta.scaley,
          image: curImg
        });

        if ( curMeta.alignFunc ){
          temp = curMeta.alignFunc(temp);
        }

        layer.add(temp);
      },

      curImage : function(){
        // Allows users to access the "last" element in the array
        return curImg;
      }
    };
  };

  supportFunc.setProConState = function(state, settingsObj){
    //Sets the default state to be used in a Pros/Cons slide

    state.maintexty = 4*settingsObj.fontSize;
    state.subtexty = 2*settingsObj.fontSize;

    state.curx = width/6;
    state.cury = height/4 - state.subtexty;

    state.hasMainBul = false;
    state.hasSubBul = true;

    state.mainFontSizeDelta = 15;
    state.subFontSizeDelta = 5;

    return state;
  };

  supportFunc.setNumberedListState = function(state, settingsObj){
    //Sets the default state in numbered list
    state.curx = width/2;
    state.cury = height/4;
    state.mainBulXShift = -2*settingsObj.fontSize;

    state.maintexty = 3*settingsObj.fontSize;
    state.subtexty = settingsObj.fontSize;

    state.hasMainBul = false;

    state.mainFontSizeDelta = 5;

    return state;
  }
//////////////////////////////////////////////////////////////////////////////
//Load functions
//This are basic functions to load the next slide or segment
  function nextSegment(outLayerAry) {
    //Call to load next anim ifpossible
    if (slideLayer+1 < slideLayerMax) {
      slideLayer += 1;
      fadeIn(outLayerAry[slideLayer]).start();
    }
    else
      nextSlide(outLayerAry);
  }

  function previousSegment(outLayerAry) {    
    //Call to unload previous anim is possible
    if (slideLayer > 0) {
      fadeOut(outLayerAry[slideLayer]).start();
      slideLayer -= 1;
      }
    else
      previousSlide(outLayerAry);
  }
  
  function nextSlide(outLayerAry) {
    //Call to load the previous slide
    if (slideIndex < slideIndexMax)
      fadeOutAll(outLayerAry,loadNextSlide).start();
    else
      globalCurAnim.end=true;
  }

  function previousSlide(outLayerAry) {    
    //Call to load the previous slide
    if (slideIndex > 0)
      fadeOutAll(outLayerAry,loadPreviousSlide).start();
    else
      globalCurAnim.end=true;
  }

  function loadNextSlide() {
    //Loads the next slide if possible
    if (slideIndex < slideIndexMax) {
      slideLayer = 0;
      slideIndex += 1;
      slideLayerMax = slideArray[slideIndex](globalOutLayerAry,
      width, height, setObj, supportFunc);
      drawMeta(globalOutLayerAry[0], supportFunc, setObj);
      fadeIn(globalOutLayerAry[slideLayer]).start();
    }
  }

  function loadPreviousSlide() {
    //Loads the previous slide if possible
    if (slideIndex > 0) {
      slideIndex -= 1;
      slideLayerMax = slideArray[slideIndex](globalOutLayerAry,
      width, height, setObj, supportFunc);
      slideLayer = slideLayerMax-1;
      drawMeta(globalOutLayerAry[0], supportFunc, setObj);
      fadeInAll(globalOutLayerAry).start();
    }
  }
//////////////////////////////////////////////////////////////////////////////
//Internal Support Functions
  function getLayerStatus(OuterLayer) {
    //Creates a boolean of all active layers
    var i, max = slideLayerMax;
    var ret = [];

    i = 0;
    while(i < max) {
      ret.push(OuterLayer[i].getOpacity() > 0.5);
      i += 1;
    }

    return ret;
  }
//////////////////////////////////////////////////////////////////////////////
//Animations for load functions
  function fadeIn(OutLayer, nextFunc) {
    "use strict";

    globalCurAnim.end = true;
    
    globalCurAnim = function (localTimerLength, nextFunc) {
      var ptr = new Kinetic.Animation(function(frame) {
        OutLayer.setOpacity(frame.time/localTimerLength);

        if (globalCurAnim.end) {
          frame.time = localTimerLength;
        }

        if (frame.time >= timerLength) {
          ptr.stop();
          frame.time = 0;
          OutLayer.setOpacity(1.0);
          if (nextFunc)
            nextFunc();
        }
      },OutLayer);

      return ptr;
    };
    
    globalCurAnim.end = false;
    return globalCurAnim(timerLength, nextFunc);
  }

  function fadeOut(OutLayer, nextFunc) {
    //Fades out one layer and possibly run the nextFunc
    "use strict";

    globalCurAnim.end = true;

    globalCurAnim = function(localTimerLength, nextFunc){
      "use strict";

      var ptr = new Kinetic.Animation(function(frame) {
        OutLayer.setOpacity(1 - frame.time/localTimerLength);

        if (globalCurAnim.end) {
          frame.time = localTimerLength;
        }

        if (frame.time >= timerLength) {
          ptr.stop();
          frame.time = 0;
          OutLayer.setOpacity(0.0);
          if (nextFunc)
            nextFunc();
        }
      },OutLayer);

      return ptr;
    };
    
    globalCurAnim.end = false;
    return globalCurAnim(timerLength, nextFunc);
  }
 
  function fadeInAll(OutLayerAry, nextFunc) {
    //Fades in all layers, regardless of opacity
    "use strict";

    globalCurAnim.end = true;
    var curVal, i, max = slideLayerMax;
    
    globalCurAnim = function(localTimerLength, nextFunc){
      "use strict";

      var ptr = new Kinetic.Animation(function(frame) {
        curVal = frame.time/localTimerLength;

        i = 0;
        while(i < max) {
          OutLayerAry[i].setOpacity(curVal);
          i += 1;
        }

        if (globalCurAnim.end) {
          frame.time = localTimerLength;
        }

        if (frame.time >= timerLength) {
          ptr.stop();
          frame.time = 0;
          i = 0;
          while(i < max) {
            OutLayerAry[i].setOpacity(1.0);
            i += 1;
          }
          if (nextFunc)
            nextFunc();
        }
      },stage);

      return ptr;
    };
    
    globalCurAnim.end = false;
    return globalCurAnim(timerLength, nextFunc);
  }

  function fadeInSelected(OutLayerAry, SelectAry, nextFunc) {
    //Fades in selected layers, regardless of opacity
    globalCurAnim.end = true;
    var curVal, i, max = slideLayerMax;
    
    globalCurAnim = function(localTimerLength, nextFunc){
      var ptr = new Kinetic.Animation(function(frame) {
        curVal = frame.time/localTimerLength;

        i = 0;
        while(i < max) {
          if (SelectAry[i])
            OutLayerAry[i].setOpacity(curVal);
          i += 1;
        }

        if (globalCurAnim.end) {
          frame.time = localTimerLength;
        }

        if (frame.time >= timerLength) {
          ptr.stop();
          frame.time = 0;
          i = 0;
          while(i < max) {
            if (SelectAry[i])
              OutLayerAry[i].setOpacity(1.0);
            i += 1;
          }
          if (nextFunc)
            nextFunc();
        }
      },stage);

      return ptr;
    };
    
    globalCurAnim.end = false;
    return globalCurAnim(timerLength, nextFunc);
  }
 
  function fadeOutAll(OutLayerAry, nextFunc, nextFuncArgs) {
    //Fades out all layers, whose opacity is larger than 0.5
    globalCurAnim.end = true;
    var i, max = slideLayerMax;
    var seeLayer = [];

    i = 0;
    while(i < max) {
      seeLayer.push(OutLayerAry[i].getOpacity() > 0.5);
      i += 1;
    }
    
    globalCurAnim = function(localTimerLength, OutLayerAry,
        nextFunc, nextFuncArgs){
      var curVal;
      var ptr = new Kinetic.Animation(function(frame) {
        curVal = 1-frame.time/localTimerLength;

        i = 0;
        while(i < max) {
          if (seeLayer[i])
            OutLayerAry[i].setOpacity(curVal);
          i += 1;
        }
        if (globalCurAnim.end) {
          frame.time = localTimerLength;
        }

        if (frame.time >= localTimerLength) {
          ptr.stop();
          frame.time = 0;
          i = 0;
          while(i < max) {
            OutLayerAry[i].setOpacity(0.0);
            i += 1;
          }
          if (nextFunc)
            nextFunc(nextFuncArgs);
        }
      },stage);

      return ptr;
    };
    
    globalCurAnim.end = false;
    return globalCurAnim(timerLength, OutLayerAry, 
        nextFunc, nextFuncArgs);
  }
//////////////////////////////////////////////////////////////////////////////
//Resize Functions
  function reSizeSupport(newWidth, newHeight) {
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

  function reSize(OutLayerAry, width, height) {
    //Call this function to resize the screen
    //Save State
    globalUIBlock = true;

    var funcArgs = {};
    funcArgs.OutLayerAry = OutLayerAry;
    funcArgs.state = getLayerStatus(OutLayerAry);
    funcArgs.width = width;
    funcArgs.height = height;

    //Fade Out
    fadeOutAll(OutLayerAry, function(funcArgs) {
      //On Animation finish...
      reSizeSupport(funcArgs.width, funcArgs.height);
      reSizeFadeOutUI(funcArgs).start();

    }, funcArgs).start();
  }

  function reSizeFadeOutUI(funcArgs) {
    //reSize part 2. Fades out and in the UI
    //DO NOT call this function directly

    //Saves local variables so repeatedly calls don't slow it down
    var localTimerLength = timerLength;
    var BackLayer = globalBackLayer;
    var FrontLayer = globalFrontLayer;
    var curVal;

    //First animation to fade out UI
    globalCurAnim = new Kinetic.Animation(function(frame) {
      curVal = 1-frame.time/localTimerLength;

      BackLayer.setOpacity(curVal);
      FrontLayer.setOpacity(curVal);

      if (frame.time >= localTimerLength) {
        globalCurAnim.stop();
        frame.time = 0;
        BackLayer.setOpacity(0.0);
        FrontLayer.setOpacity(0.0);

        globalBackLayer.removeChildren();
        globalFrontLayer.removeChildren();
        frontUI(globalBackLayer, globalFrontLayer, 
                funcArgs.width, funcArgs.height);

        //Second animation to fade in UI
        globalCurAnim = new Kinetic.Animation(function(frame) {

          curVal = frame.time/localTimerLength;

          BackLayer.setOpacity(curVal);
          FrontLayer.setOpacity(curVal);

          if (frame.time >= localTimerLength) {
            globalCurAnim.stop();
            frame.time = 0;
            BackLayer.setOpacity(curVal);
            FrontLayer.setOpacity(curVal);

            globalUIBlock = false;
            reSizeAfter(funcArgs);
          }
          
        },stage);

        globalCurAnim.start();
      }
      
    },stage);

    return globalCurAnim;
  }

  function reSizeAfter(funcArgs) {
    //Clean up reSizing function

    slideLayerMax = slideArray[slideIndex](globalOutLayerAry,
    width, height, setObj, supportFunc);

    setObj.height = height;
    setObj.height = height;

    drawMeta(globalOutLayerAry[0], supportFunc, setObj);

    fadeInSelected(funcArgs.OutLayerAry,funcArgs.state).start();
  }
//////////////////////////////////////////////////////////////////////////////
  function frontUI(localBackLayer, localFrontLayer, width, height) {
    //Sets up the initial screen for use or on resizing
    "use strict";

    var debugStr;
    var drawBox;
    var contactBox;
    
    //Draws static background and sets up background
    //Outline
    localBackLayer.add(new Kinetic.Rect({
      x: outlineShift,
      y: outlineShift,
      width: width - 2*outlineShift,
      height: height - 2*outlineShift,

      stroke: 'black',
      strokeWidth: 5,
      cornerRadius: 10
    }));

    //Draws buttons and interfaces
    drawInterface(localFrontLayer, supportFunc, setObj);

    //Sets up debug msgBox1
    if (DEBUG) {
      globalDebugLayer.removeChildren(); //Added to fix resizes
      contactBox = supportFunc.align(new Kinetic.Rect({
        x: width/2,
        y: height*0.9-outlineShift,
        width: width*0.8,
        height: height*0.1,
        stroke: 'black',
        strokeWidth: 5,
        cornerRadius: 5,
        opacity: 0.0
      }));
      drawBox = supportFunc.align(new Kinetic.Rect({
        x: width/2,
        y: height*0.9-outlineShift,
        width: width*0.8,
        height: height*0.1,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 5,
        cornerRadius: 5
      }));
      globalDebugLayer.add(drawBox);

      debugMsg = (function(drawLayer, width, height) {
        var debugMsg = supportFunc.middle(supportFunc.drawText(
          width*0.1+5,height*0.9-outlineShift,"DEBUG ON"));
        debugMsg.setFill('white');
        drawLayer.add(debugMsg);
        return function(msg) {
          debugMsg.setText(msg);
          drawLayer.draw();
        };
      })(globalDebugLayer, width, height);

      contactBox.on('mouseover', function() {
        globalDebugLayer.setOpacity(0.25);
        globalDebugLayer.draw();
      });
      contactBox.on('mouseout', function() {
        globalDebugLayer.setOpacity(1.0);
        globalDebugLayer.draw();
      });
      globalDebugLayer.add(contactBox);
    }
  }

  function drawInterface(interfaceLayer, supportFunc, setObj) {
    //Sets up the buttons and interface the user can use
    "use strict";

    var squareSide = setObj.minDim/16;
    var squarePad  = 20 + outlineShift;
    var msgBoxHeight = height*0.3;
    var actionBoxHeight = height*0.1-outlineShift;
    
    var outLayerAry = globalOutLayerAry;

    var transObjAry = [{},{},{},{}];
                      
    var transFunAry = [previousSegment, nextSegment,
                       previousSlide, nextSlide];

    var shiftDown = squareSide*1 + squarePad;
    var msgBox;

    var i = 0;
    var max = 4;

    var x, y, text, textObj;
    var temp;

    var navButtons = [];
    
    //Draw all the movement boxes
    if (showButtons) {
      while(i < max) {
        x = squarePad + squareSide/2;
        x = i&1 ? width - x : x;
        y = height*(3/4) + (i&2 ? shiftDown : 0);
        text = i&1 ? '>' : '<';
        text += i&2 ? text : '';

        temp = supportFunc.align(new Kinetic.Text({
          x: x,
          y: y,
          Fill: 'black',
          fontSize: setObj.fontSize + 10,
          fontFamily: setObj.fontFamily,
          text: text,
          opacity: hideButtons ? 0.0 : 0.5
        }));
        
        interfaceLayer.add(temp);
        
        transObjAry[i] = new Kinetic.Rect({
          x: x,
          y: y,
          width: squareSide,
          height: squareSide,
          offset: [squareSide/2,squareSide/2],

          stroke: 'black',
          strokeWidth: 5,
          cornerRadius: 10,
          opacity: hideButtons ? 0.0 : 0.5
        });

        transObjAry[i].call = transFunAry[i];

        transObjAry[i].label = temp;

        transObjAry[i].onHover = false;
        
        transObjAry[i].on('tap mousedown', function() {
          if (!globalUIBlock)
            this.call(outLayerAry);
        });
        
        transObjAry[i].on('mouseover', function() {
          if (!globalUIBlock) {
            this.setOpacity(hideButtons ? 0.5 : 1.0);
            this.label.setOpacity(hideButtons ? 0.5 : 1.0);
            this.onHover = true;
            interfaceLayer.draw();
          }
        });

        transObjAry[i].on('mouseout', function() {
          if (this.onHover || !globalUIBlock) {
            this.onHover = false;
            this.setOpacity(hideButtons ? 0.0 : 0.5);
            this.label.setOpacity(hideButtons ? 0.0 : 0.5);
            interfaceLayer.draw();
          }
        });

        interfaceLayer.add(transObjAry[i]);
        i += 1;
      }
    }

    //Draw Box
    msgBox = supportFunc.center(new Kinetic.Rect({
      x: width/2,
      y: height - outlineShift - (globalMsgBoxVisible?msgBoxHeight:0),
      width: width*0.8,
      height: globalMsgBoxVisible ? msgBoxHeight : 0,
      stroke: 'black',
      fill: 'White',
      strokeWidth: 4
    }));

    //Draw bottom nav
    if (true) {
      i = 0;
      max = 3;
      while(i < max) {
        x = width/2 + (i-1)*squareSide;
        y = height*0.9;

        textObj = supportFunc.center(new Kinetic.Text({
          x: x,
          y: y + actionBoxHeight/4,
          offset: globalMsgBoxVisible ? [0, msgBoxHeight] : [0, 0],
          Fill: 'black',
          fontSize: setObj.fontSize + 10,
          fontFamily: setObj.fontFamily,
          text: i&2? (i&1? ' ' : ' ') : (i&1? 'R': 'N'),
          opacity: hideButtons ? 0.0 : 0.5
        }));

        temp = supportFunc.center(new Kinetic.Rect({
          x: x,
          y: y,
          width: squareSide,
          height: actionBoxHeight,
          offset: globalMsgBoxVisible ? [0, msgBoxHeight] : [0, 0],
          stroke: 'black',
          strokeWidth: 5,
          cornerRadius: 10,
          opacity: hideButtons ? 0.0 : 0.5
        }));

        if (i===0) {
          temp.on('mousedown tap', function() {
            msgBoxChange();
          });
        }
        else if (i == 1) {
          temp.on('mousedown tap', function() {
            if (!globalUIBlock)
              reSize(globalOutLayerAry,window.innerWidth-10,window.innerHeight-10);
          });
        }
        else{
          temp.on('mousedown tap', function() {
            if (!globalUIBlock) {
              alert("NO");
            }
          });
        }

        navButtons.push(temp);
        navButtons[i].label = textObj;
        navButtons[i].onHover = false;

        temp.on('mouseover', function() {
          if (!globalUIBlock) {
            this.setOpacity(hideButtons ? 0.5 : 1.0);
            this.label.setOpacity(hideButtons ? 0.5 : 1.0);
            this.onHover = true;
            interfaceLayer.draw();
          }
        });

        temp.on('mouseout', function() {
          if (this.onHover || !globalUIBlock) {
            this.onHover = false;
            this.setOpacity(hideButtons ? 0.0 : 0.5);
            this.label.setOpacity(hideButtons ? 0.0 : 0.5);
            interfaceLayer.draw();
          }
        });

        interfaceLayer.add(textObj);
        interfaceLayer.add(temp);
        i += 1;
      }
    }
    interfaceLayer.add(msgBox);

    //Definition of msgBoxChange here
    //This changes when screen resizes
    msgBoxChange = (function(navButtons, msgBoxHeight, interfaceLayer, msgBox) {
      "use strict";

      return function() {
        "use strict";

        var i, max;
        if (!globalUIBlock) {
          //Sets up animation fadein
          if (!globalMsgBoxVisible) {
            msgBox.setCornerRadius(5);
            globalUIBlock = true;
            max = navButtons.length;
            var ydelta = msgBoxHeight/externTimer;
            (function() {
              var ptr = new Kinetic.Animation(function(frame) {
                i = 0;
                y = ydelta * frame.time;
                while(i<max) {
                  navButtons[i].setOffset({
                    y: y
                  });
                  navButtons[i].label.setOffset({
                    y: y
                  });
                  i += 1;
                }
                msgBox.setY(height-outlineShift-y);
                msgBox.setHeight(ydelta*frame.time);
                
                if (externTimer < frame.time) {
                  ptr.stop();
                  frame.time = 0;
                  i = 0;
                  y = height - msgBoxHeight - outlineShift;
                  while(i<max) {
                    navButtons[i].setOffset({
                      y: msgBoxHeight
                    });
                    navButtons[i].label.setOffset({
                      y: msgBoxHeight
                    });
                    i += 1;
                  }
                  msgBox.setY(y);
                  msgBox.setHeight(msgBoxHeight);
                  globalMsgBoxVisible = true;
                  globalUIBlock = false;
                }
              },interfaceLayer);

              ptr.start();
            })();
          }
          //Sets up animation fadeout
          else{
            globalUIBlock = true;
            max = navButtons.length;
            ydelta = msgBoxHeight/externTimer;
            (function() {
              var ptr = new Kinetic.Animation(function(frame) {
                i = 0;
                y = ydelta * (externTimer-frame.time);
                while(i<max) {
                  navButtons[i].setOffset({
                    y: y
                  });
                  navButtons[i].label.setOffset({
                    y: y
                  });
                  i += 1;
                }
                msgBox.setY(height-outlineShift-y);
                msgBox.setHeight(y);
                
                if (externTimer < frame.time) {
                  ptr.stop();
                  msgBox.setCornerRadius(0);
                  frame.time = 0;
                  i = 0;
                  y = height*0.9;
                  while(i<max) {
                    navButtons[i].setOffset({
                      y: 0
                    });
                    navButtons[i].setY(y);
                    navButtons[i].label.setOffset({
                      y: 0
                    });
                    navButtons[i].label.setY(y+actionBoxHeight/4);
                    i += 1;
                  }
                  msgBox.setY(height-outlineShift);
                  msgBox.setHeight(0);
                  globalMsgBoxVisible = false;
                  globalUIBlock = false;
                }
              },interfaceLayer);

              ptr.start();
            })();
          }
        }
      };
    })(navButtons, msgBoxHeight, interfaceLayer, msgBox);
  }

  function drawMeta(metaLayer, supportFunc, setObj) {
    //Draws the meta data that updates frequently
    if (showSlideNumber)
      metaLayer.add(supportFunc.drawText(
          width/16, height/16, slideIndex,
          setObj.fontSize+10, setObj.fontFamily));
  }
//////////////////////////////////////////////////////////////////////////////
//MsgBox functions
  function msgBoxChange() {
    //This is overwritten internally by drawInterface
    //so that it changes size on resizing the screen
  }
//////////////////////////////////////////////////////////////////////////////
//Debug Functions
  function debugMsg(msg) {
    //Like msgBoxChange this will be overwritten, by frontUI,
    //so resizing works
    console.log(msg);
  }
//////////////////////////////////////////////////////////////////////////////
//Extern Method calls
  function externStartUI() {
    "use strict";

    if (!hasInitialized) {
      hasInitialized = true;
      var i, max = maxLayerCount;

      i = 0;
      while(i < max) {
        globalOutLayerAry.push(new Kinetic.Layer());
        i += 1;
      }

      frontUI(globalBackLayer, globalFrontLayer, width, height);

      //Load First Slide
      loadNextSlide(globalOutLayerAry);

      //Assemble the Layers
      stage.add(globalBackLayer);

      i = 0;
      while(i < max) {
        stage.add(globalOutLayerAry[i]);
        i += 1;
      }

      stage.add(globalFrontLayer);

      if (DEBUG)
        stage.add(globalDebugLayer);
    }
  }

  function externResize() {
    "use strict";

    if (!globalUIBlock)
      reSize(globalOutLayerAry,window.innerWidth-10,window.innerHeight-10);
  }
//////////////////////////////////////////////////////////////////////////////
//Public accessor functions
  self.startUI = function() {
    externStartUI();
  };

  self.reSize = function() {
    if (!globalUIBlock)
      externResize();
  };

  self.msgBoxChange = function() {
    if (!globalUIBlock)
      msgBoxChange();
  };

  self.setDebugMsg = function(msg) {
    debugMsg(msg);
  };

  self.next = function() {
    if (!globalUIBlock)
      nextSegment(globalOutLayerAry);
  };

  self.previous = function() {
    if (!globalUIBlock)
      previousSegment(globalOutLayerAry);
  };

  self.nextSlide = function() {
    if (!globalUIBlock)
      nextSlide(globalOutLayerAry);
  };

  self.previousSlide = function() {
    if (!globalUIBlock)
      previousSlide(globalOutLayerAry);
  };
//////////////////////////////////////////////////////////////////////////////
  return{
    msgBoxChange    : self.msgBoxChange,
    setDebugMsg     : self.setDebugMsg,
    reSize          : self.reSize,
    startUI         : self.startUI,
    next            : self.next,
    previous        : self.previous,
    nextSlide       : self.nextSlide,
    previousSlide   : self.previousSlide
  };
})(PreZenSettings);

//As the slides object is no longer needed globally, we will remove the reference
PreZenSettings = undefined;
