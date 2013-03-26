/*Created by David Tran (unsignedzero)
 *PreZen Slides
 *
 *Contained in this file is a working coded slide that I used in my
 *presentation. This is by no means the only way to use PreZen.
 */

//////////////////////////////////////////////////////////////////////////////
//Add Slides Output
//Cover Slide
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){
    supportFunc.clean(outLayerAry,settingsObj);

    var animTime = settingsObj.animTime;
    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;

    var radius = height*0.3;
    var circle;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift+radius, 'What can you see in a display?',
      fontSize+2, fontFamily)));


    circle = new Kinetic.Wedge({
      x: width/2,
      y: height/2 - radius/2,

      radius: radius,

      stroke: 'black',
      strokeWidth: 3,
      angleDeg: 270
    });

    (new Kinetic.Animation(function(frame){
      circle.setAngleDeg(360*frame.time/animTime);
      circle.setRotationDeg(90*frame.time/animTime);
      if(frame.time >= animTime){
        this.stop();
        frame.time=0;
        circle.setAngleDeg(360);
        circle.setRotationDeg(90);
      }
    },outLayerAry[0])).start();

    outLayerAry[0].add(circle);

    outLayerAry[1].add(center(drawText(
      width/2, height*(3/4), 'Created by David Tran',
      fontSize+2, fontFamily)));


    return 2;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Test ZONE
//////////////////////////////////////////////////////////////////////////////
if(PreZenSettings.showDebugSlide){
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Screen Comparison",
      fontSize+20, fontFamily)));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/CompareScreen.png';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1,
      height: minDim/4,
      image: imgAry[imgAryCur]
    })));

    return 2;
  }
);
}
//////////////////////////////////////////////////////////////////////////////
//TOC Slide
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var createBullet = supportFunc.createBullet;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Overview",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(createBullet(width/6, height/4, fontSize));
    outLayerAry[1].add(drawText(
      width/6, height/4, "Displays and Color Gamut",
      fontSize+5, fontFamily));

    outLayerAry[2].add(createBullet(width/6, height/4+3*fontSize, fontSize));
    outLayerAry[2].add(drawText(
      width/6, height/4+3*fontSize, "CRT",
      fontSize+5, fontFamily));

		outLayerAry[3].add(createBullet(width/6, height/4+6*fontSize, fontSize));
    outLayerAry[3].add(drawText(
      width/6, height/4+6*fontSize, "Plasma",
      fontSize+5, fontFamily));

    outLayerAry[4].add(createBullet(width/6, height/4+9*fontSize, fontSize));
    outLayerAry[4].add(drawText(
      width/6, height/4+9*fontSize, "LCD",
      fontSize+5, fontFamily));

    outLayerAry[5].add(createBullet(width/6, height/4+12*fontSize, fontSize));
    outLayerAry[5].add(drawText(
      width/6, height/4+12*fontSize, "OLED",
      fontSize+5, fontFamily));

    outLayerAry[6].add(createBullet(width/6, height/4+15*fontSize, fontSize));
    outLayerAry[6].add(drawText(
      width/6, height/4+15*fontSize, "AMOLED",
      fontSize+5, fontFamily));

    outLayerAry[7].add(createBullet(width/6, height/4+18*fontSize, fontSize));
    outLayerAry[7].add(drawText(
      width/6, height/4+18*fontSize, "Table of technology comparison",
      fontSize+5, fontFamily));

    outLayerAry[8].add(createBullet(width/6, height/4+21*fontSize, fontSize));
    outLayerAry[8].add(drawText(
      width/6, height/4+21*fontSize, "Application: Drawing Circles",
      fontSize+5, fontFamily));

    return 9;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Part 1
//Slide 1
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;
    var floor    = supportFunc.floor;

    var i, max, sizeCount;
    var squareSide = width/16;
    var boardWidth = width/4;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Displays",
      fontSize+20, fontFamily)));


    outLayerAry[1].add(createBullet(width/2,height/4,fontSize));

    outLayerAry[1].add(drawText(
      width/2, height*(1/4), "Collection of Light Sources",
      fontSize+5, fontFamily));

    i = 0;
    sizeCount = 4;
    max = sizeCount*sizeCount;
    //Draws first demo board
    while(i < max){
      outLayerAry[2].add(new Kinetic.Circle({
        x: width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        radius: squareSide/2,
        fill: i&2 ? (i&1 ? 'blue' : 'red') : (i&1 ? 'green' : 'white'),
        stroke: 'black',
        strokeWidth: 5
      }));
      i += 1;
    }

    outLayerAry[3].add(createBullet(width/2,height/4+4*fontSize,fontSize));
    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+4*fontSize, "Easier way to display",
      fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+5*fontSize, "information to the user",
      fontSize+5, fontFamily));

    //Draws second demo board
    i = 0;
    while(i < max){
      outLayerAry[4].add(new Kinetic.Circle({
        x: width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        radius: squareSide/2,
        fill: (i<5||i===8) ? 'black' : 'white',
        stroke: 'black',
        strokeWidth: 5
      }));
      i += 1;
    }

    return 5;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 2
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;
    var floor    = supportFunc.floor;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Color Gamut",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(createBullet(width/2,height/4,fontSize));
    outLayerAry[1].add(drawText(
      width/2, height*(1/4), "What colors can be displayed?",
      fontSize+5, fontFamily));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/ColorGamutXref.jpg';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[2].add(createBullet(width/2,height/4+6*fontSize,fontSize));
    outLayerAry[2].add(drawText(
      width/2, height*(1/4)+6*fontSize, "What can be seen in",
      fontSize+5, fontFamily));

    outLayerAry[2].add(drawText(
      width/2, height*(1/4)+7*fontSize, "a print out?",
      fontSize+5, fontFamily));

    outLayerAry[3].add(createBullet(width/2,height/4+13*fontSize,fontSize));
    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+13*fontSize, "Does it look good?",
      fontSize+5, fontFamily));


    return 4;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Part 2 CRT
//Slide 3
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "CRT",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(center(drawText(
      width/2, outlineShift + 0.1*height, "Cathode Ray Tube",
      fontSize+10, fontFamily)));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/crt-monitor.jpg';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1.5,
      height: minDim/1.5,
      image: imgAry[imgAryCur]
    })));

    return 2;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 4
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;
    var floor    = supportFunc.floor;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "CRT (How they work)",
      fontSize+20, fontFamily)));


    outLayerAry[1].add(drawText(
      width/2-2*fontSize, height*(1/4), "1. Electron Gun",
      fontSize+5, fontFamily));

    outLayerAry[1].add(drawText(
      width/2, height*(1/4)+fontSize, "Each color has a gun",
      fontSize, fontFamily));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/750px-CRT_color_enhanced.png';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[2].add(drawText(
      width/2-2*fontSize, height*(1/4)+3*fontSize, "2. Electron Path",
      fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/2-2*fontSize, height*(1/4)+5*fontSize, "3/4. Electron Coils",
      fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+6*fontSize, "There are two coils one for",
      fontSize, fontFamily));

    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+7*fontSize, "horizontial and another for",
      fontSize, fontFamily));

    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+8*fontSize, "vertical",
      fontSize, fontFamily));

    outLayerAry[4].add(drawText(
      width/2-2*fontSize, height*(1/4)+10*fontSize, "5. Anode Connection",
      fontSize+5, fontFamily));

    outLayerAry[5].add(drawText(
      width/2-2*fontSize, height*(1/4)+12*fontSize, "6. Color mask",
      fontSize+5, fontFamily));

    outLayerAry[5].add(drawText(
      width/2, height*(1/4)+13*fontSize, "Seperates the colors",
      fontSize, fontFamily));

    outLayerAry[6].add(drawText(
      width/2-2*fontSize, height*(1/4)+15*fontSize, "7. Phosphor Layer",
      fontSize+5, fontFamily));

    outLayerAry[6].add(drawText(
      width/2, height*(1/4)+16*fontSize, "The sub-pixel that lights up",
      fontSize, fontFamily));

    outLayerAry[6].add(drawText(
      width/2, height*(1/4)+17*fontSize, "when stuck by an electron",
      fontSize, fontFamily));

    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/600px-CRT_screen._closeup.jpg';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[7].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[7].add(align(drawText(
      width/4, height*(1/5), "8 Sample Mask Image",
      fontSize+5, fontFamily)));

    return 8;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 5
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var createBullet = supportFunc.createBullet;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "CRT (Pros/Cons)",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(drawText(
      width/6, height/4-2*fontSize, "-Pros-",
      fontSize+15, fontFamily));

    outLayerAry[1].add(createBullet(width/6, height/4, fontSize));
    outLayerAry[1].add(drawText(
      width/6, height/4, "No Input Lag",
      fontSize+5, fontFamily));

    outLayerAry[2].add(createBullet(width/6, height/4+2*fontSize, fontSize));
    outLayerAry[2].add(drawText(
      width/6, height/4+2*fontSize, "Flexible resolution/refresh rate",
      fontSize+5, fontFamily));

    outLayerAry[3].add(createBullet(width/6, height/4+4*fontSize, fontSize));
    outLayerAry[3].add(drawText(
      width/6, height/4+4*fontSize, "No color distortion and greater viewing angle",
      fontSize+5, fontFamily));

    outLayerAry[4].add(drawText(
      width/6, height/4+8*fontSize, "-Cons-",
      fontSize+15, fontFamily));

    outLayerAry[4].add(createBullet(width/6, height/4+10*fontSize, fontSize));
    outLayerAry[4].add(drawText(
      width/6, height/4+10*fontSize, "Larger size/heavier weight",
      fontSize+5, fontFamily));

    outLayerAry[5].add(createBullet(width/6, height/4+12*fontSize, fontSize));
    outLayerAry[5].add(drawText(
      width/6, height/4+12*fontSize, "More power used compared to an LCD",
      fontSize+5, fontFamily));

    outLayerAry[6].add(createBullet(width/6, height/4+14*fontSize, fontSize));
    outLayerAry[6].add(drawText(
      width/6, height/4+14*fontSize, "Affected by magnetic field",
      fontSize+5, fontFamily));

    outLayerAry[7].add(createBullet(width/6, height/4+16*fontSize, fontSize));
    outLayerAry[7].add(drawText(
      width/6, height/4+16*fontSize, "Recycling is a problem",
      fontSize+5, fontFamily));

    return 8;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Part 3 Plasma
//////////////////////////////////////////////////////////////////////////////
//Slide 6
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var createBullet = supportFunc.createBullet;
    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Plasma",
      fontSize+20, fontFamily)));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/Evolution_of_21st_century_plasma_displays.jpg';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/2.25,
      height: minDim/1.5,
      image: imgAry[imgAryCur]
    })));

    return 2;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 7
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var createBullet = supportFunc.createBullet;
    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Plasma (How they work)",
      fontSize+20, fontFamily)));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/Plasma-display-composition.svg.png';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[1].add(drawText(
      width/2-2*fontSize, height*(1/4), "1. Address Electrode",
      fontSize+5, fontFamily));

    outLayerAry[1].add(drawText(
      width/2, height*(1/4)+fontSize, "Turns on the right pixel",
      fontSize, fontFamily));


    outLayerAry[2].add(drawText(
      width/2-2*fontSize, height*(1/4)+3*fontSize, "2. Plasma Cells",
      fontSize+5, fontFamily));

    outLayerAry[2].add(drawText(
      width/2, height*(1/4)+fontSize+3*fontSize, "Mercury is excited",
      fontSize, fontFamily));

    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+fontSize+5*fontSize, "Electrons excite noble gases",
      fontSize, fontFamily));

    outLayerAry[4].add(drawText(
      width/2, height*(1/4)+fontSize+7*fontSize, "Phosporous lights up",
      fontSize, fontFamily));


    outLayerAry[5].add(drawText(
      width/2-2*fontSize, height*(1/4)+10*fontSize, "3. Front Plate Glass",
      fontSize+5, fontFamily));

    outLayerAry[5].add(drawText(
      width/2, height*(1/4)+fontSize+10*fontSize, "Light is shown on the display",
      fontSize, fontFamily));


    return 6;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 8
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var createBullet = supportFunc.createBullet;
    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Plasma (Pros/Cons)",
      fontSize+20, fontFamily)));


    outLayerAry[1].add(drawText(
      width/6, height/4-2*fontSize, "-Pros-",
      fontSize+15, fontFamily));

    outLayerAry[1].add(createBullet(width/6, height/4, fontSize));
    outLayerAry[1].add(drawText(
      width/6, height/4, "Better Contrast Ratio",
      fontSize+5, fontFamily));

    outLayerAry[2].add(createBullet(width/6, height/4+2*fontSize, fontSize));
    outLayerAry[2].add(drawText(
      width/6, height/4+2*fontSize, "Lower Motion Blur",
      fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/6, height/4+8*fontSize, "-Cons-",
      fontSize+15, fontFamily));

    outLayerAry[3].add(createBullet(width/6, height/4+10*fontSize, fontSize));
    outLayerAry[3].add(drawText(
      width/6, height/4+10*fontSize, "Uses more power on average than LCD",
      fontSize+5, fontFamily));

    outLayerAry[4].add(createBullet(width/6, height/4+12*fontSize, fontSize));
    outLayerAry[4].add(drawText(
      width/6, height/4+12*fontSize, "Can't be used above 2km, due to pressure",
      fontSize+5, fontFamily));

    outLayerAry[5].add(createBullet(width/6, height/4+14*fontSize, fontSize));
    outLayerAry[5].add(drawText(
      width/6, height/4+14*fontSize,
      "Can't use AM radio, radio frequency interference",
      fontSize+5, fontFamily));

    return 6;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Part 3 LCD
//Slide 9
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "LCD",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(center(drawText(
      width/2, outlineShift + 0.10*height, "Liquid Crystal Display",
      fontSize+10, fontFamily)));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/45567-lg-55lh40-55-lcd-tv1.jpg';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1.5,
      height: minDim/1.5,
      image: imgAry[imgAryCur]
    })));

    return 2;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 10
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;
    var floor    = supportFunc.floor;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "LCD (How they work)",
      fontSize+20, fontFamily)));


    outLayerAry[1].add(drawText(
      width/2-2*fontSize, height*(1/4), "1 Polarizing Filter",
      fontSize+5, fontFamily));

    outLayerAry[1].add(drawText(
      width/2, height*(1/4)+fontSize, "Forces only light in one direction",
      fontSize, fontFamily));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/800px-LCD_layers.svg.png';

    outLayerAry[1].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[2].add(drawText(
      width/2-2*fontSize, height*(1/4)+3*fontSize, "2 LCD cutout",
      fontSize+5, fontFamily));

    outLayerAry[2].add(drawText(
      width/2, height*(1/4)+4*fontSize, "Cut the screen into shapes",
      fontSize, fontFamily));

    outLayerAry[3].add(drawText(
      width/2-2*fontSize, height*(1/4)+6*fontSize, "3 Liquid Crystals",
      fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+7*fontSize, "Bends to reflect light, as needed",
      fontSize, fontFamily));

    outLayerAry[4].add(drawText(
      width/2-2*fontSize, height*(1/4)+9*fontSize, "4 Electrodes",
      fontSize+5, fontFamily));

    outLayerAry[4].add(drawText(
      width/2, height*(1/4)+10*fontSize, "Power the crystal to bend them",
      fontSize, fontFamily));

    outLayerAry[4].add(drawText(
      width/2, height*(1/4)+11*fontSize, "Light will pass but be cancelled",
      fontSize, fontFamily));

    outLayerAry[5].add(drawText(
      width/2-2*fontSize, height*(1/4)+13*fontSize, "5 Polar Lens",
      fontSize+5, fontFamily));

    outLayerAry[5].add(drawText(
      width/2, height*(1/4)+14*fontSize, "Cancels any remaining light",
      fontSize, fontFamily));

    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/800px-LCDneg.jpg';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[6].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2.33,
      height: minDim/3,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[6].add(align(drawText(
      width/4, height*(1/5), "LCD with polar lens on top",
      fontSize+5, fontFamily)));


    return 7;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 11
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var createBullet = supportFunc.createBullet;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "LCD (Backlight Technology)",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(createBullet(width/6, height/4, fontSize));
    outLayerAry[1].add(drawText(
      width/6, height/4, "CCFL - Cold Cathode Fluorescent Lamps",
      fontSize+5, fontFamily));

    outLayerAry[1].add(drawText(
      width/6, height/4+1*fontSize, "Diffuser and two polarizers to distribute the light",
      fontSize, fontFamily));

    outLayerAry[2].add(createBullet(width/6, height/4+4*fontSize, fontSize));
    outLayerAry[2].add(drawText(
      width/6, height/4+4*fontSize, "EL-WLED - Edge Lined - White LED",
      fontSize+5, fontFamily));

    outLayerAry[2].add(drawText(
      width/6, height/4+5*fontSize, "Diffuses white light across the back of LC array",
      fontSize, fontFamily));

    outLayerAry[3].add(createBullet(width/6, height/4+8*fontSize, fontSize));
    outLayerAry[3].add(drawText(
      width/6, height/4+8*fontSize, "WLED - White LED",
      fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/6, height/4+9*fontSize, "Can be dimmed in certain spots to allow ",
      fontSize, fontFamily));

    outLayerAry[3].add(drawText(
      width/6, height/4+10*fontSize, "darker blacks and similarly brighter whites",
      fontSize, fontFamily));

    outLayerAry[4].add(createBullet(width/6, height/4+13*fontSize, fontSize));
    outLayerAry[4].add(drawText(
      width/6, height/4+13*fontSize, "RGB-LED - Red Green Blue - LED",
      fontSize+5, fontFamily));

    outLayerAry[4].add(drawText(
      width/6, height/4+14*fontSize, "CCFL-like color gamut but power efficient",
      fontSize, fontFamily));

    return 5;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 12
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;
    var floor    = supportFunc.floor;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "LCD (Active Matrix)",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(center(drawText(
      width/2, outlineShift + 0.1*height, "TFT - Thin Film Transistor",
      fontSize+10, fontFamily)));

    outLayerAry[2].add(createBullet(width/2, height*(1/4), fontSize));
    outLayerAry[2].add(drawText(
      width/2, height*(1/4), "TN - Twisted Nematic",
      fontSize+5, fontFamily));

    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/TN_Twisted.png';

    outLayerAry[2].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2.5,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+fontSize, "Initially limited to shades of grey",
      fontSize, fontFamily));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/TN_UnTwisted.png';

    outLayerAry[3].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2.5,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[4].add(drawText(
      width/2, height*(1/4)+2*fontSize, "Used early on in calculators",
      fontSize, fontFamily));


    outLayerAry[5].add(createBullet(width/2, height*(1/4)+7*fontSize, fontSize));
    outLayerAry[5].add(drawText(
      width/2, height*(1/4)+7*fontSize, "IPS - In-plane Switching",
      fontSize+5, fontFamily));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/IPS_On.png';

    outLayerAry[5].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2.5,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/IPS_Off.png';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[6].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2.5,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[6].add(drawText(
      width/2, height*(1/4)+8*fontSize, "Power plane parallel the crystal.",
      fontSize, fontFamily));

    outLayerAry[7].add(drawText(
      width/2, height*(1/4)+9*fontSize, "Faster response, better color,",
      fontSize, fontFamily));

    outLayerAry[7].add(drawText(
      width/2, height*(1/4)+10*fontSize, "better angles",
      fontSize, fontFamily));


    return 8;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 13
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "LCD (Matrix and Backlight)",
      fontSize+20, fontFamily)));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/active-matrix.jpg';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1.125,
      height: minDim/1.5,
      image: imgAry[imgAryCur]
    })));

    return 2;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 14
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var createBullet = supportFunc.createBullet;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "LCD (Pros/Cons)",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(drawText(
      width/6, height/4-2*fontSize, "-Pros-",
      fontSize+15, fontFamily));

    outLayerAry[1].add(createBullet(width/6, height/4, fontSize));
    outLayerAry[1].add(drawText(
      width/6, height/4, "Compact and lighter",
      fontSize+5, fontFamily));

    outLayerAry[2].add(createBullet(width/6, height/4+2*fontSize, fontSize));
    outLayerAry[2].add(drawText(
      width/6, height/4+2*fontSize, "Lower power consumption",
      fontSize+5, fontFamily));

    outLayerAry[3].add(createBullet(width/6, height/4+4*fontSize, fontSize));
    outLayerAry[3].add(drawText(
      width/6, height/4+4*fontSize, "Any shape, any size",
      fontSize+5, fontFamily));


    outLayerAry[4].add(drawText(
      width/6, height/4+8*fontSize, "-Cons-",
      fontSize+15, fontFamily));

    outLayerAry[4].add(createBullet(width/6, height/4+10*fontSize, fontSize));
    outLayerAry[4].add(drawText(
      width/6, height/4+10*fontSize, "Limited viewing angle",
      fontSize+5, fontFamily));

    outLayerAry[5].add(createBullet(width/6, height/4+12*fontSize, fontSize));
    outLayerAry[5].add(drawText(
      width/6, height/4+12*fontSize, "One native resolution",
      fontSize+5, fontFamily));

    outLayerAry[6].add(createBullet(width/6, height/4+14*fontSize, fontSize));
    outLayerAry[6].add(drawText(
      width/6, height/4+14*fontSize, "Dead/stuck pixel",
      fontSize+5, fontFamily));

    outLayerAry[7].add(createBullet(width/6, height/4+16*fontSize, fontSize));
    outLayerAry[7].add(drawText(
      width/6, height/4+16*fontSize, "Not good in sunlight",
      fontSize+5, fontFamily));

    return 8;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 15
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "LCD Viewing Angle and Response Time",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(center(drawText(
      width/2, outlineShift + 0.9*height, "MVA - Multi-Domain Vertical Alignment",
      fontSize+10, fontFamily)));

    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/image65.gif';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1.25,
      height: minDim/1.5,
      image: imgAry[imgAryCur]
    })));

    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/image66.gif';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[2].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1.25,
      height: minDim/1.5,
      image: imgAry[imgAryCur]
    })));

    return 3;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Part 4 OLED
//Slide 16
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "OLED",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(center(drawText(
      width/2, outlineShift + 0.1*height, "Organic Light Emitting Diode",
      fontSize+10, fontFamily)));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/Sony_XEL-1.jpg';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1.125,
      height: minDim/1.5,
      image: imgAry[imgAryCur]
    })));

    return 2;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 17
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;
    var floor    = supportFunc.floor;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "OLED (How they work) ",
      fontSize+20, fontFamily)));


    outLayerAry[1].add(drawText(
      width/2-2*fontSize, height*(1/4), "1  Atoms are stripped of electrons",
      fontSize+5, fontFamily));

    outLayerAry[1].add(drawText(
      width/2, height*(1/4)+fontSize, "in the conductive layer (4)",
      fontSize, fontFamily));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/OLED_schematic.svg.png';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2,
      height: minDim/4,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[2].add(drawText(
      width/2-2*fontSize, height*(1/4)+3*fontSize, "2  Electrons from this layer",
      fontSize+5, fontFamily));

    outLayerAry[2].add(drawText(
      width/2, height*(1/4)+4*fontSize, "(emissive layer) are pulled to the",
      fontSize, fontFamily));

    outLayerAry[2].add(drawText(
      width/2, height*(1/4)+5*fontSize, "conductive layer (2)",
      fontSize, fontFamily));

    outLayerAry[3].add(drawText(
      width/2-2*fontSize, height*(1/4)+7*fontSize, "3 Holes and electrons collide",
      fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/2, height*(1/4)+8*fontSize, "creating Light (3)",
      fontSize, fontFamily));

    outLayerAry[4].add(drawText(
      width/2, height*(1/4)+10*fontSize, "-Layers of Interest-",
      fontSize+15, fontFamily));

    outLayerAry[4].add(drawText(
      width/2, height*(1/4)+13*fontSize, "1 Cathode Layer (-)",
      fontSize+5, fontFamily));

    outLayerAry[4].add(drawText(
      width/2, height*(1/4)+15*fontSize, "5 Anode Layer (+)",
      fontSize+5, fontFamily));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/OLED_EarlyProduct.JPG';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[5].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[5].add(align(drawText(
      width/4, height*(1/5), "Sample OLED Screen",
      fontSize+5, fontFamily)));


    return 6;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 18
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var createBullet = supportFunc.createBullet;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "OLED (Pros/Cons)",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(drawText(
      width/6, height/4-2*fontSize, "-Pros-",
      fontSize+15, fontFamily));

    outLayerAry[1].add(createBullet(width/6, height/4, fontSize));
    outLayerAry[1].add(drawText(
      width/6, height/4, "Flexible screens",
      fontSize+5, fontFamily));

    outLayerAry[2].add(createBullet(width/6, height/4+2*fontSize, fontSize));
    outLayerAry[2].add(drawText(
      width/6, height/4+2*fontSize, "Response time ~2-16ms",
      fontSize+5, fontFamily));


    outLayerAry[3].add(drawText(
      width/6, height/4+8*fontSize, "-Cons-",
      fontSize+15, fontFamily));

    outLayerAry[3].add(createBullet(width/6, height/4+10*fontSize, fontSize));
    outLayerAry[3].add(drawText(
      width/6, height/4+10*fontSize, "Power consumption 60-80% more ",
      fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/6, height/4+11*fontSize, "power with white backgrounds",
      fontSize, fontFamily));

    outLayerAry[4].add(createBullet(width/6, height/4+13*fontSize, fontSize));
    outLayerAry[4].add(drawText(
      width/6, height/4+13*fontSize, "14000 hour until blue is at 50% brightness",
      fontSize+5, fontFamily));

    outLayerAry[5].add(createBullet(width/6, height/4+15*fontSize, fontSize));
    outLayerAry[5].add(drawText(
      width/6, height/4+15*fontSize, "5igh Cost. $8,000",
      fontSize+5, fontFamily));

    outLayerAry[6].add(createBullet(width/6, height/4+17*fontSize, fontSize));
    outLayerAry[6].add(drawText(
      width/6, height/4+17*fontSize, "In Development Land",
      fontSize+5, fontFamily));

    return 7;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Part 5 AMOLED
//Slide 19
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "AMOLED",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(center(drawText(
      width/2, outlineShift + 0.1*height, "Active Matrix Organic LED",
      fontSize+10, fontFamily)));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/Samsung-Galaxy-S3-in-Sapphire-black.jpg';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1.5,
      height: minDim/1.5,
      image: imgAry[imgAryCur]
    })));

    return 2;
  }
);
//////////////////////////////////////////////////////////////////////////////
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;
    var floor    = supportFunc.floor;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "AMOLED (How they work)",
      fontSize+20, fontFamily)));


    outLayerAry[1].add(drawText(
      width/2-2*fontSize, height*(1/4), "  Similar to OLED except...",
      fontSize+5, fontFamily));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/AMOLED-en.svg.png';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2,
      height: minDim/4,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[2].add(drawText(
      width/2-2*fontSize, height*(1/4)+3*fontSize, "  Anode layer replaced with",
      fontSize+5, fontFamily));

    outLayerAry[2].add(drawText(
      width/2, height*(1/4)+4*fontSize, "TFT active matrix",
      fontSize, fontFamily));


    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/Galaxy_Note_II_subpixels_representation.png';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[3].add(center(new Kinetic.Image({
      x: width/4,
      y: height/4,
      width: minDim/2,
      height: minDim/2,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[3].add(align(drawText(
      width/4, height*(1/5), "Sample SubPixel Image",
      fontSize+5, fontFamily)));


    return 4;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 20
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var createBullet = supportFunc.createBullet;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "AMOLED (Pros/Cons)",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(drawText(
      width/6, height/4-2*fontSize, "-Pros-",
      fontSize+15, fontFamily));

    outLayerAry[1].add(createBullet(width/6, height/4, fontSize));
    outLayerAry[1].add(drawText(
      width/6, height/4, "10 year before noticable degeneration",
      fontSize+5, fontFamily));

    outLayerAry[2].add(createBullet(width/6, height/4+2*fontSize, fontSize));
    outLayerAry[2].add(drawText(
      width/6, height/4+2*fontSize, "Better image quality due to higher contrast ratios",
      fontSize+5, fontFamily));

    outLayerAry[3].add(createBullet(width/6, height/4+4*fontSize, fontSize));
    outLayerAry[3].add(drawText(
      width/6, height/4+4*fontSize, "Faster response time <1ms",
      fontSize+5, fontFamily));

    outLayerAry[4].add(drawText(
      width/6, height/4+8*fontSize, "-Cons-",
      fontSize+15, fontFamily));

    outLayerAry[4].add(createBullet(width/6, height/4+10*fontSize, fontSize));
    outLayerAry[4].add(drawText(
      width/6, height/4+10*fontSize, "High Demand (Low Supply)",
      fontSize+5, fontFamily));

    outLayerAry[5].add(createBullet(width/6, height/4+12*fontSize, fontSize));
    outLayerAry[5].add(drawText(
      width/6, height/4+12*fontSize, "Lower brightness than LCD",
      fontSize+5, fontFamily));

    outLayerAry[5].add(drawText(
      width/6, height/4+13*fontSize, "can be hard to see outside",
      fontSize, fontFamily));

    outLayerAry[6].add(createBullet(width/6, height/4+15*fontSize, fontSize));
    outLayerAry[6].add(drawText(
      width/6, height/4+15*fontSize, "Burn-ins, less so than CRTs",
      fontSize+5, fontFamily));


    return 7;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 21
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var imgAry = [];
    var imgAryCur = -1;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Screen Comparision",
      fontSize+20, fontFamily)));

    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/CompareScreen.png';
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[1].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1,
      height: minDim/4,
      image: imgAry[imgAryCur]
    })));

    outLayerAry[2].add(center(drawText(
      width/2, outlineShift + 0.1*height,
      "SXGA - Super Extended Graphics Array 1280x1024",
      fontSize+10, fontFamily)));

    outLayerAry[2].add(center(drawText(
      width/2, outlineShift + 0.15*height,
      "1080p - (FHD) 1980x1080",
      fontSize+10, fontFamily)));

    outLayerAry[2].add(center(drawText(
      width/2, outlineShift + 0.20*height,
      "1080p - (QFHD) 3840x2160",
      fontSize+10, fontFamily)));

    outLayerAry[2].add(center(drawText(
      width/2, outlineShift + 0.20*height,
      "1080p - (QFHD) 3840x2160",
      fontSize+10, fontFamily)));

    outLayerAry[2].add(center(drawText(
      width/2, outlineShift + 0.25*height,
      "WQXGA - Wide Quad Extended GA 2500x1600", 
      fontSize+10, fontFamily)));

    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/Vector_Video_Standards2.svg.png',
    imgAry[imgAryCur].onload = function(){
    };

    outLayerAry[3].add(align(new Kinetic.Image({
      x: width/2,
      y: height/2+height/20,
      width: minDim/1,
      height: minDim/1.25,
      image: imgAry[imgAryCur]
    })));

    return 4;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Part 6 Drawing
//Slide 22
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){
    supportFunc.clean(outLayerAry,settingsObj);

    var animTime = settingsObj.animTime;
    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;

    var radius = height*0.3;
    var circlea, circleb;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift+radius, 'Applications',
      fontSize+2, fontFamily)));

    circlea = new Kinetic.Wedge({
      x: width/2,
      y: height/2 - radius/2,

      radius: radius,

      stroke: 'black',
      strokeWidth: 3,
      angleDeg: 270
    });

    circleb = new Kinetic.Wedge({
      x: width/2,
      y: height/2 - radius/2,

      radius: radius/2,

      stroke: 'black',
      strokeWidth: 3,
      angleDeg: 90,
      rotationDeg: -180
    });

    (new Kinetic.Animation(function(frame){
      circlea.setAngleDeg(360*frame.time/animTime);
      circleb.setAngleDeg(360*frame.time/animTime);
      if(frame.time >= animTime){
        this.stop();
        frame.time=0;
        circlea.setAngleDeg(360);
        circleb.setAngleDeg(360);
      }
    },outLayerAry[0])).start();

    outLayerAry[0].add(circlea);
    outLayerAry[0].add(circleb);

    outLayerAry[1].add(center(drawText(
      width/2, outlineShift+radius*1.8, "Drawing Circles",
      fontSize+2, fontFamily)));


    return 2;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 23
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var radius = height*0.2;

    var temp;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, 'Mathematic Model',
      fontSize+20, fontFamily)));


    outLayerAry[1].add(new Kinetic.Wedge({
      x: width/4,
      y: height/2 - radius/2 + fontSize,

      radius: radius,
      angleDeg: 360,

      stroke: 'black',
      strokeWidth: 3
    }));

    outLayerAry[1].add(center(drawText(
      width/4,height/2 - radius/2,'x^2 + y^2 = r^2',
      fontSize, fontFamily)));

    outLayerAry[2].add(center(drawText(
      width*3/4, height*1/3, 'Implications',
      fontSize+15, fontFamily)));

    outLayerAry[3].add(center(drawText(
      width*3/4, height*1/3 + 2*fontSize, 'Negative Radius',
      fontSize+5, fontFamily)));

    outLayerAry[4].add(center(drawText(
      width*3/4, height*1/3 + 3*fontSize, 'Possible',
      fontSize, fontFamily)));

    outLayerAry[4].add(new Kinetic.Wedge({
      x: width/4,
      y: height/2 - radius/2 + fontSize,

      radius: radius,
      angleDeg: 360,

      fill: 'white',
      stroke: 'black',
      strokeWidth: 3,
      rotationDeg: 180
    }));
    outLayerAry[4].add(center(drawText(
      width/4,height/2 - radius/2,'x^2 + y^2 = (-r)^2',
      fontSize, fontFamily)));

    outLayerAry[5].add(center(drawText(
      width*3/4, height*1/3 + 5*fontSize, 'Perfect World Model',
      fontSize+5, fontFamily)));

    outLayerAry[6].add(center(drawText(
      width*3/4, height*1/3 + 6*fontSize, 'Impossible',
      fontSize, fontFamily)));


    return 7;
  }
);

//////////////////////////////////////////////////////////////////////////////
//Slide 24
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    //Creates the demo
    var drawPixelCircle = supportFunc.drawPixelCircle;

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var radius = height*0.2;
    var side = 50;

    var squareSide = minDim/12;
    var boardWidth = minDim/3;

    var buttonObjAry = [{},{}];

    var i, x, y, max, sizeCount, temp;

    sizeCount = 3;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Pixel Model",
      fontSize+20, fontFamily)));

    outLayerAry[2].add(center(drawText(
      width*(2/3), height*(1/4), "Representation",
      fontSize+15, fontFamily)));

    outLayerAry[2].add(center(drawText(
      width*(2/3), height*(1/4)+2*fontSize, "2d array of cell",
      fontSize+5, fontFamily)));

    outLayerAry[3].add(center(drawText(
      width*(2/3), height*(1/4)+4*fontSize, "Color is just a number",
      fontSize+5, fontFamily)));

    outLayerAry[3].add(center(drawText(
      width*(2/3), height*(1/4)+5*fontSize,"R:255,G:255,B:255",
      fontSize, fontFamily)));


    i = 0;
    max = 2;
    //Create the interactive buttons for the demo
    while(i < max){
      x = width/4 + (i&1?-minDim/16:minDim/16);
      y = height*(2/3);

      outLayerAry[2].add(align(drawText(
        x, y, i&1 ? '-' : '+', fontSize+20, fontFamily)));


      buttonObjAry[i] = new Kinetic.Rect({
        x: x,
        y: y,
        width: squareSide,
        height: squareSide,
        offset: [squareSide/2,squareSide/2],

        stroke: 'black',
        strokeWidth: 5,
        cornerRadius: 10
      });

      if(i&1)
        buttonObjAry[i].call = function(sizeCurCount){
        if(sizeCurCount > 2){
          sizeCount -= 1;
          drawPixelCircle(outLayerAry[1], width/4-(boardWidth/2),
            height/6, minDim/3, sizeCount);
          }
        };
      else
        buttonObjAry[i].call = function(sizeCurCount){
        if(sizeCurCount < 40){
          sizeCount += 1;
          drawPixelCircle(outLayerAry[1], width/4-(boardWidth/2),
            height/6, minDim/3, sizeCount);
          }
        };

      buttonObjAry[i].on('tap mousedown', function(){
        this.call(sizeCount);
      });

      outLayerAry[2].add(buttonObjAry[i]);
      i += 1;
    }

    //Draws the initial demo
    drawPixelCircle(outLayerAry[1], width/4-(boardWidth/2),
      height/6, minDim/3, sizeCount);

    outLayerAry[4].add(center(drawText(
      width*(2/3), height*(1/3)+5*fontSize, "Problems",
      fontSize+15, fontFamily)));

    outLayerAry[5].add(center(drawText(
      width*(2/3), height*(1/3)+7*fontSize,
      "Blocky given smaller amount of pixels", fontSize, fontFamily)));

    outLayerAry[6].add(center(drawText(
      width*(2/3), height*(1/3)+9*fontSize, "Can be blurry if scaled",
      fontSize, fontFamily)));


    temp = center(new Kinetic.Rect({
      x: width/4,
      y: height*(3/4),
      width: squareSide,
      height: squareSide,
      stroke: 'black',

      strokeWidth: 5,
      cornerRadius: 10
    }));

    temp.on('tap mousedown', function(){
      drawPixelCircle(outLayerAry[1], width/4-(boardWidth/2),
        height/6, minDim/3, sizeCount, true);
    });

    outLayerAry[6].add(temp);

    i = 0;
    max = 4;

    //Draws the second set of squares, bottom
    while(i < max){
      outLayerAry[7].add(new Kinetic.Rect({
        x: width*(2/3) -  (i&1 ? squareSide : 0) + (squareSide),
        y: height*(4/5) - (i&2 ? squareSide : 0) + (squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5
      }));
      i += 1;
    }

    outLayerAry[7].add(new Kinetic.Rect({
      x: width*(2/3) + (squareSide>>1),
      y: height*(4/5) + (squareSide>>1),
      width: squareSide*(5/4),
      height: squareSide*(5/4),
      offset: [squareSide*(9/8),squareSide*(9/8)],
      stroke: 'black',
      fill: 'black',
      strokeWidth: 5
    }));

    outLayerAry[7].add(new Kinetic.Rect({
      x: width*(2/3) + (squareSide*(3/2*9/8)),
      y: height*(4/5) + (squareSide>>1),
      width: squareSide*(5/4),
      height: squareSide*(5/4),
      offset: [squareSide*(9/8),squareSide*(9/8)],
      stroke: 'black',
      fill: 'grey',
      strokeWidth: 5
    }));

    return 8;
  }
);

//////////////////////////////////////////////////////////////////////////////
//Slide 25
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;
    var floor = supportFunc.floor;
    var createBullet = supportFunc.createBullet;

    var squareSide = width/20;
    var boardWidth = width/4;

    var i, x, y, max, sizeCount, fill;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Pixel Model (cont'd)",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(drawText(
      width/2, height*1/4, "Advantage", fontSize+15, fontFamily));

    outLayerAry[2].add(createBullet(width/2, height/4+3*fontSize,fontSize));
    outLayerAry[2].add(drawText(
      width/2, height/4+3*fontSize, "Uniform", fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/2, height/4+4*fontSize, "Every pixel has a value", fontSize, fontFamily));


    i = 0;
    max = 2;
    sizeCount = 4;
    max = sizeCount*sizeCount;
    //Draws first demo board
    while(i < max){
      outLayerAry[3].add(new Kinetic.Rect({
        x: width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5
      }));
      i += 1;
    }

    outLayerAry[4].add(createBullet(width/2, height/4+7*fontSize,fontSize));
    outLayerAry[4].add(drawText(
      width/2, height*1/4+7*fontSize, "Easy to represent",
      fontSize+5, fontFamily));

    outLayerAry[5].add(drawText(
      width/2, height*1/4+8*fontSize, "All pixels are the same",
      fontSize, fontFamily));

    outLayerAry[6].add(drawText(
      width/2, height*1/4+9*fontSize, "Drawing is easy",
      fontSize, fontFamily));


    i = 0;
    sizeCount = 3;
    max = sizeCount*sizeCount;
    //Draws second demo board
    while(i < max){
      outLayerAry[6].add(new Kinetic.Rect({
        x: width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide,
        y: height*(2/3) + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5,
        fill: i%2 ? 'white': 'black'
      }));
      i += 1;
    }

    outLayerAry[7].add(createBullet(width/2, height/4+12*fontSize,fontSize));
    outLayerAry[7].add(drawText(
      width/2, height*1/4+12*fontSize, "Easy to compress",
      fontSize+5, fontFamily));


    i = 0;
    sizeCount = 4;
    max = sizeCount*sizeCount;
    //Draws third demo board
    while(i < max){
      fill = 'grey';
      if(i === 0||i === 3||i === 12||i === 15)
        fill = 'black';
      outLayerAry[7].add(new Kinetic.Rect({
        x: width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5,
        fill: fill
      }));
      i += 1;
    }

    i = 0;
    sizeCount = 3;
    max = sizeCount*sizeCount;
    while(i < max){
      outLayerAry[7].add(new Kinetic.Rect({
        x: width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide*(3/2),squareSide/2],
        stroke: 'black',
        strokeWidth: 5,
        fill: i%2 ? 'white': 'black'
      }));
      i += 1;
    }

    return 8;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 26
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;
    var floor    = supportFunc.floor;
    var createBullet = supportFunc.createBullet;

    var squareSide = width/16;
    var boardWidth = width/4;

    var i, x, y, max, sizeCount;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Vector Model",
      fontSize+20, fontFamily)));


    x = width/4;
    y = height/4;

    outLayerAry[1].add(new Kinetic.Line({
      points: [x,y+50,x+50,y,x+35,y,x+50,y,x+50,y+15,x+50,y],
      stroke: 'red',
      strokeWidth: 10,
      lineCap: 'round',
      lineJoin: 'round'
    }));

    outLayerAry[1].add(drawText(
      width/2, height/4, "Representation",
      fontSize+15, fontFamily));

    outLayerAry[1].add(createBullet(width/2, height*(1/4)+3*fontSize,fontSize));
    outLayerAry[1].add(drawText(
      width/2, height*(1/4)+3*fontSize, "Magnitude and Direction",
      fontSize+5, fontFamily));


    x = width/4 - 20;
    y = height/4;
    outLayerAry[2].add(new Kinetic.Line({
      points: [x,y+50,x+50,y,x+35,y,x+50,y,x+50,y+15,x+50,y],
      stroke: 'blue',
      strokeWidth: 10,
      lineCap: 'round',
      lineJoin: 'round'
    }));

    x = width/4 - 20;
    y = height/4 + 20;
    outLayerAry[2].add(new Kinetic.Line({
      points: [x,y+100,x+100,y,x+85,y,x+100,y,x+100,y+15,x+100,y],
      stroke: 'blue',
      strokeWidth: 10,
      lineCap: 'round',
      lineJoin: 'round'
    }));

    outLayerAry[2].add(drawText(
      width/2, height/4+4*fontSize, "Stored as a tuple ",
      fontSize, fontFamily));

    outLayerAry[2].add(drawText(
      width/2, height/4+5*fontSize, "<50,50>",
      fontSize, fontFamily));

    outLayerAry[3].add(drawText(
      width/2, height/4+8*fontSize, "Problems",
      fontSize+15, fontFamily));

    outLayerAry[4].add(createBullet(width/2, height/4+11*fontSize,fontSize));
    outLayerAry[4].add(drawText(
      width/2, height/4+11*fontSize, "No specific \"start\" point",
      fontSize+5, fontFamily));

    outLayerAry[5].add(drawText(
      width/2, height/4+12*fontSize,"<(" + width/4 + ',' + height/4 + "),50,50>",
      fontSize, fontFamily));


    i = 0;
    sizeCount = 4;
    max = sizeCount*sizeCount;
    //Draws demo board
    while(i < max){
      outLayerAry[6].add(new Kinetic.Rect({
        x: width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5
      }));
      i += 1;
    }

    outLayerAry[6].add(createBullet(width/2, height*(1/4)+14*fontSize,fontSize));
    outLayerAry[6].add(drawText(
      width/2, height/4+14*fontSize, "How do you draw vectors?",
      fontSize+5, fontFamily));


    i = 0;
    while(i < max){
      outLayerAry[7].add(new Kinetic.Rect({
        x: width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        fill: (i===5)? 'red' : 'white',
        strokeWidth: 5
      }));
      i += 1;
    }

    outLayerAry[7].add(drawText(
      width/2, height/4+15*fontSize, "Not simple to render or draw",
      fontSize, fontFamily));


    return 8;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide 27
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;
    var align = supportFunc.align;

    var buttonObjAry = [{},{}];

    var squareSide = minDim/12;

    var i, x, y, max, line, left;
    var addx, addy, shape;

    addx = 0.35;
    addy = 0.35;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Vector Model (cont'd)",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(center(drawText(
      width*2/3, height*1/4, "Advantage", fontSize+15, fontFamily)));

    outLayerAry[2].add(shape = new Kinetic.Spline({
      points: [{ x:width/4, y:height/4 },
               { x:width/3, y:height/2 },
               { x:width/2, y:height/2 },
               { x:width/2, y:height/3 },
               { x:width/4, y:height/4 }],
      stroke: 'blue',
      strokeWidth: 5,
      lineCap: 'round',
      tension: 1
    }));

    outLayerAry[2].add(center(drawText(
      width*2/3, height*1/4+4*fontSize, "Mathematically represent curves",
      fontSize+5, fontFamily)));


    left = minDim/6;
    outLayerAry[3].add(new Kinetic.Polygon({
      points: [minDim*0.375-left,minDim*0.250,minDim*0.500-left,minDim*0.375,
               minDim*0.375-left,minDim*0.500,minDim*0.250-left,minDim*0.375],
      fill: 'white',
      stroke: 'black',
      strikeWidth: 5
    }));

    outLayerAry[3].add(line = new Kinetic.Line({
      points: [minDim*0.3125-left+5*addx,minDim*0.4375-5*addy,
               minDim*0.4375-left-5*addx,minDim*0.3125+5*addy],
      stroke: 'blue',
      strokeWidth: 10,
      lineCap: 'square'
    }));

    outLayerAry[3].add(center(drawText(
      width*2/3, height*1/4+8*fontSize, "Infinite Zoom",
      fontSize+5, fontFamily)));

    outLayerAry[4].add(center(drawText(
      width*2/3, height*1/4+12*fontSize, "Always Sharp",
      fontSize+5, fontFamily)));


    i = 0;
    max = 2;
    //Create the interactive buttons for the demo
    while(i < max){
      x = width/4 + (i&1?-minDim/16:minDim/16);
      y = height*(2/3);

      outLayerAry[3].add(align(drawText(
        x, y, i&1 ? '-' : '+', fontSize+20, fontFamily)));


      buttonObjAry[i] = new Kinetic.Rect({
        x: x,
        y: y,
        width: squareSide,
        height: squareSide,
        offset: [squareSide/2,squareSide/2],

        stroke: 'black',
        strokeWidth: 5,
        cornerRadius: 10
      });

      if(i&1)
        buttonObjAry[i].call = function(line){
          var q;
          if((q = line.getStrokeWidth()) > 2){
            q -=2;
            line.setStrokeWidth(q);
            //shape.setStrokeWidth(q);
            line.setPoints([minDim*0.3125-left+q*addx,minDim*0.4375-q*addy,
                            minDim*0.4375-left-q*addx,minDim*0.3125+q*addy]);
            outLayerAry[2].draw();
            outLayerAry[3].draw();
          }
        };
      else
        buttonObjAry[i].call = function(line){
          var q;
          if((q = line.getStrokeWidth()) < 40){
            q +=2;
            line.setStrokeWidth(q);
            //shape.setStrokeWidth(q);
            line.setPoints([minDim*0.3125-left+q*addx,minDim*0.4375-q*addy,
                            minDim*0.4375-left-q*addx,minDim*0.3125+q*addy]);
            outLayerAry[2].draw();
            outLayerAry[3].draw();
          }
        };

      buttonObjAry[i].on('tap mousedown', function(){
        this.call(line);
      });

      outLayerAry[3].add(buttonObjAry[i]);
      i += 1;
    }

    return 5;
  }
);
/////////////////////////////////////////////////////////////////////////////
//Sdlie 28
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;

    var pointa, pointb, pointc, linea, lineb,
        splineq, control;

    function setPoints(a,b,c){
      return [{ x: a.getX(), y: a.getY() },
              { x: b.getX(), y: b.getY() },
              { x: c.getX(), y: c.getY() }];
    }

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Drawing a curve",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(createBullet(width/8, height/4,fontSize));
    outLayerAry[1].add(drawText(
      width/8, height/4, "One point is a point", fontSize, fontFamily));

    outLayerAry[2].add(createBullet(width/8, height/4+2*fontSize,fontSize));
    outLayerAry[2].add(drawText(
      width/8, height/4+2*fontSize, "Two points make a line (y=x)", fontSize, fontFamily));

    outLayerAry[3].add(createBullet(width/8, height/4+4*fontSize,fontSize));
    outLayerAry[3].add(drawText(
      width/8, height/4+4*fontSize, "Three points can make a quadratic curve (y=x^2)", fontSize, fontFamily));

    outLayerAry[4].add(drawText(
      width/8, height/4+5*fontSize, "The points must not all be collinear", fontSize, fontFamily));


    pointa = new Kinetic.Circle({
      x: width*1/3,
      y: height*2/3,
      radius: minDim/50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 5,
      draggable:true
    });
    pointb = new Kinetic.Circle({
      x: width*1/2,
      y: height*3/4,
      radius: minDim/50,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 5,
      draggable:true
    });
    pointc = new Kinetic.Circle({
      x: width*2/3,
      y: height*2/3,
      radius: minDim/50,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 5,
      draggable:true
    });
    control = new Kinetic.Circle({
      x: (pointa.getX()+2*pointb.getX()+pointc.getX())/4,
      y: (pointa.getY()+2*pointb.getY()+pointc.getY())/4,
      radius: minDim/50,
      fill: 'purple',
      stroke: 'black',
      strokeWidth: 5,
      draggable:true
    });
    linea = new Kinetic.Line({
      points: [pointa.getX(),pointa.getY(),
               pointb.getX(),pointb.getY()],
      stroke: 'black',
      strokeWidth: 3
    });
    lineb = new Kinetic.Line({
      points: [pointb.getX(),pointb.getY(),
               pointc.getX(),pointc.getY()],
      stroke: 'black',
      strokeWidth: 3
    });
    splineq = new Kinetic.Spline({
      points: [{ x: pointa.getX(), y: pointa.getY() },
              { x: control.getX(), y: control.getY() },
              { x: pointc.getX(), y: pointc.getY() }],
      stroke: 'green',
      strokeWidth: 10,
      lineCap: 'round',
      tension: 0.5
    });

    outLayerAry[2].add(linea);

    outLayerAry[3].add(lineb);
    outLayerAry[3].add(splineq);

    outLayerAry[1].add(pointa);
    outLayerAry[2].add(pointb);
    outLayerAry[3].add(pointc);

    //Refresh onclick
    //Updates only when successfully dragged
    pointa.on("mouseon touchmove dragmove" , function(){
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(),pointa.getY(),
                       pointb.getX(),pointb.getY()]);
      lineb.setPoints([pointb.getX(),pointb.getY(),
                       pointc.getX(),pointc.getY()]);
      splineq.setPoints(setPoints(pointa,control,pointc));
      outLayerAry[1].draw();
      outLayerAry[2].draw();
      outLayerAry[3].draw();
    });

    pointb.on("mouseon dragmove" , function(){
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(),pointa.getY(),
                       pointb.getX(),pointb.getY()]);
      lineb.setPoints([pointb.getX(),pointb.getY(),
                       pointc.getX(),pointc.getY()]);
      splineq.setPoints(setPoints(pointa,control,pointc));
      outLayerAry[1].draw();
      outLayerAry[2].draw();
      outLayerAry[3].draw();
    });

    pointc.on("mouseon dragmove" , function(){
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(),pointa.getY(),
                       pointb.getX(),pointb.getY()]);
      lineb.setPoints([pointb.getX(),pointb.getY(),
                       pointc.getX(),pointc.getY()]);
      splineq.setPoints(setPoints(pointa,control,pointc));
      outLayerAry[1].draw();
      outLayerAry[2].draw();
      outLayerAry[3].draw();
    });

    return 5;
  }
);
/////////////////////////////////////////////////////////////////////////////
//Slide 29
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var createBullet = supportFunc.createBullet;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Bezier Curve Math, B(t)",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(createBullet(width/6, height/4, fontSize));
    outLayerAry[1].add(drawText(
      width/6, height/4, "Given points x1, x2... xn",
      fontSize+5, fontFamily));

    outLayerAry[2].add(createBullet(width/6, height/4+2*fontSize, fontSize));
    outLayerAry[2].add(drawText(
      width/6, height/4+2*fontSize, "First Term:",
      fontSize+5, fontFamily));

    outLayerAry[2].add(drawText(
      width/6, height/4+3*fontSize, "(1-t)^n*t^0*(X1)",
      fontSize, fontFamily));

   outLayerAry[3].add(createBullet(width/6, height/4+5*fontSize, fontSize));
   outLayerAry[3].add(createBullet(width/6, height/4+5*fontSize, fontSize));
      outLayerAry[3].add(drawText(
      width/6, height/4+5*fontSize, "Kth Term:",
      fontSize+5, fontFamily));

    outLayerAry[3].add(drawText(
      width/6, height/4+6*fontSize, "[(1-t)^(n-k)*t^k]*(n C k)*(Xk)",
      fontSize, fontFamily));

   outLayerAry[4].add(createBullet(width/6, height/4+8*fontSize, fontSize));
   outLayerAry[4].add(createBullet(width/6, height/4+8*fontSize, fontSize));
      outLayerAry[4].add(drawText(
      width/6, height/4+8*fontSize, "Line from (a,b) to (c,d)",
      fontSize+5, fontFamily));

    outLayerAry[4].add(drawText(
      width/6, height/4+9*fontSize, "X(t) = (1-t)*a + t*c",
      fontSize, fontFamily));

    outLayerAry[4].add(drawText(
      width/6, height/4+10*fontSize, "Y(t) = (1-t)*b + t*d",
      fontSize, fontFamily));


    outLayerAry[5].add(createBullet(width/6, height/4+12*fontSize, fontSize));
    outLayerAry[5].add(createBullet(width/6, height/4+12*fontSize, fontSize));
      outLayerAry[5].add(drawText(
      width/6, height/4+12*fontSize, "Curve from (a,b) to (c,d) to (e,f)",
      fontSize+5, fontFamily));

    outLayerAry[5].add(drawText(
      width/6, height/4+13*fontSize, "X(t) = (1-t)^2*a + 2*(1-t)*t*c + t^2*e",
      fontSize, fontFamily));

    outLayerAry[5].add(drawText(
      width/6, height/4+14*fontSize, "Y(t) = (1-t)^2*b + 2*(1-t)*t*d + t^2*f",
      fontSize, fontFamily));


    outLayerAry[6].add(createBullet(width/6, height/4+16*fontSize, fontSize));
    outLayerAry[6].add(createBullet(width/6, height/4+16*fontSize, fontSize));
      outLayerAry[6].add(drawText(
      width/6, height/4+16*fontSize, "0 ≤ t ≤ 1",
      fontSize+5, fontFamily));


    return 7;
  }
);
/////////////////////////////////////////////////////////////////////////////
//Slide 30
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;

    var pointa, pointb, pointc, linea, lineb, linec, shifta, shiftb, shiftc,
        splineq, start, control;

    var maxTime = 10000;

    var inAnim = false;

    function setPoints(a,b,c){
      return [{ x: a.getX(), y: a.getY() },
              { x: b.getX(), y: b.getY() },
              { x: c.getX(), y: c.getY() }];
    }

    //Refresh always (may lag system)
    /*
    (new Kinetic.Animation(function(frame){
      if(!inAnim){
        shifta.setX(pointa.getX());
        shifta.setY(pointa.getY());
        shiftb.setX(pointb.getX());
        shiftb.setY(pointb.getY());
        shiftc.setX(pointa.getX());
        shiftc.setY(pointa.getY());
        linec.setPoints([shifta.getX(),shifta.getY(),
                         shiftb.getX(),shiftb.getY()]);
      }
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(),pointa.getY(),
                       pointb.getX(),pointb.getY()]);
      lineb.setPoints([pointb.getX(),pointb.getY(),
                       pointc.getX(),pointc.getY()]);
      splineq.setPoints(setPoints(pointa,control,pointc));
      outLayerAry[1].draw();
    }, outLayerAry[1])).start();
    */

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Bezier Curve Example",
      fontSize+20, fontFamily)));


    pointa = new Kinetic.Circle({
      x: width/4,
      y: height/4,
      radius: minDim/50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 5,
      draggable:true
    });
    pointb = new Kinetic.Circle({
      x: width/3,
      y: height/3,
      radius: minDim/50,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 5,
      draggable:true
    });
    pointc = new Kinetic.Circle({
      x: width/2,
      y: height/2,
      radius: minDim/50,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 5,
      draggable:true
    });
    control = new Kinetic.Circle({
      x: (pointa.getX()+2*pointb.getX()+pointc.getX())/4,
      y: (pointa.getY()+2*pointb.getY()+pointc.getY())/4,
      radius: minDim/50,
      fill: 'purple',
      stroke: 'black',
      strokeWidth: 5,
      draggable:true
    });

    start = new Kinetic.Circle({
      x: width/1.5,
      y: height/1.5,
      radius: minDim/25,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable:true
    });

    shifta = new Kinetic.Circle({
      x: -20,
      y: -20,
      radius: minDim/75,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 4
    });

    shiftb = new Kinetic.Circle({
      x: -20,
      y: -20,
      radius: minDim/75,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 4
    });
    shiftc = new Kinetic.Circle({
      x: -20,
      y: -20,
      radius: minDim/75,
      fill: 'orange',
      stroke: 'black',
      strokeWidth: 4
    });

    linec = new Kinetic.Line({
      points: [-20,-40,
               -40,-20],
      stroke: 'grey',
      strokeWidth: 10
    });

    splineq = new Kinetic.Spline({
      points: [{ x:-20, y:-20 }],
      stroke: 'green',
      strokeWidth: 10,
      lineCap: 'round',
      tension: 0.5
    });

    outLayerAry[1].add(linea = new Kinetic.Line({
      points: [pointa.getX(),pointa.getY(),
               pointb.getX(),pointb.getY()],
      stroke: 'black',
      strokeWidth: 3
    }));
    outLayerAry[1].add(lineb = new Kinetic.Line({
      points: [pointb.getX(),pointb.getY(),
               pointc.getX(),pointc.getY()],
      stroke: 'black',
      strokeWidth: 3
    }));


    //Refresh onclick
    //Updates only when the piece is dragged successfully
    pointa.on("mouseon dragmove" , function(){
      if(!inAnim){
        shifta.setX(pointa.getX());
        shifta.setY(pointa.getY());
        shiftb.setX(pointb.getX());
        shiftb.setY(pointb.getY());
        shiftc.setX(pointa.getX());
        shiftc.setY(pointa.getY());
        linec.setPoints([shifta.getX(),shifta.getY(),
                         shiftb.getX(),shiftb.getY()]);
      }
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(),pointa.getY(),
                       pointb.getX(),pointb.getY()]);
      lineb.setPoints([pointb.getX(),pointb.getY(),
                       pointc.getX(),pointc.getY()]);
      splineq.setPoints(setPoints(pointa,control,pointc));
      outLayerAry[1].draw();
    });

    pointb.on("mouseon dragmove" , function(){
      if(!inAnim){
        shifta.setX(pointa.getX());
        shifta.setY(pointa.getY());
        shiftb.setX(pointb.getX());
        shiftb.setY(pointb.getY());
        shiftc.setX(pointa.getX());
        shiftc.setY(pointa.getY());
        linec.setPoints([shifta.getX(),shifta.getY(),
                         shiftb.getX(),shiftb.getY()]);
      }
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(),pointa.getY(),
                       pointb.getX(),pointb.getY()]);
      lineb.setPoints([pointb.getX(),pointb.getY(),
                       pointc.getX(),pointc.getY()]);
      splineq.setPoints(setPoints(pointa,control,pointc));
      outLayerAry[1].draw();
    });

    pointc.on("mouseon dragmove" , function(){
      if(!inAnim){
        shifta.setX(pointa.getX());
        shifta.setY(pointa.getY());
        shiftb.setX(pointb.getX());
        shiftb.setY(pointb.getY());
        shiftc.setX(pointa.getX());
        shiftc.setY(pointa.getY());
        linec.setPoints([shifta.getX(),shifta.getY(),
                         shiftb.getX(),shiftb.getY()]);
      }
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(),pointa.getY(),
                       pointb.getX(),pointb.getY()]);
      lineb.setPoints([pointb.getX(),pointb.getY(),
                       pointc.getX(),pointc.getY()]);
      splineq.setPoints(setPoints(pointa,control,pointc));
      outLayerAry[1].draw();
    });

    control.on("mouseon dragmove" , function(){
      splineq.setPoints(setPoints(pointa,control,pointc));
      outLayerAry[1].draw();
    });

    outLayerAry[1].add(linec);
    outLayerAry[1].add(shifta);
    outLayerAry[1].add(shiftb);
    outLayerAry[1].add(shiftc);
    outLayerAry[1].add(splineq);
    outLayerAry[1].add(control);

    outLayerAry[1].add(pointa);
    outLayerAry[1].add(pointb);
    outLayerAry[1].add(pointc);
    outLayerAry[1].add(start);

    start.on('mousedown dragstart', function(){
      var t;
      if(!inAnim){
        inAnim = true;
        (new Kinetic.Animation(function(frame){
          t = frame.time/maxTime;
          control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
          control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
          linea.setPoints([pointa.getX(),pointa.getY(),
                           pointb.getX(),pointb.getY()]);
          lineb.setPoints([pointb.getX(),pointb.getY(),
                           pointc.getX(),pointc.getY()]);
          shifta.setX((1-t)*pointa.getX()+t*pointb.getX());
          shifta.setY((1-t)*pointa.getY()+t*pointb.getY());
          shiftb.setX((1-t)*pointb.getX()+t*pointc.getX());
          shiftb.setY((1-t)*pointb.getY()+t*pointc.getY());
          linec.setPoints([shifta.getX(),shifta.getY(),
                           shiftb.getX(),shiftb.getY()]);
          shiftc.setX((1-t)*shifta.getX()+t*shiftb.getX());
          shiftc.setY((1-t)*shifta.getY()+t*shiftb.getY());
          splineq.setPoints(setPoints(pointa,control,pointc));
          if(frame.time >= maxTime){
            this.stop();
            frame.time = 0;
            linea.setPoints([pointa.getX(),pointa.getY(),
                            pointb.getX(),pointb.getY()]);
            lineb.setPoints([pointb.getX(),pointb.getY(),
                            pointc.getX(),pointc.getY()]);
            control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
            control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
            shifta.setX(pointb.getX());
            shifta.setY(pointb.getY());
            shiftb.setX(pointc.getX());
            shiftb.setY(pointc.getY());
            shiftc.setX(pointc.getX());
            shiftc.setY(pointc.getY());
            linec.setPoints([shifta.getX(),shifta.getY(),
                             shiftb.getX(),shiftb.getY()]);
            splineq.setPoints(setPoints(pointa,control,pointc));
            inAnim = false;
          }
        }, outLayerAry[1])).start();
      }
    });

    outLayerAry[2].add(center(drawText(
      width/2, outlineShift + 0.1*height, "Drag the red, yellow, blue points",
      fontSize+10, fontFamily)));


    outLayerAry[3].add(center(drawText(
      width/2, outlineShift + 0.15*height,
      "Click the green point to start the anim", fontSize, fontFamily)));

    return 4;
  }
);
//////////////////////////////////////////////////////////////////////////////
//Slide END
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "End of Presentation",
      fontSize+20, fontFamily)));

    outLayerAry[1].add(align(drawText(
      width/2, height/2, "Questions?",
      fontSize+20, fontFamily)));


    return 2;
  }
);
