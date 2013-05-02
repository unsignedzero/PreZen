/* Test generator objects that will be updated accordingly and
 * integrated into PreZen. Once integrated we will update the slides
 *
 * For this codeset to work we assume that externFont and height are
 * well defined in PreZen.js
 */

function drawTextGenerator( input ){

  // This function sets above textPosGenerator and acts as a front
  // that generators text objects for KineticJS that can be drawn
  //
  // Data type and checks are done in the constructor of the respective
  // generator objects

  var textPosObj, fontSize, fontFamily, temp, tempTextObj;

  textPosObj = textPosGenerator( input );

  fontSize = ( typeof input.fontSize === "number" ) ? fontSize : height/32;
  fontFamily = ( typeof input.fontFamily === "number" ) ?
    fontFamily : externFont;

   temp = { fontSize: fontSize, fontFamily : externFont,
       fill: 'black',
       text: str };

   return { 
     Text : function (str, type){

       // General text function that will set the text as main or sub
       // depending on type

       tempTextObj = type ? textPosObj.subtext() : textPosObj.maintext();

       temp.x = tempTextObj.x;
       temp.y = tempTextObj.y;
       return DrawText2(temp);
     },

     mainText : function (str){

       // Text function sets text as mainText

       tempTextObj = textPosObj.maintext();

       temp.x = tempTextObj.x;
       temp.y = tempTextObj.y;
       return DrawText2(temp);
     },

     subText : function (str){

       // Text function sets text as subText

       tempTextObj = textPosObj.subtext();

       temp.x = tempTextObj.x;
       temp.y = tempTextObj.y;
       return DrawText2(temp);
     }
   };
}

function bulletTextPosGenerator( input ){

  // This function combines textPosGenerator with bullets
  // giving users more options
  //
  // Data type and checks are done in the constructor of the respective
  // generator objects

  var layer, curObj, retObj, textPosObj = textPosGenerator(input);

  if ( typeof input.deltaFontSize === "number" )
    input.deltaFontSize = 0;

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

     input.x = curObj.x;
     input.y = curObj.y;
     input.str = str;

     layer.add(createBullet2(input));
     layer.add(drawText2(input));
   },

   bulSubText : function (layer, str){

     // Text function sets text as subText
     curObj = textPosObj.subText();

     input.x = curObj.x;
     input.y = curObj.y;
     input.str = input.str;

     //layer.add(createBullet2(input));
     layer.add(drawText2(input));
   }

 };

 //We make all methods of the textPosGenerator publicly accessibe
 for ( var curMethod in textPosObj ) {
   if ( textPosObj.hasOwnProperty(curMethod) ){
     if ( typeof curMethod === "function" )
      retObj[curMethod.name] = curMethod;
    }
  }
 
 return retObj;
}

function createBullet2( input ){

  // Object facade version of createBullet

  var x, y, fontSize;

  x  = ( typeof input.x === "number" ) ? input.x : 0;
  y  = ( typeof input.y === "number" ) ? input.y : 0;

  fontSize = ( typeof input.fontSize === "number" ) ? fontSize : input.height/32;

  return input.createBullet(x, y, fontSize);

}

function drawHeader( layer, input , str){

  // Object facade that creates the header (non-existent in original)
  layer.add(input.center(input.drawText(
    input.width/2, input.outlineShift + 0.05*input.height, str,
    input.fontSize+20, input.fontFamily)));
}

function generatorStateObject(settingsObj, supportFunc){

  // Assembles a generic state object that will be used in the generators

  return {
      // We set the default fluff settings
      fontSize: settingsObj.fontSize, fontFamily: settingsObj.fontFamily,
      width: settingsObj.width, height: settingsObj.height,
      outlineShift: settingsObj.outlineShift,

      // We load our functions here
      drawText: supportFunc.drawText, createBullet: supportFunc.createBullet,
      center: supportFunc.center,

      // If we want the fonts to be bigger than the bullets set this
      deltaFontSize: 5

    };
}

function drawText2( input ){

  // Object facade version of drawText

  var x, y, fontSize, fontFamily, str;

  x  = ( typeof input.x === "number" ) ? input.x : 0;
  y  = ( typeof input.y === "number" ) ? input.y : 0;

  fontSize = ( typeof input.fontSize === "number" ) ? input.fontSize : input.height/32;
  fontSize += ( typeof input.deltaFontSize === "number" ) ? input.deltaFontSize : 0;
  fontFamily = ( typeof input.fontFamily === "string" ) ? input.fontFamily : externFont;

  str = ( typeof input.str === "string" ) ? input.str : "";

  return input.drawText(x, y, str, fontSize, fontFamily);
}

function textPosGenerator( input ){

  // This function creates a generator object that will allow users
  // to specify the spacing between bullet points (maintext)
  // and substrings between lines of a bullet point (subtext)

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
}

/*
//Test code for textPosGenerator
var a = textPosGenerator( {maintextx:100, maintexty:100, 
    subtextx:50, subtexty:50 } );
alert((a.maintext()).x);
alert(a.maintext().x);
alert(a.subtext().y);
*/

function imgPosGenerator( input ){

  // This function creates a generator object that will allow users
  // to create images on the fly and hides the ugly image editing details

  var imgAry = [], imgAryCur = -1;

  return {
    pushImage : function(path){

      // Adds the image to the array but creates the index as well

      imgAry.push(new Image());
      imgAryCur += 1;
      imgAry[imgAryCur].src = path;
      imgAry[imgAryCur].onload = function () {};

      // Here we set the index publicly so that any external call can
      // call and access the element, without accessing the internal
      // variables
      this[imgAryCur] = imgAry[imgAryCur];

      return imgAry[imgAryCur];
    },

    curImage : function(){

      // Allows users to access the "last" element in the array

      return imgAryCur !== -1 ? imgAry[imgAryCur] : undefined;
    }

  };
}

