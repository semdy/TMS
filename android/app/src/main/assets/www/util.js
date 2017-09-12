'use strict';
Array.prototype.remove = function (dx) {
  if (isNaN(dx) || dx > this.length) {
    return false;
  }
  for (var i = 0, n = 0; i < this.length; i++) {
    if (this[i] != this[dx]) {
      this[n++] = this[i]
    }
  }
  this.length -= 1
};
var Util = {
  _order_marker: null // 当前的订单标记
  , _user_marker: null // 当前的用户标记
  , _map_areaName: null // 当前编辑的区域名字
  , _map_areaModels: {} // 地图上的配送区域对象
  , _editable: false // 是否编辑状态
  , _enable_areaNames : [] //所有启用状态的区域名称
  , _new: false // 是否新增状态
  , $$$Gs: function () {
    var url = document.location.href;
    var u, g;
    if (arguments[arguments.length - 1] == "#")
      u = url.split("#");
    else
      u = url.split("?");
    if (u.length == 1)
      g = '';
    else
      g = u[1];
    if (g != '') {
      var gg = g.split("&");
      var MaxI = gg.length;
      var paras = {}, ps;
      for (var i = 0; i < MaxI; i++) {
        ps = gg[i].split('=');
        if (ps.length == 2) {
          var ii = ps[1].indexOf('#');
          if (ii > 0)
            ps[1] = ps[1].substring(0, ii);
          paras[ps[0]] = ps[1];
        }
      }
      return paras;
    }
    return {};
  }
  , getFocusAreaModel: function (areaName) {
    return this._map_areaModels[areaName || this._map_areaName];
  }
  // for App
  , getCurrentPosition: function (onSuccess, onError, timeout) {
    if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
      }
      if (navigator.geolocation.watchPosition) {
        navigator.geolocation.watchPosition(onSuccess, onError, options); // getCurrentPosition
      } else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options); // getCurrentPosition
        //浏览器支持geolocation
        setInterval(function () {
          navigator.geolocation.getCurrentPosition(onSuccess, onError, options); // getCurrentPosition
        }, timeout || 5000); // 5s移动一次
      }
    } else {
      console.log('浏览器不支持geolocation');
    }
  }
  , getGeo: function () {
    if (!this._geo)
      this._geo = new BMap.Geocoder();
    return this._geo;
  }
  // 初始化baidu地图
  , initMap: function (options) {
    var containerID = options.containerID, lng = options.lng, lat = options.lat, zoomLevel = options.zoomLevel;
    console.log('initMap:(' + lng + ',' + lat + ')');
    var map = this._map = new BMap.Map(containerID);
    var point = new BMap.Point(lng, lat);
    map.centerAndZoom(point, zoomLevel);
    if (map.setMapStyle && options.googlelite == true)
      map.setMapStyle({style: 'googlelite'});
    if (BMap.NavigationControl)
      map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
    if (BMap.ScaleControl)
      map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
    if (BMap.OverviewMapControl)
      map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
    if (BMap.MapTypeControl)
      map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    if (map.disable3DBuilding)
      map.disable3DBuilding();
    if (BMap.ZoomControl)
      map.addControl(new BMap.ZoomControl()); // 添加缩放控件
    else {
      map.enableScrollWheelZoom();
      map.addEventListener("click", function (e) {
        if (!Util.isEditable())
          return;
        Util.checkAreaName();
        Util.createPolygon(e.point.lng, e.point.lat, false, "img/position3-1.png");
        //Util.getGeo().getLocation(e.point, function(rs) {
        //	console.log(rs);
        //});
      });
      /*map.addEventListener("dblclick", function (e) {
       if (!Util.isEditable())
       return;
       Util.removeFocusPoint(e.point);
       });*/
    }
    var menu = new BMap.ContextMenu();
    var txtMenuItem = [{
      text: '删除',
      callback: function (p) {
        Util.removeFocusPoint(p);
      }
    }];
    for (var i = 0; i < txtMenuItem.length; i++) {
      menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
    }
    map.addContextMenu(menu);
    //if (BMapLib && BMapLib.DrawingManager) {
    //  var overlaycomplete = function (e) {
    //    //overlays.push(e.overlay);
    //  };
    //  var styleOptions = {
    //    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
    //    fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
    //    strokeWeight: 3,       //边线的宽度，以像素为单位。
    //    strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
    //    strokeColor: "red",    //边线颜色。
    //    strokeStyle: 'solid' //边线的样式，solid或dashed。
    //  }
    //  //实例化鼠标绘制工具
    //  var drawingManager = new BMapLib.DrawingManager(map, {
    //    isOpen: false, //是否开启绘制模式
    //    enableDrawingTool: true, //是否显示工具栏
    //    drawingToolOptions: {
    //      anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
    //      offset: new BMap.Size(5, 5) //偏离值
    //    },
    //    circleOptions: styleOptions, //圆的样式
    //    polylineOptions: styleOptions, //线的样式
    //    polygonOptions: styleOptions, //多边形的样式
    //    rectangleOptions: styleOptions //矩形的样式
    //  });
    //  //添加鼠标绘制工具监听事件，用于获取绘制结果
    //  drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    //}
  }
  , removeFocusPoint: function (ppe) {
    if (!this.isEditable())
      return;
    var pps, /*ppe = e.point,*/ model = this.getFocusAreaModel(), points;
    if (model.polygon)
      points = model.polygon.getPath();
    else
      points = model.points;
    if (points.length <= 2)
      return;
    var i = 0, lngDel, latDel;
    for (; i < points.length; i++) {
      pps = points[i];
      lngDel = Math.abs(ppe.lng - pps.lng);
      latDel = Math.abs(ppe.lat - pps.lat);
      if (lngDel < 0.01 && latDel < 0.01) {
        points.remove(i);
        break;
      }
    }
    if (model.polygon)
      model.polygon.setPath(points);
    this.showArea(this._map_areaName, true);
  }
  // 加载站点信息
  , loadStations: function (callback) {
    if (URLObj && URLObj.Config.urls.tmsURL) {
      $.ajax({
        url: URLObj.Config.urls.tmsURL + '?__action=loadStation' // ,context: document.body
        , type: 'GET'
        , dataType: 'json'
        , processData: false
        , success: function (e) {
          //localStorage.setItem('_Area_' + areaName, data); // NOTICE 其实就是做了同步本地缓存
          if (callback)
            callback(e.data);
        }
        , error: function (e) {
          alert('加载站点信息失败：' + (e.responseJSON ? e.responseJSON.error : '服务器连接失败'));
        }
      });
    } else {
      console.log('没有指定tmsURL');
    }
  }
  // 加载服务端或本地配送区域
  , loadArea: function (areaName) { // load or reload
    var model = this.getAreaModel(areaName);
    var areaName = model.name;
    var data = localStorage.getItem('_Area_' + areaName);
    console.log('loadArea:' + data);
    if (data) {
      var newModel = JSON.parse(data);
      if (model.polygon) // 已经在内存中
        newModel.polygon = model.polygon;
      //if (model.ployline) // 已经在内存中
      //  newModel.ployline = model.ployline;
      this.setAreaModel(newModel, areaName);
      this._new = false;
    }
  }
  // 保存配送区域
  , saveArea: function (areaName) {
    var model = this.getAreaModel(areaName);
    var areaName = model.name;
    var points = model.points; // 原来内存模型中的点阵
    if (model.polygon) { // 多变形对象
      points = model.polygon.getPath(); // 获取界面上调整的路径
    }
    var modelSave = {name: areaName, points: points};
    var data = JSON.stringify(modelSave); // 保存的内存模型
    console.log('saveArea:' + data);
    if (URLObj && URLObj.Config.urls.tmsURL) {
      $.ajax({
        url: URLObj.Config.urls.tmsURL + '?__action=saveArea' // ,context: document.body
        , contentType: 'multipart/form-data'
        , processData: false
        , type: 'POST'
        , data: data
        , dataType: 'json'
        , success: function (e) {
          if(!e.success && e.errorCode){
            alert('保存配送区域失败：' + (e.responseJSON ? e.responseJSON.error : '服务器连接失败'));
          }else{
            model.points = points; // 内存模型更新
            localStorage.setItem('_Area_' + areaName, data); // 本地缓存更新
            this._new = false;
            alert('保存成功');
          }
        }
        , error: function (e) {
          alert('保存配送区域失败：' + (e.responseJSON ? e.responseJSON.error : '服务器连接失败'));
        }
      });
    } else {
      model.points = points; // 内存模型更新
      localStorage.setItem('_Area_' + areaName, data); // 本地缓存更新
      this._new = false;
    }
  }
  // 开始编辑配送区域
  , startEdit: function (isNew) {
    if (!this._map)
      return;
    var map = this._map;
    var model = this.getAreaModel();
    if (model.polygon) {
      model.polygon.enableEditing();
    }
    this._new = isNew || false;
  }
  // 取消编辑配送区域
  , cancelEdit: function () {
    if (!this._map_areaName) // 不用检查直接返回
      return;
    if (!this._map)
      return;
    var map = this._map;
    var model = this.getAreaModel();
    if (model.polygon) {
      model.polygon.disableEditing();
    }
    var m = model.startMarker; // 编辑区域起始点
    if (m) {
      m.removeEventListener("click");
      map.removeOverlay(m);
    }
    this._new = false;
  }
  , isEditable: function () {
    return this._editable;
  }
  , setEditable: function (b) {
    this._editable = b;
  }
  , errorMessage: '没有选中当前站点 或 当前站点从未设置过配送区域'
  , errorMessage1: '没有选中当前站点 或 当前站点从未设置过配送区域'
  // 检查当前的站点配送区域名称
  , checkAreaName: function (areaName) {
    areaName = areaName || this._map_areaName;
    if (!areaName) {
      alert(this.errorMessage);
      throw Error(this.errorMessage);
    }
    return areaName;
  }
  , checkAreaName1: function (areaName) {
    areaName = areaName || this._map_areaName;
    if (!areaName) {
      alert(this.errorMessage1);
      throw Error(this.errorMessage1);
    }
    return areaName;
  }
  // 获取配送区域数据模型
  , getAreaModel: function (areaName) {
    areaName = this.checkAreaName(areaName);
    if (!this._map_areaModels[areaName]){
      var dbModel = JSON.parse(localStorage.getItem('_Area_' + areaName));
      this._map_areaModels[areaName] = {name: areaName, points: [], polygon: null ,status : dbModel?dbModel.status:StationOverlayUtil.stationStatus.ENABLE};
    }
    return this._map_areaModels[areaName];
  }
  // 设置某个站点的配送区域数据模型
  , setAreaModel: function (model, areaName) {
    areaName = this.checkAreaName1(areaName);
    this._map_areaModels[areaName] = model;
  }
  // 删除某个站点的配送区域数据模型
  , removeAreaModel: function (areaName) {
    areaName = this.checkAreaName1(areaName);
    delete this._map_areaModels[areaName];
    localStorage.removeItem('_Area_' + areaName);
  }
  // @Deprecated
  , setAreaName: function (areaName) {
    this._map_areaName = areaName;
  }
  // 聚焦配送区域
  , focusArea: function (areaName, center) {
    if (!this._map)
      return;
    var map = this._map;
    this._map_areaName = areaName;
    var model = this.getAreaModel(areaName);
    if(model.status == StationOverlayUtil.stationStatus.FORBIDDEN){
      return;
    }
    var points = model.points; // 当前区域的做标数组
    StationOverlayUtil.openStationInfoWindow(map,model);
    if (center != false && points && points.length > 0) {
      var point = new BMap.Point(points[0].lng, points[0].lat);
      map.centerAndZoom(point, map.getZoom() || map.zoomLevel);
    }
    for (var key in this._map_areaModels) {
      var model = this._map_areaModels[key], polygon = model.polygon;
      if (polygon) {
        if (key == this._map_areaName){
          polygon.setStrokeColor("red");
        }
        else{
          polygon.setStrokeColor("blue");
        }
      }
    }
  }
  // 删除某站点配送区域
  , removeArea: function (areaName) {
    if (!this._map)
      return;
    var map = this._map;
    var model = this.getAreaModel(areaName);
    areaName = model.name; // 强制指定
    model.points = [];
    this.hideArea(areaName); // 隐藏区域多边形
    this.saveArea(areaName); // 保存删除的多边形
    this.removeAreaModel(areaName); // 删除区域模型
  }
  // 隐藏某站点配送区域
  , hideArea: function (areaName) {
    if (!this._map)
      return;
    var map = this._map;
    var model = this.getAreaModel(areaName);
    if (model.polygon) {
      StationOverlayUtil.closeStationInfoOverlay(map,model);
      model.polygon.setPath([]);
      model.polygon.removeEventListener("click");
      model.polygon.disableEditing();
      map.removeOverlay(model.polygon);
      delete model.polygon._areaName;
      delete model.polygon;
    }
  }
  // 绘制某站点配送区域
  , showArea: function (areaName, useNew) {
    if (!this._map)
      return;
    var map = this._map;
    var model = this.getAreaModel(areaName);
    if(model.status == StationOverlayUtil.stationStatus.FORBIDDEN){
      return;
    }
    var areaName = model.name;
    if (useNew && model.polygon) {
      model.points = model.polygon.getPath();
      return;
    }
    var points = model.points;
    var list = [];
    for (var i = 0; i < points.length; i++) {
      list.push(new BMap.Point(points[i].lng, points[i].lat));
    }
    if (list.length <= 1)
      return;
    if (BMap.Polygon) { // 追加边框
      if (!model.polygon) {
        var polygon = model.polygon = new BMap.Polygon(list, {
          strokeColor: "red",
          strokeWeight: 4,
          strokeOpacity: 0.7,
          strokeStyle: "dashed",
          fillColor: "gray",
          fillOpacity: 0.2
        });
        polygon._areaName = areaName;
        polygon.addEventListener("click", function () {
          Util.focusArea(this._areaName, false);
        });
        map.addOverlay(polygon);
      } else {
        model.polygon.setPath(list);
      }
    }
  }
  // 绘制所有站点的配送区域
  , drawAllArea: function (override) {
    if (!this._map)
      return;
    var map = this._map;
    for (var areaName in this._map_areaModels) {
      var model = this._map_areaModels[areaName];
      this.showArea(areaName);
    }
  }
  // "zoomend",alert("地图缩放至：" + this.getZoom() + "级"); // e.cancelBubble = true;
  // 创建多边形区域
  , createPolygon: function (lng, lat, center, iconURL, iconSize) {
    if (!this._map)
      return;
    var map = this._map;
    var model = this.getAreaModel();
    var areaName = model.name;
    var points = model.points;
    if (points.length == 0) {
      var scope = this;
      var marker = this._createMapMarker(lng, lat, center, iconURL, iconSize);
      marker.addEventListener("click",
        function () {
          this.removeEventListener("click");
          map.removeOverlay(this);
        }
      );
      map.addOverlay(marker);
      model.startMarker = marker;
    }
    if (this._new == true) {
      this.addPoint(lng, lat);
      this.showArea(areaName);
    } else {
      this.showArea(areaName, true);
    }
  }
  // 增加(内存模型中)点击点
  , addPoint: function (lng, lat) {
    var point = {lng: lng, lat: lat};
    { // 设置区域model
      var model = this.getAreaModel();
      var points = model.points;
      points.push(point);
    }
  }
  // 删除(内存模型中)点击点
  , removePoint: function (lng, lat) {
    var point = {lng: lng, lat: lat};
    { // 设置区域model
      var model = this.getAreaModel();
      var points = model.points;
      var copyPoints = [];
      for (var i = 0; i < points.length; i++) {
        if (point.lng != points[i].lng || point.lat != points[i].lat) {
          copyPoints.push(points[i]);
        }
      }
      model.points = copyPoints;
    }
  }
  // 切换城市
  , changeCity: function (city) {
    if (!this._map)
      return;
    var map = this._map;
    if (!city)
      return;
    map.centerAndZoom(city, map.getZoom() || map.zoomLevel);
  }
  // 绘制标记
  , markMapPoint: function (point, center, options) {
    if (!this._map)
      return;
    var map = this._map;
    var marker = this._createMapMarker(point.lng, point.lat, center, options._iconURL, options._iconSize);
    map.addOverlay(marker);
    if (options._callback) {
      options._callback(point, marker);
      delete options._callback;
    }
  }
  // 根据地址设置地图坐标标记
  , markMapAddress: function (city, address, center, options ,hideErrorHint) {
    if (!this._map)
      return;
    var map = this._map;
    // 将地址解析结果显示在地图上，并调整地图视野
    this.getGeo().getPoint(address, function (point) { // "虹桥国际科技广场"
      if (!point) {
        if(!hideErrorHint){
          alert('没有找到所定位的坐标('+address+')');
        }
        return;
      }
      Util.markMapPoint(point, center, options);
    }, city); // "上海市"
  }
  // 更新当前用户地理标记
  , changeUserMarker: function (options) {
    var lng = options.lng, lat = options.lat, center = options.center, iconURL = options.iconURL, iconSize = options.iconSize
      , tracRoad = options.tracRoad || false;
    console.log('changeUserMarker:(' + lng + ',' + lat + ')');
    if (!this._map)
      return;
    var map = this._map;
    if (this._user_marker) { // 移除老的user标记
      if (this._user_marker.disableDragging) // 关闭拖动
        this._user_marker.disableDragging();
      map.removeOverlay(this._user_marker);
    }
    this._user_marker = this._createMapMarker(lng, lat, center, iconURL, iconSize); // 创建user标注
    map.addOverlay(this._user_marker); // 显示用户标记
    if (this._user_marker.enableDragging) // 开启拖动
      this._user_marker.enableDragging();
    if (typeof(BMAP_ANIMATION_BOUNCE) != 'undefined')  //跳动的动画
      this._user_marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    // 判断只能放这里！！ 已经在进行路线跟踪 只有返回重进
    if (this._order_transit == true)
      return;
    if (tracRoad && this._order_marker && BMap.DrivingRoute) { // 导航
      //var oldPolyGen = map.getOverlays();
      var output = "去那里需要";
      var transit = new BMap.DrivingRoute(map, { // 驾驶路线
        renderOptions: {
          map: map,
          //panel: 'panel',
          autoViewport: true
        },
        onSearchComplete: function (results) {
          if (transit.getStatus() != BMAP_STATUS_SUCCESS) {
            return;
          }
          var plan = results.getPlan(0);
          output += plan.getDuration(true) + "\n"; //获取时间
          output += "总路程为：";
          output += plan.getDistance(true) + "\n"; //获取距离
          //var newPolyGen = map.getOverlays();
          //Util.__need_clear = [];
        },
        onPolylinesSet: function () {
          setTimeout(function () {
            if (typeof(Zaofans) != 'undefined' && Zaofans.Plugin && Zaofans.Plugin.echo) {
              Zaofans.Plugin.echo(output);
            } else {
              alert(output);
            }
          }, 1000);
        }
      }); //驾车实例
      transit.search(this._user_marker.point, this._order_marker.point);
      this._order_transit = true;
    }
  }
  // 创建地图标记
  // private
  , _createMapMarker: function (lng, lat, center, iconURL, iconSize) {
    console.log('_createMapMarker:(' + lng + ',' + lat + ')');
    if (!this._map)
      return null;
    var map = this._map;
    var point = new BMap.Point(lng, lat);
    if (center != false)
      map.centerAndZoom(point, map.getZoom() || map.zoomLevel);
    if (iconURL) {
      iconSize = iconSize || 20;
      var myIcon = new BMap.Icon(iconURL,
        // 指定定位位置。
        // 当标注显示在地图上时，其所指向的地理位置距离图标左上
        // 角各偏移7像素和25像素。您可以看到在本例中该位置即是
        // 图标中央下端的尖角位置。
        new BMap.Size(iconSize, iconSize), {
          anchor: new BMap.Size(iconSize / 2, iconSize / 2)
        });
      return new BMap.Marker(point, {icon: myIcon}); // 创建标注
    } else {
      return new BMap.Marker(point); // 创建标注
    }
  }
  // 客户端判断是否在配送范围
  , isInsidePolygon: function (pt, poly) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i].lat <= pt.lat && pt.lat < poly[j].lat) || (poly[j].lat <= pt.lat && pt.lat < poly[i].lat)) &&
      (pt.lng < (poly[j].lng - poly[i].lng) * (pt.lat - poly[i].lat) / (poly[j].lat - poly[i].lat) + poly[i].lng) &&
      (c = !c);
    return c;
  }
  // 测试客户端判断是否在某站点配送范围
  // @Deprecated
  , testInsidePolygon: function (areaName, point) {
    console.log('testInsidePolygon:' + point);
    if (!point && !this._user_marker) {
      alert('没有跟踪当前位置，请点击右下方人形图标');
      return;
    }
    var model = this.getAreaModel(areaName); // 获取内存模型
    if (!model || !model.points) {
      this.checkAreaName();
      return;
    }
    var points = model.points;
    if (!points || points.length == 0) {
      alert('当前站点没有设置配送区域');
      return;
    }
    if (model.polygon) {
      var positions = model.polygon.getPath();
      if (points.length != positions.length) {
        alert('当前站点配送区域已修改,请保存后重试');
        return;
      } else {
        for (var i = 0; i < points.length; i++)
          if (points[i].lng != positions[i].lng || points[i].lat != positions[i].lat) {
            alert('当前站点配送区域已修改,请保存后重试');
            return;
          }
      }
    }
    var b = this.isInsidePolygon(point || this._user_marker.point, points);
    return b;
    //alert(b ? '在当前站点的配送范围内' : '不在当前站点的配送范围内');
  }
};
