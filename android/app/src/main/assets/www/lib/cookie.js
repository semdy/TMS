'use strict';
// /////////////////////////////////////////////////////////////////////////////////////////////////////
var Cookie = {};
// public
Cookie.setCookie = function (name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value)
    + ((expires) ? "; expires=" + expires.toGMTString() : "")
    + ((path) ? "; path=" + path : "")
    + ((domain) ? "; domain=" + domain : "")
    + ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}
// public
Cookie.getCookie = function (name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0)
      return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}
// public
Cookie.deleteCookie = function (name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" + ((path) ? "; path=" + path : "")
    + ((domain) ? "; domain=" + domain : "")
    + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}
