/* Detecting Mobile Clients
 *
 * This is a small snippit of code that allows one to check if the browser
 * viewing this page is mobile or not. Not completely working, as Firefox
 * on the mac is seen as mobile which it is not.
 *
 * This function is global to all JS files.
 *
 */

//Source
//http://stackoverflow.com/questions/11381673/javascript-solution-to-detect-mobile-browser

function isMobile(){
  // if we want a more complete list use this: http://detectmobilebrowsers.com/
  // str.test() is more efficient than str.match()
  // remember str.test is case sensitive
  var _isMobile = (/iphone|ipod|android|ie|blackberry|fennec/).test
       (navigator.userAgent.toLowerCase());
  //return false;
  return _isMobile;
}
