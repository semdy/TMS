'use strict';
//if (window.history.length == 1) {
//  sendAjaxRequest('http://www.zaofans.com/weixin-debug/open-api?type=getOpenidByCode&uname=zaofans&param=' + code + '');
//} else {
//  window.history.back;
//}
// =========================================================== //
var User = {
    longitude: 116.404,
    latitude: 39.915,
    //longitude: 121.407472,
    //latitude: 31.230998,
    trac: false,
    // private
    tracUser: function (longitude, latitude, center) {
      if (!this.trac) // 不跟踪
        return;
      var options = {
        lng: longitude || this.longitude,
        lat: latitude || this.latitude,
        center: true,
        tracRoad: false
      };
      Util.changeUserMarker(options);
    },
    tracUserRoad: function (longitude, latitude, center) {
      if (!this.trac) // 不跟踪
        return;
      var options = {
        lng: longitude || this.longitude,
        lat: latitude || this.latitude,
        center: true,
        tracRoad: true
      };
      Util.changeUserMarker(options);
    }
  },
  delt1 = 0.011, delt2 = 0.004,
  __params = Util.$$$Gs();
window.OrderID = __params.OrderID;
window.Catalog = __params.Catalog; // {{delivery.DISPSTATUS}}_{{isSearch}}
// =========================================================== //
//$.ajax.prototype.useBody=true;
$(document).ajaxSend(function (event, xhr, property) {
  //xhr.setRequestHeader('Access-Control-Allow-Origin',"*");
  xhr.setRequestHeader('__scm_sessionid', localStorage.getItem('__scm_sessionid'));
});
function gapOrders(orderID) {
  if (URLObj && URLObj.Config.urls.gapOrderURL) {
    return $.ajax({
      url: URLObj.Config.urls.gapOrderURL + '?orderID=' + orderID + '&type=1&__zaofans=true'
      , type: 'POST'
      , dataType: 'json'
      , success: function (e) {
        alert('抢单成功');
      }
      , error: function (e) {
        alert('抢单失败:' + (e.responseJSON ? e.responseJSON.error : '服务器连接失败'));
      }
    });
  }
}

/**
 * 测试输入地址是否在配送区域的检查
 * @param inAllArea: true,false,是否在所以配送区域中检查
 */
function checkAreaTest(inAllArea) {
  var city = $('.input-test-city').val();
  var address = $('.input-test-addr').val();
  if (city == '' || address == '') {
    alert('城市地址或坐标必须填写');
    return;
  }
  var options = {
    _callback: function (point) {
      if(inAllArea){//如果是在全部区域检查
        var result = false,whereArea;
        for(var emn = 0 ; emn < Util._enable_areaNames.length ; emn ++){
          Util.loadArea(Util._enable_areaNames[emn]);
          result = result || Util.testInsidePolygon(Util._enable_areaNames[emn], point);
          if(result == true){
            whereArea = Util._enable_areaNames[emn];
            $('.station_checkbox .station_input[stationid=\''+whereArea+'\']').parent().find('input')[0].checked = 'checked';
            changeStation($('.station_checkbox .station_input[stationid=\''+whereArea+'\']').parent().find('input')[0]);
            break;
          }

        }
        alert(result ? '在配送范围内' : '不在配送范围内');
      }else{//只检查当前选中区域
        var ret = Util.testInsidePolygon(Util._map_areaName, point);
        alert(ret ? '在当前站点的配送范围内' : '不在当前站点的配送范围内');
      }
    }
  };
  if (address.indexOf(',') >= 0 && address.indexOf('{') >= 0) {
    var point = JSON.parse(address);
    Util.markMapPoint(point, true, options);
  } else {
    Util.markMapAddress(city, address, true, options);
  }
}
function checkAreaUser() { // 测试当前用户是否在配送区域的检查
  var ret = Util.testInsidePolygon();
  alert(ret ? '在当前站点的配送范围内' : '不在当前站点的配送范围内');
}
function changeCity() {
  var city = $('.input-test-city').val();
  Util.changeCity(city);
  if (city == '所有')
    $('.station_checkbox').show();
  else
    $('.station_checkbox').each(function (index, checkbox) {
      if($(checkbox).children().attr('stationname').indexOf(city) != -1 && Util.getAreaModel($(checkbox).children().attr('stationid')).status != StationOverlayUtil.stationStatus.FORBIDDEN){//$(checkbox).children().attr('status')
        $(checkbox).show();
      }else{
        $(checkbox).hide();
      }
    });
}
function editStart(isNew) { // 开始编辑配送区域
  if (isNew == true) {
    $('.position_new').removeClass('position_new').addClass('position_new_active');
    $('.position_edit_active').removeClass('position_edit_active').addClass('position_edit');
  } else {
    $('.position_edit').removeClass('position_edit').addClass('position_edit_active');
    $('.position_new_active').removeClass('position_new_active').addClass('position_new');
  }
  Util.setEditable(true);
  Util.startEdit(isNew);
}
function editEnd() { // 终止编辑配送区域
  $('.position_new_active').removeClass('position_new_active').addClass('position_new');
  $('.position_edit_active').removeClass('position_edit_active').addClass('position_edit');
  Util.setEditable(false);
  Util.cancelEdit();
}
function newArea() { // 编辑多边形区域
  if (!Util.isEditable())
    editStart(true);
  else
    editEnd();
}
function editArea() { // 编辑多边形区域
  if (!Util.isEditable())
    editStart(false);
  else
    editEnd();
}
function loadArea() {
  editEnd();
  Util.loadArea(); // 加载配送区域信息
}
function saveArea() {
  editEnd();
  Util.saveArea(); // 保存配送区域信息
}
function removeArea() {
  editEnd();
  if (window.confirm('确认删除当前站点配送区域?'))
    Util.removeArea(); // 移除配送区域信息
}
function toggleAllStation(toggleCheckbox,isClicklabel){
  if(isClicklabel){
    if(toggleCheckbox.checked){
      toggleCheckbox.checked = false;
    }else{
      toggleCheckbox.checked = 'checked'
    }
  }
  $('#top_container').find('input.station_input').each(function(index,theCheckbox){
    if(!$(theCheckbox).is(':hidden')){
      theCheckbox.checked = toggleCheckbox.checked;
      changeStation(theCheckbox);
    }
  },this);
}

function clickStationCheckboxLabel(checkbox){
  if(checkbox.checked || checkbox.disabled == true){
    checkbox.checked = false;
  }else{
    checkbox.checked = 'checked'
  }
  changeStation(checkbox);
}

function changeStation(checkbox) {
  editEnd();
  var stationid = $(checkbox).attr('stationid');
  Util.hideArea(stationid); // 隐藏选中的区域
  if (checkbox.checked) {
    Util.loadArea(stationid); // 加载站点配送区域信息
    Util.showArea(stationid); // 显示站点配送区域信息
    Util.focusArea(stationid); // 聚焦改站点配送区域
  }
}

function reloadStation(){
  $('.input-test-city').val('所有');
  if ($('#top_container').length > 0){
    StationOverlayUtil.clearAllOverlay(Util._map);
    $('#top_container').html('');
    loadStation();
  }
}

function loadStation() {
  var $container = $('#top_container');
  if ($container.length > 0)
    $container.html('<font color="red">站点信息加载中......</font>');
    Util.loadStations(function (stations) { // 加载站点
      if (!stations) {
        alert('站点信息加载失败');
        return;
      }
      var html = '',enableStation='',isForbidden,disabled = '';
      $.each(stations, function (index, station) {
        if (station.ID != '-1') // name="stations"
          isForbidden = station.STATUS == StationOverlayUtil.stationStatus.FORBIDDEN;
          isForbidden?'':Util._enable_areaNames.push(station.ID);
          disabled = isForbidden?'disabled = "disabled"':'';
          enableStation = !isForbidden?'':'<a style="color : gold" onclick="StationOverlayUtil.enabledStation(\''+station.ID+'\')" href="javascript:void(0)">(启用)</a>';
          html += '<div class="station_checkbox"><input class="station_input" type="checkbox" stationid="' + station.ID + '" stationname="' + station.NAME + '" ' +'STATUS="'+station.STATUS+'" '+disabled+
          ' onchange="changeStation(this)"/>' + '<label onclick="clickStationCheckboxLabel(this.parentElement.getElementsByTagName(\'input\')[0])">'+station.NAME + '</label>'+enableStation+'</div>';
        if (station.AREA_DEFAULT) { // 数据库存放的数据
          var model = {name: station.ID, station: station.NAME, points: station.AREA_DEFAULT,status : station.STATUS};
          localStorage.setItem('_Area_' + station.ID, JSON.stringify(model));
        }
      });
      $container.html(html).append('<div class="station_checkbox_toggle"><input type="checkbox"' +
        'onchange="toggleAllStation(this)"/>' + '<label onclick="toggleAllStation(this.parentElement.getElementsByTagName(\'input\')[0],true)">显示所有站点/隐藏所有站点</label>' + '</div>');
      $('service').html('['+URLObj.Config.urlName+']');
    });
}
function tracUserRoad() { // 跟踪当前用户位置
  if (User.trac == false) {
    $('.position_tracuser').removeClass('position_tracuser').addClass('position_tracuser_active');
    User.trac = true;
    User.tracUserRoad();
  } else {
    $('.position_tracuser_active').removeClass('position_tracuser_active').addClass('position_tracuser');
    User.trac = false;
  }
}
function tracUser() { // 跟踪当前用户位置
  if (User.trac == false) {
    $('.position_tracuser').removeClass('position_tracuser').addClass('position_tracuser_active');
    User.trac = true;
    User.tracUser();
  } else {
    $('.position_tracuser_active').removeClass('position_tracuser_active').addClass('position_tracuser');
    User.trac = false;
  }
}
$(document).ready(function () {
  // =========================================================== //
  (function () {
    var options = {
      containerID: "position_container",
      lng: User.longitude,
      lat: User.latitude,
      googlelite: (typeof(Zaofans) != 'undefined' && Zaofans.Config && Zaofans.Config.isRealPhone == true) ? true : false,
      zoomLevel: 13
    };
    Util.initMap(options);
    if (!window.Catalog || window.Catalog == 'userLocation') {
      setTimeout(tracUser, 2000);
    }
    // =========================================================== //
    var mixMarkerOptions = function (order, isIntial) {
      order._className = isIntial ? 'layer_order layer_order2' : 'layer_order'; // 分配和未分配的订单样式
      order._iconURL = isIntial ? 'img/position2.png' : 'img/position.png'; // 分配和未分配的图标
      order._iconSize = 35; // 订单的图表大小
      order._length = 120; // 订单显示框的宽度
      order._focus = (order.ID == window.OrderID); // 是否当前单据
      order._callback = function (point, marker) { // 添加订单标记的回调
        var lay = new OrderOverlay(point, this); // 添加自定义覆盖说明框
        Util._map.addOverlay(lay);
        marker.addEventListener("click", function (e) {
          lay.toggle(e); // 隐藏描述图层
        });
        if (this._focus) // 是否焦点订单
          Util._order_marker = marker;
      };

      return order;
    };

    var catalog = 'DeliveryList_' + window.Catalog, orderFocus;
    var isIntial = catalog.indexOf('INITIAL') >= 0;
    if (localStorage[catalog]) { // 查询本地缓存的各类订单
      var orderList = JSON.parse(localStorage[catalog]);
      for (var i = 0; i < orderList.length; i++) {
        var order = orderList[i];
        if (!order.CITYNAME && (order.CITYID == '10224' || order.CITYID == '14708')) // TODO 暂时写死，后台没传城市Name
          order.CITYNAME = '上海市';
        else // 默认用北京市，现在自有配送试点都在北京
          order.CITYNAME = order.CITYNAME || '北京市';
        if (!order.FULLADDRESS) {// 组装完整的地址
          //order.FULLADDRESS = order.AREANAME + ' ' + order.BUILDINGNAME + ' ' + order.ADDRESS;
          order.FULLADDRESS = order.COUNTYNAME ? order.COUNTYNAME + ' ' : '' + order.ADDRESS;
        }
        if (order.FULLADDRESS && order.FULLADDRESS.trim().length == 0)
          continue;

        mixMarkerOptions(order, isIntial);

        if (order.ID == window.OrderID) // 是否焦点订单
          orderFocus = order;
        //else // 其他地图上的订单
          //Util.markMapAddress(order.CITYNAME, order.ADDRESS, false, order, true);
      } // end for
      if (orderFocus) // 标注焦点订单
        setTimeout(function (e) {
          console.log('markMapAddress');
          Util.markMapAddress(orderFocus.CITYNAME, orderFocus.ADDRESS, true, orderFocus);
        }, 1000);
    }
  })();
  // =========================================================== //
  Util.getCurrentPosition( // 监听手机位置变化
    // success
    function (position) { //返回用户位置
      var longitude = position.coords.longitude + delt1; //经度
      var latitude = position.coords.latitude + delt2; //纬度
      if (User.longitude != longitude || User.latitude != latitude) {
        User.longitude = longitude;
        User.latitude = latitude;
        User.tracUser();
      }
    }
    // error
    , function (error) {
      switch (error.code) {
        case 1:
          console.log("位置服务被拒绝");
          break;
        case 2:
          console.log("暂时获取不到位置信息");
          break;
        case 3:
          console.log("获取信息超时");
          break;
        case 4:
          console.log("未知错误");
          break;
      }
    });
  // =========================================================== //
  loadStation();
  // =========================================================== //
});
