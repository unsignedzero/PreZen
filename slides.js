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
    var circle, temp;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift+radius, 'The Art of Drawing a Circle',
      fontSize+2, fontFamily
      )));

    circle = new Kinetic.Wedge({
      x: width/2,
      y: height/2 - radius/2,

      radius: radius,

      stroke: 'black',
      strokeWidth: 3,
      angleDeg: 270,
    });

    (new Kinetic.Animation(function(frame){
      circle.setAngleDeg(360*frame.time/animTime);
      if (frame.time >= animTime){
        this.stop();
        frame.time=0;
        circle.setAngleDeg(360);
      }
    },outLayerAry[0])).start();

    outLayerAry[0].add(circle);

    outLayerAry[1].add(center(drawText(
      width/2, height*(3/4), 'Created by David Tran',
      fontSize+2, fontFamily
    )));

    return 2;
  }
);

//////////////////////////////////////////////////////////////////////////////
//Slide 1
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
      width/2, outlineShift + 0.05*height, 'Mathmatic Model',
      fontSize+20, fontFamily 
    )));

    outLayerAry[1].add( new Kinetic.Wedge({
      x: width/4,
      y: height/2 - radius/2 + fontSize,

      radius: radius,
      angleDeg: 360,

      stroke: 'black',
      strokeWidth: 3,
    }));

    outLayerAry[1].add(center(drawText(
      width/4,height/2 - radius/2,'x^2 + y^2 = r^2',
      fontSize, fontFamily 
    )));
    outLayerAry[2].add(center(drawText(
      width*3/4, height*1/3, 'Implications',
      fontSize+10, fontFamily 
    )));
    outLayerAry[3].add(center(drawText(
      width*3/4, height*1/3 + 2*fontSize, 'Negative Radius',
      fontSize, fontFamily 
    )));

    outLayerAry[4].add(center(drawText(
      width*3/4, height*1/3 + 4*fontSize, 'Perfect World Model',
      fontSize, fontFamily 
    )));

    return 5;
  }
);

//////////////////////////////////////////////////////////////////////////////
//Slide 2
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    //Creates the demo
    var drawPixelCircle = supportFunc.drawPixelCircle;

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;
    var align    = supportFunc.align;
    var drawText = supportFunc.drawText;

    var radius = height*0.2;
    var side = 50;

    var squareSide = width/16;
    var boardWidth = width/4;

    var buttonObjAry = [{},{}];

    var i, x, y, max, sizeCount, temp;

    sizeCount = 3;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Pixel Model",
      fontSize+20, fontFamily  
    )));

    outLayerAry[2].add(center(drawText(
      width*(2/3), height*(1/4), "Representation",
      fontSize+10, fontFamily 
    )));
    outLayerAry[2].add(center(drawText(
      width*(2/3), height*(1/4)+2*fontSize, "2d array of cell",
      fontSize+5, fontFamily
    )));
    outLayerAry[2].add(center(drawText(
      width*(2/3), height*(1/4)+3*fontSize, "Color is just a number",
      fontSize+5, fontFamily
    )));
    outLayerAry[2].add(center(drawText(
      width*(2/3), height*(1/4)+4*fontSize,"R:255,G:255,B:255",
      fontSize+5, fontFamily
    )));

    i = -1;
    max = 2;
    //Create the interactive buttons for the demo
    while( i++ < max ){
      x = width/4 + (i&1?-width/16:width/16);
      y = height*(2/3);

      outLayerAry[2].add(align(drawText(
        x, y, i&1 ? '<' : '>', fontSize+20, fontFamily
      )));

      buttonObjAry[i] = new Kinetic.Rect({
        x: x,
        y: y,
        width: squareSide,
        height: squareSide,
        offset: [squareSide/2,squareSide/2],

        stroke: 'black',
        strokeWidth: 5,
        cornerRadius: 10,
      });

      if ( i&1 )
        buttonObjAry[i].call = function(sizeCurCount){
        if ( sizeCurCount > 2 )
          drawPixelCircle(outLayerAry[1], width/4-(boardWidth/2),
            height/6, width/4, --sizeCount
          );
        };
      else
        buttonObjAry[i].call = function(sizeCurCount){
        if ( sizeCurCount < 40 )
          drawPixelCircle(outLayerAry[1], width/4-(boardWidth/2),
            height/6, width/4, ++sizeCount
          );
        };

      buttonObjAry[i].on('tap mousedown', function(){
        this.call(sizeCount);
      });

      outLayerAry[2].add(buttonObjAry[i]);
    }

    //Draws the initial demo
    drawPixelCircle( outLayerAry[1], width/4-(boardWidth/2),
      height/6, width/4, sizeCount
    );

    outLayerAry[3].add(center(drawText(
      width*(2/3), height*(1/3)+5*fontSize, "Problems",
      fontSize+5, fontFamily
    )));
    outLayerAry[3].add(center(drawText(
      width*(2/3), height*(1/3)+7*fontSize,
      "Blocky given smaller amount of pixels", fontSize, fontFamily
    )));
    outLayerAry[4].add(center(drawText(
      width*(2/3), height*(1/3)+8*fontSize, "Can be blurry if scaled",
      fontSize, fontFamily
    )));

    temp = center(new Kinetic.Rect({
      x: width/4,
      y: height*(3/4),
      width: squareSide,
      height: squareSide,
      stroke: 'black',

      strokeWidth: 5,
      cornerRadius: 10,
    }));

    temp.on('tap mousedown', function(){
      drawPixelCircle(outLayerAry[1], width/4-(boardWidth/2),
        height/6, width/4, sizeCount, true);
    });

    outLayerAry[5].add(temp);

    i = -1;
    max = 4;
    
    //Draws the second set of squares, bottom
    while( ++i < max ){
      outLayerAry[5].add(new Kinetic.Rect({
        x: width*(2/3) -  ( i&1 ? squareSide : 0 ) + (squareSide),
        y: height*(4/5) - ( i&2 ? squareSide : 0 ) + (squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5,
      }));
    }

    outLayerAry[5].add(new Kinetic.Rect({
      x: width*(2/3) + (squareSide>>1),
      y: height*(4/5) + (squareSide>>1),
      width: squareSide*(5/4),
      height: squareSide*(5/4),
      offset: [squareSide*(9/8),squareSide*(9/8)],
      stroke: 'black',
      fill: 'black',
      strokeWidth: 5,
    }));

    outLayerAry[5].add(new Kinetic.Rect({
      x: width*(2/3) + (squareSide*(3/2*9/8)),
      y: height*(4/5) + (squareSide>>1),
      width: squareSide*(5/4),
      height: squareSide*(5/4),
      offset: [squareSide*(9/8),squareSide*(9/8)],
      stroke: 'black',
      fill: 'grey',
      strokeWidth: 5,
    }));

    return 6;
  }
);

//////////////////////////////////////////////////////////////////////////////
//Slide 3
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;

    var squareSide = width/16;
    var boardWidth = width/4;

    var i, x, y, max, sizeCount, fill;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Pixel Model (cont'd)",
      fontSize+20, fontFamily
    )));
    outLayerAry[1].add(center(drawText(
      width*2/3, height*1/3, "Advantage", fontSize+10, fontFamily
    )));
    outLayerAry[2].add(center(drawText(
      width*2/3, height*1/3+2*fontSize, "Uniform", fontSize+5, fontFamily
    )));

    i = -1;
    max = 2;
    sizeCount = 4;
    max = sizeCount*sizeCount;
    //Draws first demo board
    while( ++i < max ){
      outLayerAry[2].add(new Kinetic.Rect({
        x: width/4 +( boardWidth/2) - Math.floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5,
      }));
    }

    outLayerAry[3].add(center(drawText(
      width*2/3, height*1/3+4*fontSize, "Easy to represent",
      fontSize+5, fontFamily
    )));

    i = -1;
    sizeCount = 3;
    max = sizeCount*sizeCount;
    //Draws second demo board
    while( ++i < max ){
      outLayerAry[3].add(new Kinetic.Rect({
        x: width/4 +( boardWidth/2) - Math.floor(i/sizeCount)*squareSide,
        y: height*(2/3) + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5,
        fill: i%2 ? 'white': 'black',
      }));
    }

    outLayerAry[3].add(center(drawText(
      width*2/3, height*1/3+4*fontSize, "Easy to represent",
      fontSize+5, fontFamily
    )));

    outLayerAry[4].add(center(drawText(
      width*2/3, height*1/3+6*fontSize, "Easy to compress",
      fontSize+5, fontFamily
    )));

    i = -1;
    sizeCount = 4;
    max = sizeCount*sizeCount;
    //Draws third demo board
    while( ++i < max ){
      fill = 'grey';
      if (i == 0||i == 3||i == 12||i == 15)
        fill = 'black';
      outLayerAry[4].add(new Kinetic.Rect({
        x: width/4 +( boardWidth/2) - Math.floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5,
        fill: fill,
      }));
    }

    i = -1;
    sizeCount = 3;
    max = sizeCount*sizeCount;
    while( ++i < max ){
      outLayerAry[4].add(new Kinetic.Rect({
        x: width/4 +( boardWidth/2) - Math.floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide*(3/2),squareSide/2],
        stroke: 'black',
        strokeWidth: 5,
        fill: i%2 ? 'white': 'black',
      }));
    }

    return 5;
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

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;

    var squareSide = width/16;
    var boardWidth = width/4;

    var i, x, y, max, sizeCount;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Vector Model",
      fontSize+20, fontFamily
    )));

    x = width/4;
    y = height/4;

    outLayerAry[1].add(new Kinetic.Line({
      points: [x,y+50,x+50,y,x+35,y,x+50,y,x+50,y+15,x+50,y],
      stroke: 'blue',
      strokeWidth: 10,
      lineCap: 'round',
      lineJoin: 'round',
    }));

    outLayerAry[1].add(center(drawText(
      width*(2/3), height*(1/4), "Representation",
      fontSize+10, fontFamily
    )));
    outLayerAry[1].add(center(drawText(
      width*(2/3), height*(1/4)+2*fontSize, "Magnitude and Direction",
      fontSize+5, fontFamily
    )));

    x = width/4 - 20;
    y = height/4;
    outLayerAry[2].add(new Kinetic.Line({
      points: [x,y+50,x+50,y,x+35,y,x+50,y,x+50,y+15,x+50,y],
      stroke: 'blue',
      strokeWidth: 10,
      lineCap: 'round',
      lineJoin: 'round',
    }));

    x = width/4 - 20;
    y = height/4 + 20;
    outLayerAry[2].add(new Kinetic.Line({
      points: [x,y+100,x+100,y,x+85,y,x+100,y,x+100,y+15,x+100,y],
      stroke: 'blue',
      strokeWidth: 10,
      lineCap: 'round',
      lineJoin: 'round',
    }));

    outLayerAry[2].add(center(drawText(
      width*(2/3), height*(1/4)+3*fontSize, "Stored as a tuple ",
      fontSize+5, fontFamily
    )));
    outLayerAry[2].add(center(drawText(
      width*(2/3), height*(1/4)+4*fontSize, "<50,50>",
      fontSize+5, fontFamily
    )));
    outLayerAry[3].add(center(drawText(
      width*(2/3), height*(1/3)+5*fontSize, "Problems",
      fontSize+5, fontFamily)));
    outLayerAry[3].add(center(drawText(
      width*(2/3), height*(1/3)+7*fontSize, "No specific \"start\" point",
      fontSize+5, fontFamily
    )));

    i = -1;
    sizeCount = 4;
    max = sizeCount*sizeCount;
    //Draws demo board
    while( ++i < max ){
      outLayerAry[4].add(new Kinetic.Rect({
        x: width/4 +( boardWidth/2) - Math.floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        strokeWidth: 5,
      }));
    }

    outLayerAry[4].add(center(drawText(
      width*(2/3), height*(1/3)+8*fontSize, "How do you draw vectors?",
      fontSize+5, fontFamily
    )));
    
    i = -1;
    while( ++i < max ){
      outLayerAry[5].add(new Kinetic.Rect({
        x: width/4 +( boardWidth/2) - Math.floor(i/sizeCount)*squareSide,
        y: height/4 + ((i%sizeCount)*squareSide),
        width: squareSide,
        height: squareSide,
        offset: [squareSide,squareSide],
        stroke: 'black',
        fill: (i==5||i==6)? 'blue' : 'white',
        strokeWidth: 5,
      }));
    }
    
    outLayerAry[5].add(center(drawText(
      width*(2/3), height*(1/3)+9*fontSize, "Not simple to render to draw",
      fontSize+5, fontFamily
    )));

    return 6;
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

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Vector Model (cont'd)",
      fontSize+20, fontFamily
    )));
    outLayerAry[1].add(center(drawText(
      width*2/3, height*1/3, "Advantage", fontSize+10, fontFamily
    )));
    outLayerAry[2].add(new Kinetic.Spline({
      points: [{ x:width/4, y:height/4 },
               { x:width/3, y:height/2 },
               { x:width/2, y:height/2 },
               { x:width/2, y:height/3 },
               { x:width/4, y:height/4 }],
      stroke: 'blue',
      strokeWidth: 10,
      lineCap: 'round',
      tension: 1
    }));

    outLayerAry[2].add(center(drawText(
      width*2/3, height*1/3+2*fontSize, "Mathematically represent curves",
      fontSize+5, fontFamily
    )));

    return 3;
  }
);

//////////////////////////////////////////////////////////////////////////////
//Slide 6
externDrawFunctionArray.push(
  function(outLayerAry, width, height, settingsObj, supportFunc){

    supportFunc.clean(outLayerAry,settingsObj);

    var fontSize = settingsObj.fontSize;
    var fontFamily = settingsObj.fontFamily;
    var outlineShift = settingsObj.outlineShift;

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "END",
      fontSize+20, fontFamily
    )));

    return 1;
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

    var center   = supportFunc.center;
    var drawText = supportFunc.drawText;

    outLayerAry[0].add(center(drawText(
      width/2, outlineShift + 0.05*height, "Vector Model (cont'd)",
      fontSize+20, fontFamily
    )));

    return 1;
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
      fontSize+20, fontFamily
    )));
    outLayerAry[1].add(align(drawText(
      width/2, height/2, "End",
      fontSize+20, fontFamily
    )));

    return 2;
  }
);
