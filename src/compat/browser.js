Monocle.Browser = { engine: 'W3C' }

// Detect the browser engine and set boolean flags for reference.
//
Monocle.Browser.is = {
  IE: (!!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1)) &&
    (Monocle.Browser.engine = "IE"),
  Opera: navigator.userAgent.indexOf('Opera') > -1 &&
    (Monocle.Browser.engine = "Opera"),
  WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1 &&
    (Monocle.Browser.engine = "WebKit"),
  Gecko: navigator.userAgent.indexOf('Gecko') > -1 &&
    navigator.userAgent.indexOf('KHTML') === -1 &&
    (Monocle.Browser.engine = "Gecko"),
  MobileSafari: !!navigator.userAgent.match(/AppleWebKit.*Mobile/)
} // ... with thanks to PrototypeJS.


// Detect the client platform (typically device/operating system).
//
Monocle.Browser.on = {
  iPhone: navigator.userAgent.indexOf("iPhone") != -1,
  iPad: navigator.userAgent.indexOf("iPad") != -1,
  BlackBerry: navigator.userAgent.indexOf("BlackBerry") != -1,
  Android: navigator.userAgent.indexOf('Android') != -1,
  MacOSX: navigator.userAgent.indexOf('Mac OS X') != -1,
  Kindle3: navigator.userAgent.match(/Kindle\/3/)
  // TODO: Mac, Windows, etc
}


// It is only because MobileSafari is responsible for so much anguish that
// we special-case it here. Not a badge of honour.
//
if (Monocle.Browser.is.MobileSafari) {
  (function () {
    var ver = navigator.userAgent.match(/ OS ([\d_]+)/);
    if (ver) {
      Monocle.Browser.iOSVersion = ver[1].replace(/_/g, '.');
    } else {
      console.warn("Unknown MobileSafari user agent: "+navigator.userAgent);
    }
  })();
}
Monocle.Browser.iOSVersionBelow = function (strOrNum) {
  return Monocle.Browser.iOSVersion && Monocle.Browser.iOSVersion < strOrNum;
}


// A helper class for sniffing CSS features and creating CSS rules
// appropriate to the current rendering engine.
//
Monocle.Browser.css = new Monocle.CSS();


// During Reader initialisation, this method is called to create the
// "environment", which tests for the existence of various browser
// features and bugs, then invokes the callback to continue initialisation.
//
// If the survey has already been conducted and the env exists, calls
// callback immediately.
//
Monocle.Browser.survey = function (callback) {
  if (!Monocle.Browser.env) {
    Monocle.Browser.env = new Monocle.Env(callback);
  } else if (typeof callback == "function") {
    callback();
  }
}

Monocle.pieceLoaded('compat/browser');
