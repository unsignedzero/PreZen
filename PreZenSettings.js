/* PreZen Settings
 *
 * The settings file allows one to set PreZen's settings before loading it
 * up. Any mistakes here will either be fixed by PreZen or halt execution
 * of the code depending on which setting is incorrectly set.
 *
 *
 * Updated 05-15-2013
 * Version 0.6.0.0 Beta 2
 * Created by David Tran (unsignedzero)
 */

/*Rather than pass multiple global objects,
 *we will pass one object that contains all the information needed
 */
var PreZenSettings = {
  //Slide Array

  //This will eventually hold the slides
  //externDrawFunctionArray:[ function(drawArgs), ... function(drawArgs) ],

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
   *and extra layers will not load correctly when going forward.
   *Going backwards we will see everything but the extra layers will NOT 
   *be removed
   */
  externMaxLayerCount:9,

  //Container Name (Tag)
  container:'container',

  //DEBUG Option
  externDEBUG:false,

  //Button Show
  externShowButtons:true,

  //Set outline border
  externOutlineShift:20,

  //Here we set the default support functions for the slide
  supportFunc:{}
};

