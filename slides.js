/* PreZen Slides
 *
 * Contained in this file is a working coded slide that I used in my
 * presentation. This is by no means the only way to use PreZen.
 * This is currently being updated and the code to create content
 * is being placed in slideSupport while the code to place content
 * will be located here.
 *
 *
 * Created 01-25-2013
 * Updated 04-15-2013
 * Version 0.6.0.0 Beta 3
 * Created by David Tran (unsignedzero)
 */

//WARNING: We might remove indent which will increase GIT line count changed!

//////////////////////////////////////////////////////////////////////////////
//Add Slides Output
//Slide 0 (Cover Slide)
PreZenSettings.externDrawFunctionArray = [
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    supportFunc.clean(outLayerAry,settingsObj);
    "use strict";

    var animTime = settingsObj.animTime;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;

    var radius = height*0.3;
    var circle;

    var state = supportFunc.generatorStateObject(settingsObj, supportFunc),
        textGen;

    state.fontSize -= 3;
    state.curx = width/2;
    state.cury = outlineShift + radius;

    state.maintexty = height * (3/4) - (outlineShift + radius);

    textGen = supportFunc.drawTextGenerator(state);

    outLayerAry[0].add(center(textGen.mainText(
      "What can you see in a display?")));
    outLayerAry[1].add(center(textGen.mainText(
      "Created by David Tran")));

    circle = new Kinetic.Wedge({
      x: width/2,
      y: height/2 - radius/2,

      radius: radius,

      stroke: 'black',
      strokeWidth: 3,
      angleDeg: 270
    });

    var ptr = new Kinetic.Animation(function(frame) {
      circle.setAngleDeg(360*frame.time/animTime);
      circle.setRotationDeg(90*frame.time/animTime);
      if (frame.time >= animTime) {
        ptr.stop();
        frame.time=0;
        circle.setAngleDeg(360);
        circle.setRotationDeg(90);
      }
    },outLayerAry[0]);
    ptr.start();

    outLayerAry[0].add(circle);

    return 2;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Test ZONE
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//TOC Slide
//Slide 1
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry, settingsObj);

    var bulDrawObj,
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    state.curx = width/6;
    state.cury = height/4;

    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "Overview");

    bulDrawObj.bulMainText(outLayerAry[1], "Displays and Color Gamut");
    bulDrawObj.bulMainText(outLayerAry[2], "CRT");
    bulDrawObj.bulMainText(outLayerAry[3], "Plasma");
    bulDrawObj.bulMainText(outLayerAry[4], "CRT");
    bulDrawObj.bulMainText(outLayerAry[5], "OLED");
    bulDrawObj.bulMainText(outLayerAry[6], "AMOLED");
    bulDrawObj.bulMainText(outLayerAry[7], "Table of technology comparison");
    bulDrawObj.bulMainText(outLayerAry[8], "Application: Drawing Circles");

    return 9;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Part 1 Intro
//////////////////////////////////////////////////////////////////////////////
//Slide 2
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    // This is an example of using the new textGenerator
    supportFunc.clean(outLayerAry,settingsObj);

    // Here we store our state object, which will be passed once and sets up
    // the generator
    var bulDrawObj,
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    // Sets the default start position of the text list
    state.curx = width/2;
    state.cury = height/4;

    // We set the mainy shift to be a value
    // Options include mainx, subx and suby.
    // See supportFunc.generatorStateObject for default values
    state.maintexty = 4*settingsObj.fontSize;

    // Create generator object
    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "Displays");

    bulDrawObj.bulMainText(outLayerAry[1], "Collection of Light Sources");
    bulDrawObj.bulMainText(outLayerAry[3], "Easier way to display");
    bulDrawObj.bulSubText(outLayerAry[3], "information to the user");

    //Creates state object that will be used for drawCircleArray
    var stateArray = {
      x: width/4,
      y: height/4,
      sizeCount: 4,
      boardWidth: width/4
    };

    //Draws first demo board
    supportFunc.drawCircleArray(stateArray, outLayerAry[2], (function(i){
      return i&2 ? (i&1 ? 'blue' : 'red') : (i&1 ? 'green' : 'white');
    }));

    //Draws second demo board
    supportFunc.drawCircleArray(stateArray, outLayerAry[4], (function(i){
      return (i<5||i===8) ? 'black' : 'white';
    }));

    return 5;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 3
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var bulDrawObj, imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    state.curx = width/2;
    state.cury = height/4;

    state.maintexty = 6*settingsObj.fontSize;
    state.subtexty = settingsObj.fontSize;

    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "Color Gamut");

    bulDrawObj.bulMainText(outLayerAry[1], "What colors can be displayed?");
    bulDrawObj.bulMainText(outLayerAry[2], "What can be seen in");
    bulDrawObj.bulSubText(outLayerAry[2],  "a print out?");
    bulDrawObj.bulMainText(outLayerAry[3], "Does it look good?");

    imgDrawObj.pushImage2('IMG/ColorGamutXref.jpg', 2, 2, supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[1], width/4, height/4);

    return 4;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Part 2 CRT
//////////////////////////////////////////////////////////////////////////////
//Slide 4
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.drawHeader(outLayerAry[0], state, "CRT");
    supportFunc.drawSubHeader(outLayerAry[1], state, "Cathode Ray Tube");

    imgDrawObj.pushImage2( 'IMG/crt-monitor.jpg', 1.5, 1.5, supportFunc.align);
    imgDrawObj.drawImage(outLayerAry[1], width/2, height/2+height/20);

    return 2;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 5
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var bulDrawObj, imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.setNumberedListState(state, settingsObj);
    state.maintexty = 2*settingsObj.fontSize;

    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "CRT (How they work)");

    bulDrawObj.bulMainText(outLayerAry[1], "1. Electron Gun");
    bulDrawObj.bulSubText(outLayerAry[1], "Each color has a gun");

    imgDrawObj.pushImage2('IMG/750px-CRT_color_enhanced.png', 2, 2,
        supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[1], width/4, height/4);

    bulDrawObj.bulMainText(outLayerAry[2], "2. Electron Path");

    bulDrawObj.bulMainText(outLayerAry[3], "3/4. Electron Coils");
    bulDrawObj.bulSubText(outLayerAry[3], "There are two coils one for");
    bulDrawObj.bulSubText(outLayerAry[3], "horizontial and another for");
    bulDrawObj.bulSubText(outLayerAry[3], "vertical");

    bulDrawObj.bulMainText(outLayerAry[4], "5. Anode Connection");

    bulDrawObj.bulMainText(outLayerAry[5], "6. Color mask");
    bulDrawObj.bulSubText(outLayerAry[5], "Seperates the colors");

    bulDrawObj.bulMainText(outLayerAry[6], "7. Phosphor Layer");
    bulDrawObj.bulSubText(outLayerAry[6], "The sub-pixel that lights up");
    bulDrawObj.bulSubText(outLayerAry[6], "when stuck by an electron");

    imgDrawObj.pushImage2('IMG/600px-CRT_screen._closeup.jpg', 2, 2,
        supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[7], width/4, height/4);

    outLayerAry[7].add(supportFunc.align(supportFunc.drawText(
      width/4, height*(1/5), "8. Sample Mask Image",
      settingsObj.fontSize+5, settingsObj.fontFamily)));

    return 8;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 6
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry, settingsObj);

    var bulDrawObj, imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.setProConState(state, settingsObj);

    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "CRT (Pros/Cons)");

    bulDrawObj.bulMainText(outLayerAry[1], "-Pros-");
    bulDrawObj.bulSubText(outLayerAry[1], "No Input Lag");
    bulDrawObj.bulSubText(outLayerAry[2], "Flexible resolution/refresh rate");
    bulDrawObj.bulSubText(outLayerAry[3],
        "No color distortion and greater viewing angle");

    bulDrawObj.bulMainText(outLayerAry[4], "-Cons-");
    bulDrawObj.bulSubText(outLayerAry[4], "Larger size/heavier weight");
    bulDrawObj.bulSubText(outLayerAry[5], "More power used compared to an LCD");
    bulDrawObj.bulSubText(outLayerAry[6], "Affected by magnetic field");
    bulDrawObj.bulSubText(outLayerAry[7], "Recycling is a problem");

    return 8;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Part 3 Plasma
//////////////////////////////////////////////////////////////////////////////
//Slide 7
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.drawHeader(outLayerAry[0], state, "Plasma");

    imgDrawObj.pushImage2('IMG/Evolution_of_21st_century_plasma_displays.jpg', 2.25, 1.5, supportFunc.align);
    imgDrawObj.drawImage(outLayerAry[1], width/2, height/2+height/20);

    return 2;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 8
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var bulDrawObj, imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.setNumberedListState(state, settingsObj);

    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "Plasma (How they work)");

    imgDrawObj.pushImage2('IMG/Plasma-display-composition.svg.png', 2, 2,
        supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[1], width/4, height/4);

    bulDrawObj.bulMainText(outLayerAry[1], "1. Address Electrode");
    bulDrawObj.bulSubText(outLayerAry[1], "Turns on the right pixel");

    bulDrawObj.bulMainText(outLayerAry[2], "2. Plasma Cells");
    bulDrawObj.bulSubText(outLayerAry[2], "Mercury is excited");
    bulDrawObj.bulSubText(outLayerAry[3], "Electrons excite noble gases");
    bulDrawObj.bulSubText(outLayerAry[4], "Phosporous lights up");

    bulDrawObj.bulMainText(outLayerAry[5], "3. Front Plate Glass");
    bulDrawObj.bulSubText(outLayerAry[5], "Light is shown on the display");

    return 6;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 9
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var bulDrawObj, imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.setProConState(state, settingsObj);

    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "Plasma (Pros/Cons)");

    bulDrawObj.bulMainText(outLayerAry[1], "-Pros-");
    bulDrawObj.bulSubText(outLayerAry[1], "Better Contrast Ratio");
    bulDrawObj.bulSubText(outLayerAry[2], "Lower Motion Blur");

    bulDrawObj.bulMainText(outLayerAry[3], "-Cons-");
    bulDrawObj.bulSubText(outLayerAry[3], "Uses more power on average than LCD");
    bulDrawObj.bulSubText(outLayerAry[4], "Can't be used above 2km");
    bulDrawObj.bulSubText(outLayerAry[5], "Can't use AM radio, radio frequency interference");

    return 6;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Part 4 LCD
//////////////////////////////////////////////////////////////////////////////
//Slide 10
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.drawHeader(outLayerAry[0], state, "LCD");
    supportFunc.drawSubHeader(outLayerAry[1], state, "Cathode Ray Tube");

    imgDrawObj.pushImage2('IMG/45567-lg-55lh40-55-lcd-tv1.jpg', 1.5, 1.5, supportFunc.align);
    imgDrawObj.drawImage(outLayerAry[1], width/2, height/2+height/20);

    return 2;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 11
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var bulDrawObj, imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.setNumberedListState(state, settingsObj);
    state.maintexty = 2*settingsObj.fontSize;

    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "LCD (How they work)");

    bulDrawObj.bulMainText(outLayerAry[1], "1. Polarizing Filter");
    bulDrawObj.bulSubText(outLayerAry[1], "Forces only light in one direction");

    imgDrawObj.pushImage2('IMG/800px-LCD_layers.svg.png', 2, 2,
        supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[1], width/4, height/4);

    bulDrawObj.bulMainText(outLayerAry[2], "2. LCD cutout");
    bulDrawObj.bulSubText(outLayerAry[2], "Cut the screen into shapes");

    bulDrawObj.bulMainText(outLayerAry[3], "3. Liquid Crystals");
    bulDrawObj.bulSubText(outLayerAry[3], "Bends to reflect light");

    bulDrawObj.bulMainText(outLayerAry[4], "4. Electrodes");
    bulDrawObj.bulSubText(outLayerAry[4], "Power the crystal to bend them");
    bulDrawObj.bulSubText(outLayerAry[4], "Light will pass but be cancelled");

    bulDrawObj.bulMainText(outLayerAry[5], "5. Polar Lens");
    bulDrawObj.bulSubText(outLayerAry[5], "Cancels any remaining light");

    imgDrawObj.pushImage2('IMG/800px-LCDneg.jpg', 2.33, 3,
        supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[6], width/4, height/4);

    outLayerAry[6].add(supportFunc.align(supportFunc.drawText(
      width/4, height*(1/5), "LCD with polar lens on top",
      settingsObj.fontSize+5, settingsObj.fontFamily)));

    return 7;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 12
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var bulDrawObj,
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    state.curx = width/6;
    state.cury = height/4;
    
    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "LCD (Backlight Technology)");

    bulDrawObj.bulMainText(outLayerAry[1], "CCFL - Cold Cathode Fluorescent Lamps");
    bulDrawObj.bulSubText(outLayerAry[1], "Diffuser and two polarizers to distribute the light");

    bulDrawObj.bulMainText(outLayerAry[2], "EL-WLED - Edge Lined - White LED");
    bulDrawObj.bulSubText(outLayerAry[2], "Diffuses white light across the back of LC array");

    bulDrawObj.bulMainText(outLayerAry[3], "WLED - White LED");
    bulDrawObj.bulSubText(outLayerAry[3], "Can be dimmed in certain spots to allow ");
    bulDrawObj.bulSubText(outLayerAry[3], "darker blacks and similarly brighter whites");

    bulDrawObj.bulMainText(outLayerAry[4], "RGB-LED - Red Green Blue - LED");
    bulDrawObj.bulSubText(outLayerAry[4], "CCFL-like color gamut but power efficient");

    return 5;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 13
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var bulDrawObj, imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    state.curx = width/2;
    state.cury = height/4;

    state.maintexty = 5*settingsObj.fontSize;

    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "LCD (Active Matrix)");

    supportFunc.drawSubHeader(outLayerAry[1], state, "TFT - Thin Film Transistor");

    bulDrawObj.bulMainText(outLayerAry[2], "TN - Twisted Nematic");
    bulDrawObj.bulSubText(outLayerAry[3], "Initially limited to shades of grey");
    bulDrawObj.bulSubText(outLayerAry[4], "Used early on in calculators");

    bulDrawObj.bulMainText(outLayerAry[5], "IPS - In-plane Switching");
    bulDrawObj.bulSubText(outLayerAry[6], "Power plane parallel the crystal.");
    bulDrawObj.bulSubText(outLayerAry[7], "Faster response");
    bulDrawObj.bulSubText(outLayerAry[7], "better angles");

    imgDrawObj.pushImage2('IMG/TN_Twisted.png', 2.5, 2,
        supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[2], width/4, height/4);
    imgDrawObj.pushImage2('IMG/TN_UnTwisted.png', 2.5, 2,
        supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[3], width/4, height/4);

    imgDrawObj.pushImage2('IMG/IPS_ON.png', 2.5, 2,
        supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[5], width/4, height/4);
    imgDrawObj.pushImage2('IMG/IPS_Off.png', 2.5, 2,
        supportFunc.center);
    imgDrawObj.drawImage(outLayerAry[6], width/4, height/4);

    return 8;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 14
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.drawHeader(outLayerAry[0], state, "LCD (Matrix and Backlight)");

    imgDrawObj.pushImage2('IMG/active-matrix.jpg', 1.125, 1.5,
        supportFunc.align);
    imgDrawObj.drawImage(outLayerAry[1], width/2, height/2+height/20);

    return 2;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 15
  function(outLayerAry, width, height, settingsObj, supportFunc) {
    "use strict";

    supportFunc.clean(outLayerAry,settingsObj);

    var bulDrawObj, imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.setProConState(state, settingsObj);

    bulDrawObj = supportFunc.bulletTextPosGenerator(state);

    supportFunc.drawHeader(outLayerAry[0], state, "LCD (Pros/Cons)");

    bulDrawObj.bulMainText(outLayerAry[1], "-Pros-");
    bulDrawObj.bulSubText(outLayerAry[1], "Compact and lighter");
    bulDrawObj.bulSubText(outLayerAry[2], "Lower power consumption");
    bulDrawObj.bulSubText(outLayerAry[3], "Any shape");

    bulDrawObj.bulMainText(outLayerAry[4], "-Cons-");
    bulDrawObj.bulSubText(outLayerAry[4], "Limited viewing angle");
    bulDrawObj.bulSubText(outLayerAry[5], "One native resolution");
    bulDrawObj.bulSubText(outLayerAry[6], "Dead/stuck pixel");
    bulDrawObj.bulSubText(outLayerAry[7], "Not good in sunlight");

    return 8;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 16
  function(outLayerAry, width, height, settingsObj, supportFunc) {

    supportFunc.clean(outLayerAry,settingsObj);

    var imgDrawObj = supportFunc.imgPosGenerator(settingsObj.minDim),
      state = supportFunc.generatorStateObject(settingsObj, supportFunc);

    supportFunc.drawHeader(outLayerAry[0], state, "LCD Viewing Angle and Response Time");

    outLayerAry[1].add(supportFunc.center(supportFunc.drawText(
      width/2, settingsObj.outlineShift + 0.9*height, 
      "MVA - Multi-Domain Vertical Alignment",
      settingsObj.fontSize+10, settingsObj.fontFamily)));

    imgDrawObj.pushImage2('IMG/image65.gif', 1.25, 1.5,
        supportFunc.align);
    imgDrawObj.drawImage(outLayerAry[1], width/2, height/2+height/20);
    imgDrawObj.pushImage2('IMG/image66.gif', 1.25, 1.5,
        supportFunc.align);
    imgDrawObj.drawImage(outLayerAry[2], width/2, height/2+height/20);

    return 3;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Part 5 OLED
//////////////////////////////////////////////////////////////////////////////
//Slide 17
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
    imgAry[imgAryCur].onload = function() {
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
,
//////////////////////////////////////////////////////////////////////////////
//Slide 18
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
    imgAry[imgAryCur].onload = function() {
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
    imgAry[imgAryCur].onload = function() {
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
,
//////////////////////////////////////////////////////////////////////////////
//Slide 19
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
      width/6, height/4+15*fontSize, "High Cost. $8,000",
      fontSize+5, fontFamily));

    outLayerAry[6].add(createBullet(width/6, height/4+17*fontSize, fontSize));
    outLayerAry[6].add(drawText(
      width/6, height/4+17*fontSize, "In Development Land",
      fontSize+5, fontFamily));

    return 7;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Part 6 AMOLED
//////////////////////////////////////////////////////////////////////////////
//Slide 20
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
    imgAry[imgAryCur].onload = function() {
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
,
//////////////////////////////////////////////////////////////////////////////
//Slide 21
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
    imgAry[imgAryCur].onload = function() {
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
    imgAry[imgAryCur].onload = function() {
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
,
//////////////////////////////////////////////////////////////////////////////
//Slide 22
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
,
//////////////////////////////////////////////////////////////////////////////
//Slide 23
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
    imgAry[imgAryCur].onload = function() {
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
      "2160p - (QFHD) 3840x2160",
      fontSize+10, fontFamily)));

    outLayerAry[2].add(center(drawText(
      width/2, outlineShift + 0.25*height,
      "WQXGA - Wide Quad Extended GA 2500x1600", 
      fontSize+10, fontFamily)));

    imgAry.push(new Image());
    imgAryCur += 1;
    imgAry[imgAryCur].src = 'IMG/Vector_Video_Standards2.svg.png';
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
,
//////////////////////////////////////////////////////////////////////////////
//Part 7 Drawing
//////////////////////////////////////////////////////////////////////////////
//Slide 24
  function(outLayerAry, width, height, settingsObj, supportFunc) {
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

    (function (){
      var ptr = new Kinetic.Animation(function(frame) {
        circlea.setAngleDeg(360*frame.time/animTime);
        circleb.setAngleDeg(360*frame.time/animTime);
        if (frame.time >= animTime) {
          ptr.stop();
          frame.time=0;
          circlea.setAngleDeg(360);
          circleb.setAngleDeg(360);
        }
      },outLayerAry[0]);
      ptr.start();
    })();

    outLayerAry[0].add(circlea);
    outLayerAry[0].add(circleb);

    outLayerAry[1].add(center(drawText(
      width/2, outlineShift+radius*1.8, "Drawing Circles",
      fontSize+2, fontFamily)));


    return 2;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 25
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
,
//////////////////////////////////////////////////////////////////////////////
//Slide 26
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
    while(i < max) {
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

      if (i&1)
        buttonObjAry[i].call = function(sizeCurCount) {
        if (sizeCurCount > 2) {
          sizeCount -= 1;
          drawPixelCircle(outLayerAry[1], supportFunc,  width/4-(boardWidth/2),
            height/6, minDim/3, sizeCount);
          }
        };
      else
        buttonObjAry[i].call = function(sizeCurCount) {
        if (sizeCurCount < 40) {
          sizeCount += 1;
          drawPixelCircle(outLayerAry[1], supportFunc, width/4-(boardWidth/2),
            height/6, minDim/3, sizeCount);
          }
        };

      buttonObjAry[i].on('tap mousedown', function() {
        this.call(sizeCount);
      });

      outLayerAry[2].add(buttonObjAry[i]);
      i += 1;
    }

    //Draws the initial demo
    drawPixelCircle(outLayerAry[1], supportFunc, width/4-(boardWidth/2),
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

    temp.on('tap mousedown', function() {
      drawPixelCircle(outLayerAry[1], supportFunc, width/4-(boardWidth/2),
        height/6, minDim/3, sizeCount, true);
    });

    outLayerAry[6].add(temp);

    i = 0;
    max = 4;

    //Draws the second set of squares, bottom
    while(i < max) {
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
,
//////////////////////////////////////////////////////////////////////////////
//Slide 27
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
    while(i < max) {
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
    while(i < max) {
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
    while(i < max) {
      fill = 'grey';
      if (i === 0||i === 3||i === 12||i === 15)
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
    while(i < max) {
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
,
//////////////////////////////////////////////////////////////////////////////
//Slide 28
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
    while(i < max) {
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
    while(i < max) {
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
,
//////////////////////////////////////////////////////////////////////////////
//Slide 29
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
    while(i < max) {
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

      if (i&1)
        buttonObjAry[i].call = function(line) {
          var q;
          if ((q = line.getStrokeWidth()) > 2) {
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
        buttonObjAry[i].call = function(line) {
          var q;
          if ((q = line.getStrokeWidth()) < 40) {
            q +=2;
            line.setStrokeWidth(q);
            //shape.setStrokeWidth(q);
            line.setPoints([minDim*0.3125-left+q*addx,minDim*0.4375-q*addy,
                            minDim*0.4375-left-q*addx,minDim*0.3125+q*addy]);
            outLayerAry[2].draw();
            outLayerAry[3].draw();
          }
        };

      buttonObjAry[i].on('tap mousedown', function() {
        this.call(line);
      });

      outLayerAry[3].add(buttonObjAry[i]);
      i += 1;
    }

    return 5;
  }
,
/////////////////////////////////////////////////////////////////////////////
//Slide 30
  function(outLayerAry, width, height, settingsObj, supportFunc) {

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;

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

    supportFunc.bezierExample( outLayerAry[1], outLayerAry[2],
        outLayerAry[3], outLayerAry[4], minDim, width, height,
        { pointax: width*1/3,
          pointay: height*2/3,
          pointbx: width*1/2,
          pointby: height*3/4,
          pointcx: width*2/3,
          pointcy: height*2/3,
          canDrag: false
        }
      );

    return 5;
  }
,
/////////////////////////////////////////////////////////////////////////////
//Slide 31
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
,
/////////////////////////////////////////////////////////////////////////////
//Slide 32
  function(outLayerAry, width, height, settingsObj, supportFunc) {

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;
    var minDim = settingsObj.minDim;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;
    var createBullet = supportFunc.createBullet;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Bezier Curve Example",
      fontSize+20, fontFamily)));

    supportFunc.bezierExample(outLayerAry[1], outLayerAry[1],
        outLayerAry[1], outLayerAry[1], minDim, width, height,
        { showAnim: true
        }
    );

    outLayerAry[2].add(center(drawText(
      width/2, outlineShift + 0.1*height, "Drag the red, yellow, blue points",
      fontSize+10, fontFamily)));

    outLayerAry[3].add(center(drawText(
      width/2, outlineShift + 0.15*height,
      "Click the green point to start the anim", fontSize, fontFamily)));

    return 4;
  }
,
//////////////////////////////////////////////////////////////////////////////
//Slide 33 (end slide)
  function(outLayerAry, width, height, settingsObj, supportFunc) {

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
];

