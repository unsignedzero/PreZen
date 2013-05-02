/* Test generator objects that will be updated accordingly and
 * integrated into PreZen. Once integrated we will update the slides
 */

function drawTextGenerator( input ){

  // This function sets above textPosGenerator and acts as a front
  // that generators text objects for KineticJS that acn be drawn

  var textPosObj, fontSize, fontFamily, temp, tempTextObj;

  textPosObj = textPosGenerator( input );

  // We will assume height (of the slides) and externFont 
  // ( in PreZenSettings.js ) are well defined 
  fontSize = ( typeof input.fontSize === "number" ) ? fontSize : height/32;
  fontFamily = ( typeof input.fontFamily === "number" ) ?
    fontFamily : externFont;

   return { 
     Text : function (str, type){

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

     mainText : function (str){

       // Text function sets text as mainText

       temp = { fontSize: fontSize, fontFamily : fontFamily,
           fill: 'black',
           text: str };

       tempTextObj = textPosObj.maintext();

       temp.x = tempTextObj.x;
       temp.y = tempTextObj.y;
       return temp;
     },

     subText : function (str){

       // Text function sets text as subText

       temp = { fontSize: fontSize, fontFamily : fontFamily,
           fill: 'black',
           text: str };

       tempTextObj = textPosObj.subtext();

       temp.x = tempTextObj.x;
       temp.y = tempTextObj.y;
       return temp;
     }
   };
}

function textPosGenerator( input ){

  // This function creates a generator object that will allow users
  // to specify the spacing between bullet points (maintext)
  // and substrings between lines of a bullet point (subtext)

  var curx, cury, maintextx, maintexty, subtextx, subtexty;

  // Check input
  curx = ( typeof input.curx === "number" ) ? curx : 0;
  cury = ( typeof input.cury === "number" ) ? cury : 0;

  if ( typeof input.maintextx === "number" )
    maintextx = input.maintextx;
  else
    throw new Error("input.maintextx in textPosGenerator not a number");
  if ( typeof input.maintexty === "number" )
    maintexty = input.maintexty;
  else
    throw new Error("input.maintexty in textPosGenerator not a number");

  if ( typeof input.subtextx === "number" )
    subtextx = input.subtextx;
  else
    throw new Error("input.subtextx in textPosGenerator not a number");
  if ( typeof input.subtexty === "number" )
    subtexty = input.subtexty;
  else
    throw new Error("input.subtexty in textPosGenerator not a number");

  return {
    maintext : function(){

      // Returns the new mainText coords

      curx += maintextx;
      cury += maintexty;

      return {
        x: curx,
        y: cury,
      };
    },
    subtext : function(){

      // Returns the new mainText coords

      curx += subtextx;
      cury += subtexty;

      return {
        x: curx,
        y: cury,
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

      // Here we set the index publically so that any external call can
      // call and access the element, without accessing the internal
      // variables
      this[imgAryCur] = imgAry[imgAryCur];

      return imgAry[imgAryCur];
    },

    curImage : function(){

      // Allows users to access the "last" element in the array

      if ( imgAryCur === -1 )
        return imgAry[imgAryCur];
      else
        return undefined;
    }

  };
}

