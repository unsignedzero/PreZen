/*External Settings for PreZen
 */

//Variable name that will contain the slide functions
var externDrawFunctionArray = [];

//Show Debug Slides
var showDebugSlide = false;

/*Rather than pass multiple objects,
 *we will pass one object that contains all the other ones needed.
 */
var PreZenSettings = {
  //Slide Array
  //Variable name that will contain the slide functions
  externDrawFunctionArray:externDrawFunctionArray,

  /*Sets the max amount of layers PreZen should assume a slide should have
   *Adding more slides than specified here will have unexpected results
   *and extra layers will not load correctly
   */
  externMaxLayerCount:8,

  //Sets the default font for PreZen
  externFont:'Palatino',

  //Sets the padding for the outline
  externOutlineShift:20,

  //Sets the default dimensions 
  externWidth:1000,
  externHeight:800,

  //Sets the fade time (in ms)
  externTimer:500,

  //Show Debug Slides
  showDebugSlide:false,

  //Show Slide Numbers
  showSlideNumber:true,

  /*Sets the max amount of layers PreZen should assume a slide should have
   *Adding more slides than specified here will have unexpected results
   *and extra layers will not load correctly.
   */
  externMaxLayerCount:8,

  //Container Name (Tag)
  container:'container',

  //DEBUG?
  externDEBUG:true,

  //Button Show
  externShowButtons:true,

  //Set outline border
  externOutlineShift:20,
};

