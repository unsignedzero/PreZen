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
 *
 * Created 03-02-2013
 * Updated 04-05-2013
 * Version 0.5.1.0
 * Created by David Tran (unsignedzero)
 */

PreZenSettings.supportFunc = {
  bezierExample : function(outLayerA, outLayerB, outLayerC, outLayerD, minDim,
    width, height, setObj){
    "use strict";

    var pointa, pointb, pointc, linea, lineb, linec, shifta, shiftb, shiftc,
        splineq, start, control, animObj,
        t,
        canDrag,
        maxTime = 10000,
        inAnim = false;

    //The !! converts the object/primitive into a boolean type
    canDrag = setObj.canDrag !== undefined ? (!!setObj.canDrag) : true;

    //Set up support functions and objects
    function setListPoints(a,b,c) {
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
        linec.setPoints([shifta.getX(),shifta.getY(),
                         shiftb.getX(),shiftb.getY()]);
      }
      control.setX((pointa.getX()+2*pointb.getX()+pointc.getX())/4);
      control.setY((pointa.getY()+2*pointb.getY()+pointc.getY())/4);
      linea.setPoints([pointa.getX(),pointa.getY(),
                       pointb.getX(),pointb.getY()]);
      lineb.setPoints([pointb.getX(),pointb.getY(),
                       pointc.getX(),pointc.getY()]);
      splineq.setPoints(setListPoints(pointa,control,pointc));
      outLayerA.draw();
    };

    animObj = new Kinetic.Animation(function(frame) {
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
      splineq.setPoints(setListPoints(pointa,control,pointc));
      if (frame.time >= maxTime) {
        animObj.stop();
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
        splineq.setPoints(setListPoints(pointa,control,pointc));
        inAnim = false;
      }
    }, outLayerA);

    //Refresh always (may lag system)
    /*
    (new Kinetic.Animation(function(frame) {
      if (!inAnim) {
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
      splineq.setPoints(setListPoints(pointa,control,pointc));
      outLayerA.draw();
    }, outLayerA)).start();
    */

    //Define all elements on the screen
    pointa = new Kinetic.Circle({
      x: setObj.pointax !== undefined ? setObj.pointax : width/4,
      y: setObj.pointay !== undefined ? setObj.pointay : height/4,
      radius: minDim/50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 5,
      draggable: canDrag
    });
    pointb = new Kinetic.Circle({
      x: setObj.pointbx !== undefined ? setObj.pointbx : width/3,
      y: setObj.pointby !== undefined ? setObj.pointby : height/3,
      radius: minDim/50,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 5,
      draggable: canDrag
    });
    pointc = new Kinetic.Circle({
      x: setObj.pointcx !== undefined ? setObj.pointcx : width/2,
      y: setObj.pointcy !== undefined ? setObj.pointcy : height/2,
      radius: minDim/50,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 5,
      draggable: canDrag
    });
    control = new Kinetic.Circle({
      x: (pointa.getX()+2*pointb.getX()+pointc.getX())/4,
      y: (pointa.getY()+2*pointb.getY()+pointc.getY())/4,
      radius: minDim/50,
      fill: 'purple',
      stroke: 'black',
      strokeWidth: 5,
      draggable: canDrag
    });
    start = new Kinetic.Circle({
      x: setObj.startx !== undefined ? setObj.startx : width/1.5,
      y: setObj.starty !== undefined ? setObj.starty : height/1.5,
      radius: minDim/25,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable: canDrag
    });

    //Meta Points seen only during the animation
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

    //Resultant curve (spline) drawn
    splineq = new Kinetic.Spline({
      points: setListPoints(pointa,control,pointc),
      stroke: 'green',
      strokeWidth: 10,
      lineCap: 'round',
      tension: 0.5
    });

    //Meta bezier curve
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

    //Refresh onclick
    //Updates when piece is dragged or moved
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
        splineq.setPoints(setListPoints(pointa,control,pointc));
        outLayerA.draw();
      });

      start.on('mousedown dragstart', function() {
        if (!inAnim) {
          inAnim = true;
          animObj.start();
        }
      });
    }

    //Add all elements to layer

    outLayerB.add(linea);
    outLayerC.add(lineb);
    outLayerC.add(linec);
    outLayerC.add(splineq);

    //Control points need to be visible
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

    //Reference circle for demo
    if (size > 3)
      LocalLayer.add(new Kinetic.Circle({
        x: width + (side/2) - 1,
        y: height + (side/2) - 1,
        radius: side/2,
        stroke: 'red',
        strokeWidth: 5
      }));
    LocalLayer.draw();
  }
};

