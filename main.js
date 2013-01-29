//Checks if the libraries exist
if (zxPowerPoint == undefined||typeof(zxPowerPoint) != 'object' ){
  alert("PowerPoint player missing. Halting execution.");
  throw new Error("mainPP.js missing");
}

zxPowerPoint.startUI();

//Post-Processing for jwerty
if (jwerty == undefined||typeof(jwerty) != 'object' ){
  //alert("Jwerty Library Missing");
  //throw new Error("Jwerty Library Missing");
}
else{
  //Setup for library support calls
  jwerty.key('↑', function(){
    zxPowerPoint.nextSlide();
  });
  jwerty.key('↓',function(){
    zxPowerPoint.previousSlide();
  });
  jwerty.key('←',function(){
    zxPowerPoint.previous();
  });
  jwerty.key('→',function(){
    zxPowerPoint.next();
  });
}
