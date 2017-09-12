
// , createXMLHttpRequest: function
//  () {
//  var xmlHttpReq;
//  try {
//    xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP
//  } catch (E) {
//    try {
//      xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP
//    } catch (E) {
//      xmlHttpReq = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
//    }
//  }
//  return xmlHttpReq;
//}
// , sendAjaxRequest: function (options) {
//  var xmlHttpReq = this.createXMLHttpRequest();
//  //创建XMLHttpRequest对象
//  xmlHttpReq.open(options.method || "get", options.url, true);
//  if (options.headers)
//    for (var headKey in  options.headers) {
//      var headVal = options.headers[headKey];
//      xmlHttpReq.setRequestHeader(headKey, headVal);
//    }
//  if (options.success)
//  //xmlHttpReq.onload
//    xmlHttpReq.onreadystatechange = function (e) { //指定响应函数 onload
//      if (xmlHttpReq.readyState == 4) { // ok
//        if (xmlHttpReq.status == 200) { // httpstatus
//          options.success(e);
//          return;
//        }
//        if (options.fail)
//          options.fail(e);
//      }
//    };
//  //if (options.ready)
//  //  xmlHttpReq.onreadystatechange = function (e) { //指定响应函数 onload
//  //    if (xmlHttpReq.readyState == 4) { // ok
//  //      options.ready(e);
//  //      return;
//  //    if (options.fail)
//  //      options.fail(e);
//  //    }
//  //  };
//  if (options.error)
//    xmlHttpReq.onerror = options.error;
//  xmlHttpReq.send();
//}


// 设置待配送单位置
//var catalogs = ['DeliveryList_DISTRIBUTED_false', 'DeliveryList_INITIAL_false'];
//for (var jj = 0; jj < catalogs.length; jj++)
//$.ajax({
//  url: 'http://api.map.baidu.com/geocoder/v2/?ak=raDjCy5RESGgDeo0HT9lMykB&output=json&callback=showLocation&address=%E7%99%BE%E5%BA%A6%E5%A4%A7%E5%8E%A6'
//  , type: 'GET'
//  , dataType: 'JSONP'
//  , processData: false
//  , success: function (e) {
//    var location = e.result.location;
//    alert(location.lng+','+location.lat);
//  }
//  , error: function (e) {
//    alert('加载站点信息失败，请刷新重试：' + e.statusText);
//  }
//});
