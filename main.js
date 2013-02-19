//Checks if the libraries exist
if (zxPowerPoint == undefined||typeof(zxPowerPoint) != 'object' ){
  alert("ERROR:PreZen missing. Halting execution.");
  throw new Error("mainPP.js missing");
}

zxPowerPoint.startUI();

//Post-Processing for jwerty
if (jwerty == undefined||typeof(jwerty) != 'object' ){
  //alert("ERROR:Jwerty Library Missing");
  //throw new Error("Jwerty Library Missing");
  console.warn("WARN:jwerty not available");
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
  jwerty.key('R',function(){
    zxPowerPoint.reSize();
  });
  jwerty.key('N',function(){
    zxPowerPoint.msgBoxChange();
  });
}
