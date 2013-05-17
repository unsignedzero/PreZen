/* PreZen slide support
 *
 * This support allows one to separate code that places and create content
 * from code that generates code/logic. All functions created here
 * are seen in all slides as supportFunc.<function name>.
 *
 * Certain function names or defined in PreZen and will override any functions
 * with the same name defined here. This list will eventually be commented
 * and enumerated here
 *
 * Created 03-02-2013
 * Updated 05-17-2013
 * Version 0.6.0.0 Tango
 * Created by David Tran (unsignedzero)
 */

/* The code to draw a grid and the code to draw the buttons are not factored out.
 *
 * Drawing a grid - Many arguments need to be passed and a function for settings the
 * x and one for setting a y needs to be used repeatedly. Not efficient.
 *
 * Drawing interactive buttons - Lots of parameters required used only a few times. Can
 * be cached but requires updating when resizing canvas. Not worthwhile.
 */

PreZenSettings.supportFunc = {
  bezierExample : function(outLayerA, outLayerB, outLayerC, outLayerD, minDim,
    width, height, setObj){
    "use strict";

    var pointa, pointb, pointc, linea, lineb, linec, shifta, shiftb, shiftc,
        splineq, start, control, animObj, t, canDrag, circleObj, lineObj,
        maxTime = 10000,
        inAnim = false;

    // The !! converts the object/primitive into a boolean type
    canDrag = setObj.canDrag !== undefined ? (!!setObj.canDrag) : true;

    // Set up support functions and objects
    function setListPoints(a, b, c) {
      return [{ x: a.getX(), y: a.getY() },
              { x: b.getX(), y: b.getY() },
              { x: c.getX(), y: c.getY() }];
    }

    var onDragUpdate = function(){
      if (!inAnim) {
        shifta.setX(pointa.getX());
        shifta.setY(pointa.getY());
        shiftb.setX(pointb.getX());
        shiftb.setY(pointb.getY());
        shiftc.setX(pointa.getX());
        shiftc.setY(pointa.getY());
        linec.setPoints([shifta.getX(), shifta.getY(),
                         shiftb.getX(), shiftb.getY()]);
      }
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(), pointa.getY(),
                       pointb.getX(), pointb.getY()]);
      lineb.setPoints([pointb.getX(), pointb.getY(),
                       pointc.getX(), pointc.getY()]);
      splineq.setPoints(setListPoints(pointa, control, pointc));
      outLayerA.draw();
    };

    animObj = new Kinetic.Animation(function(frame){
      t = frame.time/maxTime;
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(), pointa.getY(),
                       pointb.getX(), pointb.getY()]);
      lineb.setPoints([pointb.getX(), pointb.getY(),
                       pointc.getX(), pointc.getY()]);
      shifta.setX((1-t)*pointa.getX()+t*pointb.getX());
      shifta.setY((1-t)*pointa.getY()+t*pointb.getY());
      shiftb.setX((1-t)*pointb.getX()+t*pointc.getX());
      shiftb.setY((1-t)*pointb.getY()+t*pointc.getY());
      linec.setPoints([shifta.getX(), shifta.getY(),
                       shiftb.getX(), shiftb.getY()]);
      shiftc.setX((1-t)*shifta.getX()+t*shiftb.getX());
      shiftc.setY((1-t)*shifta.getY()+t*shiftb.getY());
      splineq.setPoints(setListPoints(pointa, control, pointc));
      if (frame.time >= maxTime) {
        animObj.stop();
        frame.time = 0;
        linea.setPoints([pointa.getX(), pointa.getY(),
                        pointb.getX(), pointb.getY()]);
        lineb.setPoints([pointb.getX(), pointb.getY(),
                        pointc.getX(), pointc.getY()]);
        control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
        control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
        shifta.setX(pointb.getX());
        shifta.setY(pointb.getY());
        shiftb.setX(pointc.getX());
        shiftb.setY(pointc.getY());
        shiftc.setX(pointc.getX());
        shiftc.setY(pointc.getY());
        linec.setPoints([shifta.getX(), shifta.getY(),
                         shiftb.getX(), shiftb.getY()]);
        splineq.setPoints(setListPoints(pointa, control, pointc));
        inAnim = false;
      }
    }, outLayerA);

    circleObj = {
      x: setObj.pointax !== undefined ? setObj.pointax : width/4,
      y: setObj.pointay !== undefined ? setObj.pointay : height/4,
      radius: minDim/50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 5,
      draggable: canDrag
    } ;

    // Define all elements on the screen
    pointa = new Kinetic.Circle(circleObj);

    circleObj.x = setObj.pointbx !== undefined ? setObj.pointbx : width/3;
    circleObj.y = setObj.pointby !== undefined ? setObj.pointby : height/3;
    circleObj.fill = 'yellow';
    pointb = new Kinetic.Circle(circleObj);

    circleObj.x = setObj.pointcx !== undefined ? setObj.pointcx : width/2;
    circleObj.y = setObj.pointcy !== undefined ? setObj.pointcy : height/2;
    circleObj.fill = 'blue';
    pointc = new Kinetic.Circle(circleObj);

    circleObj.x = (pointa.getX()+2*pointb.getX()+pointc.getX())/4;
    circleObj.y = (pointa.getY()+2*pointb.getY()+pointc.getY())/4;
    circleObj.fill = 'purple';
    control = new Kinetic.Circle(circleObj);

    circleObj.x = setObj.startx !== undefined ? setObj.startx : width/1.5;
    circleObj.y = setObj.starty !== undefined ? setObj.starty : height/1.5;
    circleObj.fill = 'green';
    circleObj.radius = minDim/25;
    start = new Kinetic.Circle(circleObj);

    // Meta Points seen only during the animation
    circleObj.x = circleObj.y = -20;
    circleObj.fill = 'black';
    circleObj.strokeWidth = 4;
    circleObj.radius = minDim/75;
    circleObj.draggable = false;
    shifta = new Kinetic.Circle(circleObj);
    shiftb = new Kinetic.Circle(circleObj);

    circleObj.fill = 'orange';
    shiftc = new Kinetic.Circle(circleObj);

    // Resultant curve (spline) drawn
    splineq = new Kinetic.Spline({
      points: setListPoints(pointa, control, pointc),
      stroke: 'green',
      strokeWidth: 10,
      lineCap: 'round',
      tension: 0.5
    });

    // Meta bezier curve
    lineObj = {
      points: [pointa.getX(), pointa.getY(),
               pointb.getX(), pointb.getY()],
      stroke: 'black',
      strokeWidth: 3
    };
    linea = new Kinetic.Line(lineObj);

    lineObj.points = [pointb.getX(), pointb.getY(),
                      pointc.getX(), pointc.getY()];
    lineb = new Kinetic.Line(lineObj);

    lineObj.points = [-20, -40, -40, -20];
    lineObj.stroke = 'grey';
    lineObj.strokeWidth = 10;
    linec = new Kinetic.Line(lineObj);

    // Refresh onclick
    // Updates when piece is dragged or moved
    if (canDrag) {
      pointa.on("mouseon dragmove" , function() {
        onDragUpdate();
      });
      pointb.on("mouseon dragmove" , function() {
        onDragUpdate();
      });
      pointc.on("mouseon dragmove" , function() {
        onDragUpdate();
      });

      control.on("mouseon dragmove" , function() {
        splineq.setPoints(setListPoints(pointa, control, pointc));
        outLayerA.draw();
      });

      start.on('mousedown dragstart', function() {
        if (!inAnim) {
          inAnim = true;
          animObj.start();
        }
      });
    }

    // Add all elements to layer
    outLayerB.add(linea);
    outLayerC.add(lineb);
    outLayerC.add(linec);
    outLayerC.add(splineq);

    // Control points need to be visible
    if (setObj.showAnim !== undefined && setObj.showAnim ){
      outLayerD.add(shifta);
      outLayerD.add(shiftb);
      outLayerD.add(start);
      outLayerD.add(shiftc);
      outLayerD.add(control);
    }

    outLayerA.add(pointa);
    outLayerB.add(pointb);
    outLayerC.add(pointc);
  },

  drawPixelCircle : function (LocalLayer, supportFunc,
      width, height, side, size, alt) {
    "use strict";
    var floor = supportFunc.floor;
    var sqrt  = supportFunc.sqrt;
    var abs   = supportFunc.abs;

    var rad = size&1 ? (size>>1)-1 : size>>1;
    var sub = size&1 ? (size>>1) : (size>>1) - 0.5;

    var x, y, i, max, del, fill, tempval, stroke;

    LocalLayer.removeChildren();
    max = size * size;

    i = 0;
    del = side/size;

    stroke = size > 2 ? 'black' : 'grey';

    while(i < max) {
      x = floor(i / size);
      y = i % size;
      tempval = abs(sqrt((x-sub)*(x-sub) + (y-sub)*(y-sub))-rad);
      fill = tempval <= 0.5 ? 'black' : 'white';
      if (alt && tempval <= 1.0 && tempval >= 0.5)
        fill = 'grey';

      LocalLayer.add(new Kinetic.Rect({
        x: width  + del * x,
        y: height + del * y,

        width:  del,
        height: del,

        fill: fill,
        stroke: stroke,
        strokeWidth: 3
      }));
      i += 1;
    }

    // Reference circle for demo
    if (size > 3)
      LocalLayer.add(new Kinetic.Circle({
        x: width + (side/2) - 1,
        y: height + (side/2) - 1,
        radius: side/2,
        stroke: 'red',
        strokeWidth: 5
      }));
    LocalLayer.draw();
  },

  drawCircleArray : function(state, layer, colorfunc){
    var i, max, x, y, boardWidth, squareSide, sizeCount;

      x = typeof state.x === "number" ? state.x : 0;
      y = typeof state.y === "number" ? state.y : 0;
      sizeCount = typeof state.sizeCount === "number" ? state.sizeCount : 0;

      if ( typeof state.boardWidth === "number" ){
        boardWidth = state.boardWidth;
      }
      else{
        boardWidth = 0;
        alert( "".join(["drawCircleArray was passed ",
          state.boardWidth,
          " as boardWidth which is not a number"
          ]));
      }

      squareSide = boardWidth/sizeCount;

    if ( typeof colorfunc !== "function" ){
      colorfunc = function(i){
        return "black";
      };
    }

    i = 0;
    max = sizeCount*sizeCount;

    while(i < max) {
      layer.add(new Kinetic.Circle({
        x: x + (boardWidth/2) - Math.floor(i/sizeCount)*squareSide,
        y: y + ((i%sizeCount)*squareSide),
        radius: squareSide/2,
        fill: colorfunc(i),
        stroke: 'black',
        strokeWidth: 5
      }));
      i += 1;
    }
  },

  drawCaptionText : function(layer, input, str){
    // Object facade that creates the subheader (non-existent in original)
    "use strict";

    layer.add(input.align(input.drawText(
      input.width/4, input.height/5, str,
      input.fontSize+5, input.fontFamily)));
  },

  defaultSquareSettings : function(squareSide){
    return {width: squareSide,
            height: squareSide,
            offset: [squareSide, squareSide],
            stroke: 'black',
            strokeWidth: 5 };
  },

  pixelCircleDemo : function(outLayerAry, width, height, settingsObj, supportFunc){
    "use strict";

    // Creates the demo
    var drawPixelCircle = supportFunc.drawPixelCircle,
      fontSize = settingsObj.fontSize,
      fontFamily = settingsObj.fontFamily,
      outlineShift = settingsObj.outlineShift,
      minDim = settingsObj.minDim,

      center   = supportFunc.center,
      align    = supportFunc.align,
      drawText = supportFunc.drawText,

      radius = height*0.2,  side = 50, sizeCount = 3,
      squareSide = minDim/12, boardWidth = minDim/3,
      buttonObjAry = [{}, {}, {}],
      i, x, y, max, temp, squareObj;

    i = 0;
    max = 2;
    // Create the interactive buttons for the demo
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
        offset: [squareSide/2, squareSide/2],

        stroke: 'black',
        strokeWidth: 5,
        cornerRadius: 10
      });

      // Loads the function that should be called for the onclick event
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

      // Add the onclick event
      buttonObjAry[i].on('tap mousedown', function() {
        this.call(sizeCount);
      });

      outLayerAry[2].add(buttonObjAry[i]);
      i += 1;
    }

    // Adds on the last button
    buttonObjAry[2] = center(new Kinetic.Rect({
      x: width/4,
      y: height*(3/4),
      width: squareSide,
      height: squareSide,
      stroke: 'black',

      strokeWidth: 5,
      cornerRadius: 10
    }));

    buttonObjAry[2].on('tap mousedown', function() {
      drawPixelCircle(outLayerAry[1], supportFunc, width/4-(boardWidth/2),
        height/6, minDim/3, sizeCount, true);
    });

    outLayerAry[6].add(buttonObjAry[2]);

    // Draws the initial demo
    drawPixelCircle(outLayerAry[1], supportFunc, width/4-(boardWidth/2),
      height/6, minDim/3, sizeCount);

    squareObj = {
        width: squareSide,
        height: squareSide,
        offset: [squareSide, squareSide],
        stroke: 'black',
        strokeWidth: 5
    };

    i = 0;
    max = 4;
    // Draws the second set of squares, bottom
    while(i < max) {
      squareObj.x = width*(2/3) -  (i&1 ? squareSide : 0) + (squareSide);
      squareObj.y = height*(4/5) - (i&2 ? squareSide : 0) + (squareSide);
      outLayerAry[7].add(new Kinetic.Rect(squareObj));
      i += 1;
    }

    squareObj.x= width*(2/3) + (squareSide>>1);
    squareObj.y= height*(4/5) + (squareSide>>1);
    squareObj.width= squareSide*(5/4);
    squareObj.height= squareSide*(5/4);
    squareObj.offset= [squareSide*(9/8), squareSide*(9/8)];
    squareObj.fill= 'black';

    outLayerAry[7].add(new Kinetic.Rect(squareObj));

    squareObj.x = width*(2/3) + (squareSide*(3/2*9/8));
    squareObj.fill = "grey";

    outLayerAry[7].add(new Kinetic.Rect(squareObj));
  },

  slide27Canvas :  function(outLayerAry, width, height, settingsObj, supportFunc){
    "use strict";

    var floor = supportFunc.floor,
      squareSide = width/20,
      boardWidth = width/4,
      i, max, sizeCount, fill, squareObj, metaObj;

    squareObj = supportFunc.defaultSquareSettings(squareSide);

    i = 0;
    sizeCount = 4;
    max = sizeCount*sizeCount;
    // Draws first demo board
    while(i < max) {
      squareObj.x = width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide;
      squareObj.y = height/4 + ((i%sizeCount)*squareSide);
      outLayerAry[3].add(new Kinetic.Rect(squareObj));
      i += 1;
    }

    i = 0;
    sizeCount = 3;
    max = sizeCount*sizeCount;
    // Draws second demo board
    while(i < max) {
      squareObj.x = width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide;
      squareObj.y = height*(2/3) + ((i%sizeCount)*squareSide);
      squareObj.fill = i&1 ? 'white': 'black';
      outLayerAry[6].add(new Kinetic.Rect(squareObj));
      i += 1;
    }

    i = 0;
    sizeCount = 4;
    max = sizeCount*sizeCount;
    // Draws third demo board
    while(i < max) {
      squareObj.x = width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide;
      squareObj.y = height/4 + ((i%sizeCount)*squareSide);
      squareObj.fill = (i === 0||i === 3||i === 12||i === 15) ? 'black' : 'grey';
      outLayerAry[7].add(new Kinetic.Rect(squareObj));
      i += 1;
    }

    i = 0;
    sizeCount = 3;
    max = sizeCount*sizeCount;
    while(i < max) {
      squareObj.x = (width/4 + (boardWidth/2) -
        floor(i/sizeCount)*squareSide - squareSide/2);
      squareObj.y = height/4 + ((i%sizeCount)*squareSide + squareSide/2);
      squareObj.fill = i%2 ? 'white': 'black';
      outLayerAry[7].add(new Kinetic.Rect(squareObj));
      i += 1;
    }
  },

  slide28Canvas : function(outLayerAry, width, height, settingsObj, supportFunc){
    "use strict";

    var floor    = supportFunc.floor,
      squareSide = width/16,
      boardWidth = width/4,
      i, x, y, max, sizeCount, arrowObj, squareObj;

    function arrowPos(x, y, z){
      // JS does not have number points so these won't update on additional
      // calls. Nothing says we can't wrap it around a function and update
      // it that way
      z = typeof z === "undefined" ? 1 : z;
      return [x, y + (50*z), x + (50*z), y         , x + (35*z), y,
              x + (50*z), y, x + (50*z), y + (15*z), x + (50*z), y];
    }

    // As with generator codes, we create an object and change the differences
    // and repeat saving lines of code but also time as we don't generate
    // a new object
    x = width/4;
    y = height/4;

    arrowObj = {
      points: [x, y+50, x+50, y, x+35, y, x+50, y, x+50, y+15, x+50, y],
      stroke: 'red',
      strokeWidth: 10,
      lineCap: 'round',
      lineJoin: 'round'
    };

    outLayerAry[1].add(new Kinetic.Line(arrowObj));

    x = width/4 - 20;
    arrowObj.points = arrowPos(x, y, 1);
    arrowObj.stroke = 'blue';

    outLayerAry[2].add(new Kinetic.Line(arrowObj));

    y = height/4 + 20;
    arrowObj.points = arrowPos(x, y, 2);

    outLayerAry[2].add(new Kinetic.Line(arrowObj));

    squareObj = supportFunc.defaultSquareSettings(squareSide);

    i = 0;
    sizeCount = 4;
    max = sizeCount*sizeCount;

    // Draws demo board. As both boards are on the same spot, we can
    // draw them together with one loop
    while(i < max) {
      squareObj.x = width/4 +(boardWidth/2) - floor(i/sizeCount)*squareSide;
      squareObj.y = height/4 + ((i%sizeCount)*squareSide);
      squareObj.fill = undefined;
      outLayerAry[6].add(new Kinetic.Rect(squareObj));
      squareObj.fill = (i===5) ? 'red' : 'white';
      outLayerAry[7].add(new Kinetic.Rect(squareObj));
      i += 1;
    }
  },

  slide29Canvas : function(outLayerAry, width, height, settingsObj, supportFunc){
    "use strict";

    var fontSize = settingsObj.fontSize,
        fontFamily = settingsObj.fontFamily,
        outlineShift = settingsObj.outlineShift,
        minDim = settingsObj.minDim,

        center   = supportFunc.center,
        drawText = supportFunc.drawText,
        align = supportFunc.align,

        buttonObjAry = [{}, {}],
        squareSide = minDim/12,
        i, x, y, max, line, left, addx = 0.35, addy = 0.35, shape;

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

    left = minDim/6;
    outLayerAry[3].add(new Kinetic.Polygon({
      points: [minDim*0.375-left, minDim*0.250, minDim*0.500-left, minDim*0.375,
               minDim*0.375-left, minDim*0.500, minDim*0.250-left, minDim*0.375],
      fill: 'white',
      stroke: 'black',
      strikeWidth: 5
    }));

    outLayerAry[3].add(line = new Kinetic.Line({
      points: [minDim*0.3125-left+5*addx, minDim*0.4375-5*addy,
               minDim*0.4375-left-5*addx, minDim*0.3125+5*addy],
      stroke: 'blue',
      lineCap: 'square',
      strokeWidth: 10
    }));

    i = 0;
    max = 2;
    // Create the interactive buttons for the demo
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
        offset: [squareSide/2, squareSide/2],

        stroke: 'black',
        strokeWidth: 5,
        cornerRadius: 10
      });
      buttonObjAry[i].state = i;

      buttonObjAry[i].call = function(line) {
        var q, reDraw = false;
        if (this.state === 1 && (q = line.getStrokeWidth()) > 2) {
          q -=2;
          reDraw = true;
        }
        else if (this.state === 0 && (q = line.getStrokeWidth()) < 40) {
          q += 2;
          reDraw = true;
        }
        if (reDraw){
          line.setStrokeWidth(q);
          line.setPoints([minDim*0.3125-left+q*addx, minDim*0.4375-q*addy,
                          minDim*0.4375-left-q*addx, minDim*0.3125+q*addy]);
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
  }
};

