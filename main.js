/* PreZen Main
 *
 * This is the main of PreZen and loads it up, in addition to all support
 * libraries and files.
 *
 *
 * Created 01-29-2013
 * Updated 05-17-2013
 * Version 0.6.0.0 Tango
 * Created by David Tran (unsignedzero)
 */

(function(){
  "use strict";

  // Checks if the libraries exist
  if (zxPowerPoint == undefined||typeof(zxPowerPoint) != 'object' ){
    alert("ERROR:PreZen missing. Halting execution.");
    throw new Error("mainPP.js missing");
  }

  zxPowerPoint.startUI();

  // Debug messages can be set via this method
  // var DEBUG = settings["externDEBUG"];
  // zxPowerPoint.setDebugMsg("HELLO");

  // Post-Processing for jwerty Library
  if (jwerty == undefined||typeof(jwerty) != 'object' ){
    // alert("ERROR:Jwerty Library Missing");
    // throw new Error("Jwerty Library Missing");
    console.warn("WARN:jwerty not available");
  }
  else{
    // Setup for library support calls
    jwerty.key('↑', function(){
      zxPowerPoint.nextSlide();
    });
    jwerty.key('↓', function(){
      zxPowerPoint.previousSlide();
    });
    jwerty.key('←', function(){
      zxPowerPoint.previous();
    });
    jwerty.key('→', function(){
      zxPowerPoint.next();
    });
    jwerty.key('R', function(){
      zxPowerPoint.reSize();
    });
    jwerty.key('N', function(){
      zxPowerPoint.msgBoxChange();
    });
  }
})();
