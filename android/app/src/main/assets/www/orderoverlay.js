// 定义自定义覆盖物的构造函数
function OrderOverlay(center, order) {
  this._center = center;
  this._order = order;
}
// 继承API的BMap.Overlay
OrderOverlay.prototype = new BMap.Overlay();
// 实现初始化方法
OrderOverlay.prototype.initialize = function (map) {
  var self = this;
// 保存map对象实例
  this._map = map;
// 创建div元素，作为自定义覆盖物的容器
  var div = document.createElement("div");
  div.innerHTML =
    '<div class="layer-body">'
    + '单: ' + this._order.ID + "<br />"
    + '批: ' + this._order.LOTNO + "<br />"
    + '电话: <a href="javascript:;" tel="'+ this._order.RECEIVERMOBILE + '">' + this._order.RECEIVERMOBILE + "</a><br />"
    + '取餐人: ' + this._order.RECEIVERNAME + "<br />"
    +  (this._order.DISPSTATUS == "INITIAL" ? '<div class="layer-footer"><button>我来送</button></div>' : '')
    + '</div>';
  div.className = (this._order._className || "layer_order") + (this._order._focus ? ' current' : '');
  //div.style.width = this._order._length + "px";
  //div.style.height = this._order._length / 2 + "px";
  div.style.position = "absolute";
//div.style.background = this._order._color;
// 将div添加到覆盖物容器中
  map.getPanes().markerPane.appendChild(div);
// 保存div实例
  this._div = div;
  this._div.addEventListener("ontouchstart" in document ? "touchstart" : "click", function (e) {
    if( e.target.nodeName === 'BUTTON' && !e.target.disabled ){
      self.hide();
    }
    else if( e.target.nodeName === 'A' && e.target.getAttribute('tel') ){
      location.href = "tel:" + e.target.getAttribute('tel');
    }
  }, false);
  // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
  // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
  return div;
}
// 实现绘制方法
OrderOverlay.prototype.draw = function () {
// 根据地理坐标转换为像素坐标，并设置给容器
  var position = this._map.pointToOverlayPixel(this._center);
  this._div.style.left = position.x /*- this._order._length / 2*/ + "px";
  this._div.style.top = position.y - this._order._length / 2 + "px";
}
// 实现显示方法
OrderOverlay.prototype.show = function () {
  if (this._div) {
    this._div.style.display = "";
  }
}
// 实现隐藏方法
OrderOverlay.prototype.hide = function () {
  var self = this;
  if (window.Catalog && window.Catalog.indexOf('INITIAL') == 0) { // 抢单模式
    if (this._order && this._order.DISPSTATUS == "INITIAL") { // 可抢状态
      var confirm = window.confirm('确认抢此单?');
      if (!confirm)
        return;
      window.gapOrders(this._order.ID).then(function () {
        $(self._div).find("button").addClass('disabled').attr("disabled", true);
      });
      if (this._div) {
        this._div.childNodes[1].style.display = "none";
      }
      return;
    }
  }
  //if (this._div) {
  //  this._div.style.display = "none";
  //}
}// 添加自定义方法
OrderOverlay.prototype.toggle = function (e) {
  if (this._div) {
    if (this._div.style.display == "") {
      this.hide();
    }
    else {
      this.show();
    }
  }
}
//else if (BMap.Polyline) {
//  model.ployline = new BMap.Polyline(list,
//    {strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5});
//  map.addOverlay(model.ployline);
//}
//if (BMap.ContextMenu) {
//  var removePoly = function (event, ele, polygon) {
//    //Util.removeArea(areaName);
//    alert(1);
//  }
//  //创建右键菜单
//  var menu = new BMap.ContextMenu();
//  menu.addItem(new BMap.MenuItem('删除', removePoly.bind(model.polygon)));
//}
