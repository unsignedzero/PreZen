/*Created by David Tran (unsignedzero)
 *PreZen
 *
 *Allows one to "code" up a presentation aimed for browsers
 *This methodology will take a long longer than just using PowerPoint, or
 *related tools but on the flip side, ifdone correctly, will display
 *properly on mostly all devices that support the KineticJS Lib
 *and JavaScript. If text and locations are made to scale, then it will
 *work on all screen sizes too.
 *
 *Created 01-25-2013
 *Updated 02-18-2013
 *Version 0.3.1.2
 */

var zxPowerPoint = (function(settings){

  //Unfolding the settings object
  var slideArray = settings["externDrawFunctionArray"];
  var width = settings["externWidth"];
  var height = settings["externHeight"];

  var maxLayerCount = settings["externMaxLayerCount"];
  var containerName = settings["container"];
  var showSlideNumber = settings["showSlideNumber"];
  var DEBUG = settings["externDEBUG"];

  var showButtons = settings["externShowButtons"];
  var hideButtons = isMobile() ? false : true;

  var externFont = settings["externFont"];
  var outlineShift = settings["externOutlineShift"];
  var externTimer = settings["externTimer"];

  //Input Error Scan
  if(!slideArray === undefined){
    alert("ERROR:No slide passed in");
    throw new Error("No slide passed in");
  }
  if(!width === undefined){
    alert("WARNING:externWidth not set. Default 800");
    width = 800;
  }
  if(!height === undefined){
    alert("WARNING:externHeight not set. Default 1000");
    height = 1000;
  }
  if(!maxLayerCount === undefined){
    alert("WARNING:externMaxLayerCount not set. Default 10");
    maxLayerCount = 10;
  }
  if(!containerName === undefined){
    alert("ERROR:No container name passed");
    throw new Error("No container name passed");
  }
  if(showSlideNumber === undefined){
    alert("WARNING:showSlideNumber not set. Default false");
    showSlideNumber = false;
  }
  if(DEBUG === undefined){
    alert("WARNING:externDEBUG not set. Default false");
    DEBUG = false;
  }
  if(!showButtons === undefined){
    alert("ERROR:externShowButtons not set. Default false");
    showButtons = false;
  }
  if(!externFont === undefined){
    alert("ERROR:externFont not set. Default Palatino");
    externFont = 'Palatino';
  }
  if(!outlineShift === undefined){
    alert("ERROR:externOutlineShift not set. Default 20");
    outlineShift = 20;
  }
  if(!externTimer === undefined){
    alert("ERROR:externTimer not set. Default 0.5s");
    externTimer = 500;
  }

  //Set Debug Settings
  if(DEBUG){
    hideButtons = false;
  }

//////////////////////////////////////////////////////////////////////////////
//Creates the default variables it needs/uses
  var stage = new Kinetic.Stage({
    container: containerName,
    width:  width,
    height: height,
  });

  var globalDebugLayer   = new Kinetic.Layer();
  var globalFrontLayer   = new Kinetic.Layer();
  var globalBackLayer    = new Kinetic.Layer();
  var globalOutLayerAry  = [];
  var globalUIBlock       = false;
  var globalMsgBoxVisible = false;
                              
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
    setObj.outlineShift = outlineShift;
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

  supportFunc.middle = function(temp){
    //Centers the graphic object
    temp.setOffset({
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
  };

  supportFunc.createBullet = function(x,y,fontDelSize){
    fontDelSize = fontDelSize ? fontDelSize : height/32;
    //Creates bullets for text
    return new Kinetic.Circle({
      x: x-1.5*fontDelSize,
      y: y+fontDelSize/2,

      fill: 'black',
      radius: fontDelSize/2,
    });
  };

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

    while(++i < max){
      x = floor(i / size);
      y = i % size;
      tempval = abs(sqrt((x-sub)*(x-sub) + (y-sub)*(y-sub))-rad);
      fill = tempval <= 0.5 ? 'black' : 'white';
      if(alt && tempval <= 1.0 && tempval >= 0.5)
        fill = 'grey';

      LocalLayer.add(new Kinetic.Rect({
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
    if(size > 3)
      LocalLayer.add(new Kinetic.Circle({
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
    while(++i < max){
      outLayerAry[i].removeChildren();
      outLayerAry[i].setOpacity(0.0);
    }
  };

  supportFunc.floor = Math.floor;

  supportFunc.abs = Math.abs;

  supportFunc.sqrt = Math.sqrt;

//////////////////////////////////////////////////////////////////////////////
  //Load functions
  function nextSegment(outLayerAry){
    //Call to load next anim ifpossible
    if(slideLayer+1 < slideLayerMax)
      fadeIn(outLayerAry[++slideLayer]).start();
    else
      nextSlide(outLayerAry);
  };

  function previousSegment(outLayerAry){    
    //Call to unload previous anim is possible
    if(slideLayer > 0)
      fadeOut(outLayerAry[slideLayer--]).start();
    else
      previousSlide(outLayerAry);
  };
  
  function nextSlide(outLayerAry){
    //Call to load the previous slide
    if(slideIndex < slideIndexMax)
      fadeOutAll(outLayerAry,loadNextSlide).start();
    else
      globalCurAnim.end=true;
  };

  function previousSlide(outLayerAry){    
    //Call to load the previous slide
    if(slideIndex > 0)
      fadeOutAll(outLayerAry,loadPreviousSlide).start();
    else
      globalCurAnim.end=true;
  };

  function loadNextSlide(){
    //Loads the next slide if possible
    if(slideIndex < slideIndexMax){
      slideLayer = 0;
      slideLayerMax = slideArray[++slideIndex](globalOutLayerAry,
      width, height, setObj, supportFunc);
      drawMeta(globalOutLayerAry[0], supportFunc, setObj);
      fadeIn(globalOutLayerAry[slideLayer]).start();
    }
  };

  function loadPreviousSlide(){
    //Loads the previous slide if possible
    if(slideIndex > 0){
      slideIndex -= 1;
      slideLayerMax = slideArray[slideIndex](globalOutLayerAry,
      width, height, setObj, supportFunc);
      slideLayer = slideLayerMax-1;
      drawMeta(globalOutLayerAry[0], supportFunc, setObj);
      fadeInAll(globalOutLayerAry).start();
    }
  };

//////////////////////////////////////////////////////////////////////////////
  //Internal Support Functions

  function getLayerStatus(OuterLayer){
    var i, max = slideLayerMax;
    var ret = [];

    i = -1;
    while(i++ < max)
      ret.push(OuterLayer[i].getOpacity() > 0.5);

    return ret;
  };
  
//////////////////////////////////////////////////////////////////////////////
  //Animations for load functions
  function fadeIn(OutLayer, nextFunc){
    globalCurAnim.end = true;
    var localTimerLength = timerLength;
    
    globalCurAnim = new Kinetic.Animation(function(frame){
      OutLayer.setOpacity(frame.time/localTimerLength);

      if(this.end){
        frame.time = localTimerLength;
      }

      if(frame.time >= timerLength){
        this.stop();
        frame.time = 0;
        OutLayer.setOpacity(1.0);
        if(nextFunc)
          nextFunc();
      }
    },OutLayer);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  };

  function fadeOut(OutLayer, nextFunc){
    //Fades out one layer and possibly run the nextFunc
    globalCurAnim.end = true;
    var localTimerLength = timerLength;

    globalCurAnim = new Kinetic.Animation(function(frame){
      OutLayer.setOpacity(1 - frame.time/localTimerLength);

      if(this.end){
        frame.time = localTimerLength;
      }

      if(frame.time >= timerLength){
        this.stop();
        frame.time = 0;
        OutLayer.setOpacity(0.0);
        if(nextFunc)
          nextFunc();
      }
    },OutLayer);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  };
 
  function fadeInAll(OutLayerAry, nextFunc){
    //Fades in all layers, regardless of opacity
    globalCurAnim.end = true;
    var localTimerLength = timerLength;
    var curVal;
    var i,max = slideLayerMax;
    
    globalCurAnim = new Kinetic.Animation(function(frame){
      curVal = frame.time/localTimerLength;

      i = -1;
      while(i++ < max)
        OutLayerAry[i].setOpacity(curVal);

      if(this.end){
        frame.time = localTimerLength;
      }

      if(frame.time >= timerLength){
        this.stop();
        frame.time = 0;
        i = -1;
        while(i++ < max)
          OutLayerAry[i].setOpacity(1.0);
        if(nextFunc)
          nextFunc();
      }
    },stage);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  };

  function fadeInSelected(OutLayerAry, SelectAry, nextFunc){
    //Fades in selected layers, regardless of opacity
    globalCurAnim.end = true;
    var localTimerLength = timerLength;
    var curVal;
    var i,max = slideLayerMax;
    
    globalCurAnim = new Kinetic.Animation(function(frame){
      curVal = frame.time/localTimerLength;

      i = -1;
      while(i++ < max)
        if(SelectAry[i])
          OutLayerAry[i].setOpacity(curVal);

      if(this.end){
        frame.time = localTimerLength;
      }

      if(frame.time >= timerLength){
        this.stop();
        frame.time = 0;
        i = -1;
        while(i++ < max)
          if(SelectAry[i])
            OutLayerAry[i].setOpacity(1.0);
        if(nextFunc)
          nextFunc();
      }
    },stage);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  };
 
  function fadeOutAll(OutLayerAry, nextFunc, nextFuncArgs){
    //Fades out all layers, whose opacity is larger than 0.5
    globalCurAnim.end = true;
    var localTimerLength = timerLength;
    var curVal;
    var i,max = slideLayerMax;
    var seeLayer = [];

    i = -1;
    while(i++ < max)
      seeLayer.push(OutLayerAry[i].getOpacity() > 0.5);
    
    globalCurAnim = new Kinetic.Animation(function(frame){
      curVal = 1-frame.time/localTimerLength;

      i = -1;
      while(i++ < max)
        if(seeLayer[i])
          OutLayerAry[i].setOpacity(curVal);
      if(this.end){
        frame.time = localTimerLength;
      }

      if(frame.time >= localTimerLength){
        this.stop();
        frame.time = 0;
        i = -1;
        while(i++ < max)
          OutLayerAry[i].setOpacity(0.0);
        if(nextFunc)
          nextFunc(nextFuncArgs);
      }
    },stage);
    
    globalCurAnim.end = false;
    return globalCurAnim;
  };

//////////////////////////////////////////////////////////////////////////////
  //Resize Functions

  function reSizeSupport(newWidth, newHeight){
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
  };

  function reSize(OutLayerAry, width, height){
    //Call this function to resize the screen
    //Save State
    globalUIBlock = true;

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

      if(frame.time >= localTimerLength){
        this.stop();
        frame.time = 0;
        BackLayer.setOpacity(0.0);
        FrontLayer.setOpacity(0.0);

        globalBackLayer.removeChildren();
        globalFrontLayer.removeChildren();
        frontUI(globalBackLayer, globalFrontLayer, 
                funcArgs.width, funcArgs.height);

        //Second animation to fade in UI
        (new Kinetic.Animation(function(frame){

          curVal = frame.time/localTimerLength;

          BackLayer.setOpacity(curVal);
          FrontLayer.setOpacity(curVal);

          if(frame.time >= localTimerLength){
            this.stop();
            frame.time = 0;
            BackLayer.setOpacity(curVal);
            FrontLayer.setOpacity(curVal);

            globalUIBlock = false;
            reSizeAfter(funcArgs);
          }
          
        },stage)).start();
      }
      
    },stage);

    return globalCurAnim;
  };


  function reSizeAfter(funcArgs){
    //Clean up reSizing function

    slideLayerMax = slideArray[slideIndex](globalOutLayerAry,
    width, height, setObj, supportFunc);

    drawMeta(globalOutLayerAry[0], supportFunc, setObj);

    fadeInSelected(funcArgs.OutLayerAry,funcArgs.state).start();
  };

//////////////////////////////////////////////////////////////////////////////
  function frontUI(localBackLayer, localFrontLayer, width, height){
    //Sets up the initial screen for use or on resizing
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
      cornerRadius: 10,
    }));

    //Draws buttons and interfaces
    drawInterface(localFrontLayer, supportFunc, setObj);

    if(DEBUG){
      globalDebugLayer.removeChildren();
      contactBox = supportFunc.align(new Kinetic.Rect({
        x: width/2,
        y: height*0.9-outlineShift,
        width: width*0.8,
        height: height*0.1,
        stroke: 'black',
        strokeWidth: 5,
        cornerRadius: 5,
        opacity: 0.0,
      }));
      drawBox = supportFunc.align(new Kinetic.Rect({
        x: width/2,
        y: height*0.9-outlineShift,
        width: width*0.8,
        height: height*0.1,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 5,
        cornerRadius: 5,
      }));
      globalDebugLayer.add(drawBox);

      debugMsg = (function(drawLayer, width, height){
        var debugMsg = supportFunc.middle(supportFunc.drawText(
          width*0.1+5,height*0.9-outlineShift,"DEBUG ON"));
        debugMsg.setFill('white');
        drawLayer.add(debugMsg);
        return function(msg){
          debugMsg.setText(msg);
          drawLayer.draw();
        };
      })(globalDebugLayer, width, height);

      contactBox.on('mouseover', function(){
        globalDebugLayer.setOpacity(0.25);
        globalDebugLayer.draw();
      });
      contactBox.on('mouseout', function(){
        globalDebugLayer.setOpacity(1.0);
        globalDebugLayer.draw();
      });
      globalDebugLayer.add(contactBox);
    }
  };

  function drawInterface(interfaceLayer, supportFunc, setObj){
    //Sets up the buttons and interface the user can use

    var squareSide = setObj.minDim/16;
    var squarePad  = 20 + outlineShift;
    var msgBoxHeight = height*0.3;
    var actionBoxHeight = height*0.1-outlineShift;
    
    var outLayerAry = globalOutLayerAry;

    var transObjAry = [{},{},{},{}];
                      
    var transFunAry = [previousSegment, nextSegment,
                       previousSlide, nextSlide];

    var msgBox;

    var i = -1;
    var max = 4;

    var x, y, text, textObj;
    var temp;

    var navButtons = [];
    
    //Draw all the movement boxes
    if(showButtons){
      var shiftDown = squareSide*1 + squarePad;
      while(++i < max){
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
          opacity: hideButtons ? 0.0 : 0.5,
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
          opacity: hideButtons ? 0.0 : 0.5,
        });

        transObjAry[i].call = transFunAry[i];

        transObjAry[i].label = temp;
        
        transObjAry[i].on('tap mousedown', function(){
          if(!globalUIBlock)
            this.call(outLayerAry);
        });
        
        transObjAry[i].on('mouseover', function(){
          if(!globalUIBlock){
            this.setOpacity(hideButtons ? 0.5 : 1.0);
            this.label.setOpacity(hideButtons ? 0.5 : 1.0);
            interfaceLayer.draw();
          }
        });

        transObjAry[i].on('mouseout', function(){
          if(!globalUIBlock){
            this.setOpacity(hideButtons ? 0.0 : 0.5);
            this.label.setOpacity(hideButtons ? 0.0 : 0.5);
            interfaceLayer.draw();
          }
        });

        interfaceLayer.add(transObjAry[i]);
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
      strokeWidth: 5,
      cornerRadius: 5,
    }));

    //Draw bottom nav
    if(true){
      i = -1;
      max = 3;
      while(++i < max){
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
          opacity: hideButtons ? 0.0 : 0.5,
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
          opacity: hideButtons ? 0.0 : 0.5,
        }));

        if(i==0){
          temp.on('mousedown tap', function(){
            msgBoxChange();
          });
        }
        else if(i == 1){
          temp.on('mousedown tap', function(){
            if(!globalUIBlock)
              reSize(globalOutLayerAry,window.innerWidth-10,window.innerHeight-10);
          });
        }
        else{
          temp.on('mousedown tap', function(){
            if(!globalUIBlock){
              alert("NO");
            }
          });
        }

        navButtons.push(temp);
        navButtons[i].label = textObj;

        temp.on('mouseover', function(){
          if(!globalUIBlock){
            this.setOpacity(hideButtons ? 0.5 : 1.0);
            this.label.setOpacity(hideButtons ? 0.5 : 1.0);
            interfaceLayer.draw();
          }
        });

        temp.on('mouseout', function(){
          if(!globalUIBlock){
            this.setOpacity(hideButtons ? 0.0 : 0.5);
            this.label.setOpacity(hideButtons ? 0.0 : 0.5);
            interfaceLayer.draw();
          }
        });

        interfaceLayer.add(textObj);
        interfaceLayer.add(temp);
      }
    }
    interfaceLayer.add(msgBox);

    //Definition of msgBoxChange here
    msgBoxChange = (function(navButtons, msgBoxHeight, interfaceLayer){
      return function(){
        var i, max;
        if(!globalUIBlock){
          if(!globalMsgBoxVisible){
            globalUIBlock = true;
            max = navButtons.length;
            var ydelta = msgBoxHeight/externTimer;
            (new Kinetic.Animation(function(frame){
              i = -1;
              y = ydelta * frame.time;
              while(++i<max){
                navButtons[i].setOffset({
                  y: y
                });
                navButtons[i].label.setOffset({
                  y: y
                });

              }
              msgBox.setY(height-outlineShift-y);
              msgBox.setHeight(ydelta*frame.time);
              
              if (externTimer < frame.time){
                this.stop();
                frame.time = 0;
                i = -1;
                y = height - msgBoxHeight - outlineShift;
                while(++i<max){
                  navButtons[i].setOffset({
                    y: msgBoxHeight
                  });
                  navButtons[i].label.setOffset({
                    y: msgBoxHeight
                  });
                }
                msgBox.setY(y);
                msgBox.setHeight(msgBoxHeight);
                globalMsgBoxVisible = true;
                globalUIBlock = false;
              }
            },interfaceLayer)).start();
          }
          else{
            globalUIBlock = true;
            max = navButtons.length;
            var ydelta = msgBoxHeight/externTimer;
            (new Kinetic.Animation(function(frame){
              i = -1;
              y = ydelta * (externTimer-frame.time);
              while(++i<max){
                navButtons[i].setOffset({
                  y: y
                });
                navButtons[i].label.setOffset({
                  y: y
                });

              }
              msgBox.setY(height-outlineShift-y);
              msgBox.setHeight(y);
              
              if (externTimer < frame.time){
                this.stop();
                frame.time = 0;
                i = -1;
                y = height*0.9;
                while(++i<max){
                  navButtons[i].setOffset({
                    y: 0
                  });
                  navButtons[i].setY(y);
                  navButtons[i].label.setOffset({
                    y: 0
                  });
                  navButtons[i].label.setY(y+actionBoxHeight/4);
                }
                msgBox.setY(height-outlineShift);
                msgBox.setHeight(0);
                globalMsgBoxVisible = false;
                globalUIBlock = false;
              }
            },interfaceLayer)).start();
          }
        }
      };
    })(navButtons, msgBoxHeight, interfaceLayer);
  }

  function drawMeta(metaLayer, supportFunc, setObj){
    //Draws the meta data that updates frequently
    if(showSlideNumber)
      metaLayer.add(supportFunc.drawText(
        width/16, height/16, slideIndex,
        setObj.fontSize+10, setObj.fontFamily));
  }

//////////////////////////////////////////////////////////////////////////////
  //MsgBox functions
  function msgBoxChange(){
    //This is overwritten internally by drawInterface
    //so that it changes size on resizing the screen
  }
//////////////////////////////////////////////////////////////////////////////
  //Debug Functions
  function debugMsg(msg){
    //Like msgBoxChange this will be overwritten, by frontUI,
    //so resizing works
    console.log(msg);
  }

//////////////////////////////////////////////////////////////////////////////
  //Extern Method calls
  function externStartUI(){
    if(!hasInitialized){
      hasInitialized = true;
      var i, max = maxLayerCount;

      i = -1;
      while(i++ < max)
        globalOutLayerAry.push(new Kinetic.Layer());

      frontUI(globalBackLayer, globalFrontLayer, width, height);

      //Load First Slide
      loadNextSlide(globalOutLayerAry);

      //Assemble the Layers
      stage.add(globalBackLayer);

      i = -1;
      while(i++ < max)
        stage.add(globalOutLayerAry[i]);

      stage.add(globalFrontLayer);

      if(DEBUG)
        stage.add(globalDebugLayer);
    }
  };

  function externResize(){
    if(!globalUIBlock)
      reSize(globalOutLayerAry,window.innerWidth-10,window.innerHeight-10);
  };

//////////////////////////////////////////////////////////////////////////////
//Public accessor functions

  this.startUI = function(){
    externStartUI();
  };

  this.reSize = function(){
    if(!globalUIBlock)
      externResize();
  };

  this.msgBoxChange = function(){
    if(!globalUIBlock)
      msgBoxChange();
  }

  this.setDebugMsg = function(msg){
    debugMsg(msg);
  }

  this.next = function(){
    if(!globalUIBlock)
      nextSegment(globalOutLayerAry);
  };

  this.previous = function(){
    if(!globalUIBlock)
      previousSegment(globalOutLayerAry);
  };

  this.nextSlide = function(){
    if(!globalUIBlock)
      nextSlide(globalOutLayerAry);
  };

  this.previousSlide = function(){
    if(!globalUIBlock)
      previousSlide(globalOutLayerAry);
  };

//////////////////////////////////////////////////////////////////////////////
  return{
    msgBoxChange    : this.msgBoxChange,
    setDebugMsg     : this.setDebugMsg,
    reSize          : this.reSize,
    startUI         : this.startUI,
    next            : this.next,
    previous        : this.previous,
    nextSlide       : this.nextSlide,
    previousSlide   : this.previousSlide,
  };
  
})(PreZenSettings);
