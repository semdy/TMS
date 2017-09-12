angular.module('deliveryUiApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/DeliveryList.tpl.html',
    "<style>.nav-btn .img{\n" +
    "    height: 20px;\n" +
    "    width: auto;\n" +
    "    display: block;\n" +
    "    margin: 0 auto;\n" +
    "  }\n" +
    "\n" +
    "  .img.grabOrder {\n" +
    "    height: 23px;\n" +
    "    -webkit-transform: translateY(3px);\n" +
    "    -moz-transform: translateY(3px);\n" +
    "    -ms-transform: translateY(3px);\n" +
    "    -o-transform: translateY(3px);\n" +
    "    transform: translateY(3px);\n" +
    "  }\n" +
    "\n" +
    "  .nav-btn span{\n" +
    "    font-size: 12px;\n" +
    "  }\n" +
    "\n" +
    "  .nav-btn{\n" +
    "    -webkit-box-flex: 0.2;\n" +
    "    -webkit-flex: 0.2;\n" +
    "    flex: 0.2;\n" +
    "  }\n" +
    "\n" +
    "  .nav-btn:nth-child(3) .img{\n" +
    "    height: 40px;\n" +
    "    margin-top: -20px;\n" +
    "    border: 2px solid #ffffff;\n" +
    "    -webkit-border-radius: 50%;\n" +
    "    -moz-border-radius: 50%;\n" +
    "    border-radius: 50%;\n" +
    "  }</style> <ion-header-bar bak_class=\"bar-positive\"> </ion-header-bar> <header> <div class=\"searchDiv flex flex-vcenter flex-hSbetween\"> <div class=\"Delivery_menu\" ng-click=\"openNavigation()\"><i class=\"fa fa-bars fa-2x\"></i></div> <div class=\"div1\"> <input type=\"search\" class=\"hasRadius\" ng-model=\"searchContent\" id=\"searchContent\" placeholder=\"请输入取餐人姓名或地址或电话\"> </div> <div class=\"div2\"> <button class=\"btn_delivery blue hasRadius ngdialog-button-primary\" ng-class=\"{active : isSearch}\" ng-click=\"search(searchContent)\">搜</button> <button class=\"btn_delivery blue hasRadius ngdialog-button-primary\" ng-click=\"scan()\">扫</button> </div> </div> <div class=\"div0\" id=\"position_memo\" style=\"display: none\">未配送</div> </header> <when-scrolled ng-show=\"!showPackageDetial\" config=\"scrollConfig\" is-search=\"isSearch\" status=\"status\" curr-package=\"currPackage\" show-package-detial=\"showPackageDetial\" curr-package-detial=\"currPackageDetial\"></when-scrolled> <!--<div ng-include = \"'views/packageDetail.tpl.html'\" ng-if=\"showPackageDetial\"></div>--> <time-picker if=\"openTimePicker\" timepickerresult=\"1\" style=\"display: none\"></time-picker> <!--<footer class=\"d-f\" ng-if=\"showPackageDetial\"><a ng-click=\"bindBackButtonAction()\" class=\"btn hasRadius brown\" style=\"display: block;float: right\">返回</a></footer>--> <footer class=\"d-f flex flex-vcenter flex-hSaround\" ng-if=\"!showPackageDetial\"> <div class=\"nav-btn\" ng-click=\"deliverFinsh()\"> <img class=\"img\" ng-if=\"tabPage == 'deliverFinsh'\" src=\"img/yipeisong@2x.png\"> <img class=\"img\" ng-if=\"tabPage != 'deliverFinsh'\" src=\"img/yipeisong-icon@2x.png\"> <span ng-style=\"{color : tabPage == 'deliverFinsh'?'#00aef1':''}\">已配送</span> </div> <div class=\"nav-btn\" ng-click=\"deliverUndisp()\"> <img class=\"img grabOrder\" ng-if=\"tabPage == 'deliverUndisp'\" src=\"img/qiangdan-icon--.@2x.png\"> <img class=\"img grabOrder\" ng-if=\"tabPage != 'deliverUndisp'\" src=\"img/qiangdan-icon-KB@2x.png\"> <span ng-style=\"{color : tabPage == 'deliverUndisp'?'#00aef1':''}\">抢单</span> </div> <div class=\"nav-btn\" ng-click=\"deliver()\"> <img class=\"img\" ng-if=\"tabPage == 'deliver'\" src=\"img/weipeisong--icon@2x.png\"> <img class=\"img\" ng-if=\"tabPage != 'deliver'\" src=\"img/weipeisong--icon@2x.png\"> <span ng-style=\"{color : tabPage == 'deliver'?'#00aef1':''}\">未配送</span> </div> <div class=\"nav-btn\" ng-click=\"deliverException()\"> <img class=\"img\" ng-if=\"tabPage == 'deliverException'\" src=\"img/yiquxiao-icon@2x.png\"> <img class=\"img\" ng-if=\"tabPage != 'deliverException'\" src=\"img/yiquxiao-icon@2x_2.png\"> <span ng-style=\"{color : tabPage == 'deliverException'?'#00aef1':''}\">已取消</span> </div> <div class=\"nav-btn\" ng-click=\"deliverExit()\"> <img class=\"img\" src=\"img/tuchu-icon@2x.png\"> <span>退出登录</span> </div> <!--<a ng-href=\"#/position/userLocation/-1\">--> <!--<button class=\"btn yellow hasRadius ngdialog-button-primary\">位置</button>--> <!--</a>--> <!--<button class=\"btn blue hasRadius ngdialog-button-primary\" ng-class=\"{active : tabPage == 'deliverFinsh'}\" ng-click=\"deliverFinsh()\">已配</button>--> <!--<button class=\"btn green hasRadius ngdialog-button-primary\" ng-class=\"{active : tabPage == 'deliver'}\" ng-click=\"deliver()\">待配</button>--> <!--<button class=\"btn brown hasRadius ngdialog-button-primary\" ng-class=\"{active : tabPage == 'deliverUndisp'}\" ng-click=\"deliverUndisp()\">抢单</button>--> <!--<button class=\"btn orange hasRadius ngdialog-button-primary\" ng-class=\"{active : tabPage == 'deliverException'}\" ng-click=\"deliverException()\">已取消</button>--> <!--<button class=\"btn gray hasRadius ngdialog-button-primary\" ng-click=\"deliverExit()\">退出</button>--> </footer>"
  );


  $templateCache.put('views/LoginRegister.tpl.html',
    "<div class=\"login-reg\"> <div class=\"login_reg_tab\"> <p class=\"login_show\" id=\"login_title\" ng-click=\"vm.flag=false\">{{vm.login_title}}</p> <p class=\"clear\"></p> </div> <div class=\"login\" ng-show=\"!vm.flag\"> <div class=\"main\"> <form id=\"loginform\" name=\"loginform\" ng-submit=\"login($event)\" novalidate> <div class=\"div1\"> <input type=\"text\" name=\"username\" id=\"username\" placeholder=\"请输入您的用户名\" ng-model=\"vm.username\" required> </div> <div class=\"div2\"> <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"请输入您的密码\" required ng-model=\"vm.password\"> </div> </form> <div class=\"click_wrapper\" ng-click=\"vm.isRemenberPassword = !vm.isRemenberPassword\"><i class=\"fa fa-circle fa-2x\" ng-class=\"{active : vm.isRemenberPassword}\"></i><input id=\"remenber_password\" type=\"checkbox\" ng-model=\"vm.isRemenberPassword\"><label for=\"\">记住密码</label></div> <div class=\"click_wrapper\" ng-click=\"vm.isRemenberUserName = !vm.isRemenberUserName\"><i class=\"fa fa-circle fa-2x\" ng-class=\"{active : vm.isRemenberUserName}\"></i><input id=\"remenber_username\" type=\"checkbox\" ng-model=\"vm.isRemenberUserName\"><label for=\"\">记住用户名</label></div> <input form=\"loginform\" type=\"submit\" id=\"login_button\" value=\"登&nbsp;&nbsp;&nbsp;录\"> <button id=\"change_button\" ng-click=\"changeServer()\">切&nbsp;&nbsp;&nbsp;换</button> <div class=\"switch server_type\"> <!--<div class=\"groove switch-groove server_type\" ng-click=\"switchServer()\" ng-style=\"{'background-color' : isOfficeService?'white':'gray'}\">--> <!--<i class=\"guillotine switch-guillotine server_type fa fa-circle fa-3x\" ng-class=\"{open : isOfficeService,close : !isOfficeService}\"></i>--> <!--</div>--> <label class=\"toggle toggle-balanced\" style=\"float: right\" ng-click=\"switchServer()\" ng-swipe-left=\"switchServer(false)\" ng-swipe-right=\"switchServer(true)\"> <input type=\"checkbox\" ng-model=\"isOfficeService\"> <div class=\"track\"> <div class=\"handle\"></div> </div> </label> <span class=\"label server_type\" ng-if=\"!isOfficeService\">正式坏境－关</span> <span class=\"label server_type\" ng-if=\"isOfficeService\">正式坏境－开</span> </div> <div class=\"delivery_version\">版本号:{{version}}</div> </div> </div> </div>"
  );


  $templateCache.put('views/Position.tpl.html',
    "<div class=\"position_container\" id=\"position_container\" ng-if=\"!isRealPhone\"> <footer class=\"d-f\"><a href=\"javascript:;\" ng-click=\"returnBack($event)\" class=\"btn hasRadius blue\" style=\"display: block;float: right\">返回</a></footer> <iframe ng-src=\"{{templateUrl}}\" style=\"width:100%;height:calc(100% - 52px);border:none\" frameborder=\"0\"> </div>"
  );


  $templateCache.put('views/changePassword.tpl.html',
    "<div class=\"login-userInterface\"><!--login-reg --> <header class=\"changePassword leftTab\">修改密码</header> <div class=\"transparent\" onclick=\"window.history.back()\" id=\"back\"></div> <!--\r" +
    "\n" +
    "  <div class=\"login_reg_tab\">\r" +
    "\n" +
    "    <p class=\"login_show\" id=\"login_title\" ng-click=\"vm.flag=false\">修改密码</p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p class=\"clear\"></p>\r" +
    "\n" +
    "  </div>--> <div class=\"login\" ng-show=\"!vm.flag\"> <div class=\"main\"> <form id=\"loginform\" name=\"loginform\" ng-submit=\"changePwd($event)\" novalidate> <div class=\"div1\"> <img src=\"img/user.png\" alt=\"\"> <input show=\"!vm.username\" type=\"text\" name=\"oldpassword\" id=\"oldpassword\" placeholder=\"请输入用户名\" ng-model=\"vm.username\" required> </div> <div class=\"div3\"> <img src=\"img/lock.png\" alt=\"\"> <input type=\"password\" name=\"oldpassword\" id=\"oldpassword\" placeholder=\"请输入旧密码\" ng-model=\"vm.oldPassword\" required> </div> <div class=\"div3\"> <img src=\"img/lock.png\" alt=\"\"> <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"请输入新密码\" required ng-model=\"vm.newPassword\"> </div> <div class=\"div2\"> <img src=\"img/lock-sure.png\" alt=\"\"> <input type=\"password\" name=\"repassword\" id=\"repassword\" placeholder=\"请确认新密码\" required ng-model=\"vm.reNewPassword\"> </div> </form> <div class=\"wrapper input-wrapper changePassword\"> <input type=\"submit\" id=\"modify_password\" form=\"loginform\" value=\"确认修改\" class=\"btn blue\"> <!--<input form=\"loginform\" type=\"submit\" id=\"modify_password\" value=\"保存\"/>\r" +
    "\n" +
    "        <input form=\"loginform\" onclick=\"window.history.back()\" type=\"reset\" id=\"back\" value=\"返回\"/>--> </div> </div> </div> </div>"
  );


  $templateCache.put('views/classifyList/backList.tpl.html',
    "<section class=\"d-m-info un delivery_list\" ng-if=\"status=='BACK'\"> <div class=\"{{delivery._dispateClass}}\">{{delivery._dispateText}}</div> <ul> <li> <text class=\"text_hint\">送餐时间：</text> <!--<div class=\"fa fa-clock-o\"></div>--> <span type=\"text\" class=\"delivery_dispdate2\" ng-bind=\"delivery.DISPDATE+' '+delivery.DISPTIME\"></span> </li> <li class=\"half_show\"> <text class=\"text_hint\">送餐人：</text> <span type=\"text\" ng-bind=\"delivery.RECEIVERNAME\"></span> </li> <li class=\"half_show\"> <text class=\"text_hint\">电话：</text> <a href=\"tel:{{delivery.RECEIVERMOBILE}}\" class=\"telephone\">{{delivery.RECEIVERMOBILE}}</a> </li> <li> <text class=\"text_hint\">商品份数：</text> <span type=\"text\" ng-bind=\"delivery.PRODUCTCOUNT>0?delivery.PRODUCTCOUNT:1+'份'\"></span> </li> <li> <text class=\"text_hint\">订单号：</text> <span type=\"text\" ng-bind=\"delivery.ID\"></span> </li> <li> <text class=\"text_hint\" ng-if=\"delivery.REJECT_REASON != 0\">拒签原因：</text> <span type=\"text\" ng-if=\"delivery.REJECT_REASON != 0\" ng-bind=\"config.reject_reason_no_white_space[delivery.REJECT_REASON - 1]\"></span> </li> <li> <text class=\"text_hint\">地&nbsp;&nbsp;&nbsp;&nbsp;址：</text> <span type=\"text\">{{delivery.COUNTYNAME?delivery.COUNTYNAME+' ':''}}{{delivery.ADDRESS}}</span> <!--<span type=\"text\">{{delivery.AREANAME}}&nbsp; {{delivery.BUILDINGNAME}}&nbsp; {{delivery.ADDRESS}}</span>--> </li> </ul> <div class=\"d-m-i-s\" ng-show=\"delivery.DISPSTATUS=='BACK' && !showPackageDetial\"> <!--<div class=\"div1\">--> <div class=\"nav-btn right\" ng-click=\"path($event,'/position/{{status}}_{{isSearch}}/{{delivery.ID}}')\"> <img class=\"img2\" src=\"img/ditu_2x.png\"> <span>地图</span> </div> <!--<a ng-href=\"#/position/{{status}}_{{isSearch}}/{{delivery.ID}}\">--> <!--<button class=\"btn_delivery blue hasRadius ngdialog-button-primary\" ng-click=\"baiduMapButton($event)\">--> <!--地&nbsp;&nbsp;图--> <!--</button>--> <!--</a>--> <!--</div>--> <!--<div class=\"div2\">--> <!--<button class=\"btn_delivery green hasRadius ngdialog-button-primary\" ng-click=\"gaporders($event,delivery.ID)\">--> <!--我&nbsp;来&nbsp;送--> <!--</button>--> <!--</div>--> </div> </section>"
  );


  $templateCache.put('views/classifyList/complateList.tpl.html',
    "<section class=\"d-m-info f delivery_list\" ng-if=\"status=='COMPLETE'\"> <div class=\"{{delivery._dispateClass}}\">{{delivery._dispateText}}</div> <ul> <li> <text class=\"text_hint\">送餐时间：</text> <!--<div class=\"fa fa-clock-o\"></div>--> <span type=\"text\" class=\"delivery_dispdate2\" ng-bind=\"delivery.DISPDATE+' '+delivery.DISPTIME\"></span> </li> <li class=\"half_show\"> <text class=\"text_hint\">送餐人：</text> <span type=\"text\" ng-bind=\"delivery.RECEIVERNAME\"></span> </li> <li class=\"half_show\"> <text class=\"text_hint\">电话：</text> <a href=\"tel:{{delivery.RECEIVERMOBILE}}\" class=\"telephone\">{{delivery.RECEIVERMOBILE}}</a> </li> <li> <text class=\"text_hint\">商品份数：</text> <span type=\"text\" ng-bind=\"delivery.PRODUCTCOUNT>0?delivery.PRODUCTCOUNT:1+ '份'\"></span> </li> <li> <text class=\"text_hint\">订单号：</text> <span type=\"text\" ng-bind=\"delivery.ID\"></span> </li> <li> <text class=\"text_hint\">送餐地址：</text> <span type=\"text\">{{delivery.COUNTYNAME?delivery.COUNTYNAME+' ':''}}{{delivery.ADDRESS}}</span> <!--<span type=\"text\">{{delivery.AREANAME}}&nbsp;{{delivery.BUILDINGNAME}}&nbsp; {{delivery.ADDRESS}}</span>--> </li> <li> <text class=\"text_hint\">配送时间：</text> <span type=\"text\" class=\"delivery_dispdate\" ng-bind=\"delivery.RECEIVEDTIME\"></span> </li>  </ul> <div class=\"d-m-i-s\" ng-show=\"!showPackageDetial\"> <!--<div class=\"div2\">--> <div class=\"nav-btn right\" ng-click=\"path($event,'/position/{{status}}_{{isSearch}}/{{delivery.ID}}')\"> <img class=\"img2\" src=\"img/ditu_2x.png\"> <span>地图</span> </div> <!--</div>--> <!--<a ng-href=\"#/position/{{status}}_{{isSearch}}/{{delivery.ID}}\">--> <!--<button class=\"btn_delivery blue hasRadius ngdialog-button-primary\"  ng-click=\"baiduMapButton($event)\">--> <!--地&nbsp;&nbsp;图--> <!--</button>--> <!--</a>--> </div> </section>"
  );


  $templateCache.put('views/classifyList/distributedList.tpl.html',
    "<section class=\"d-m-info delivery_list\" ng-if=\"status=='DISTRIBUTED'\"> <div class=\"{{delivery._dispateClass}}\">{{delivery._dispateText}}</div> <ul> <li ng-class=\"{over_time : delivery.URGENCY == 'LATED',warnning_time : delivery.URGENCY == 'URGENT'}\"> <text class=\"text_hint\">取餐时间：</text> <!--<div class=\"fa fa-clock-o\"></div>--> <span type=\"text\" class=\"delivery_dispdate2\" ng-bind=\"delivery.DISPDATE+' '+delivery.DISPTIME\"></span> </li> <li class=\"half_show\"> <text class=\"text_hint\">取餐人：</text> <span type=\"text\" ng-bind=\"delivery.RECEIVERNAME\"></span> </li> <li class=\"half_show\"> <text class=\"text_hint\">电话：</text> <a href=\"tel:{{delivery.RECEIVERMOBILE}}\">{{delivery.RECEIVERMOBILE}}</a> </li> <li> <text class=\"text_hint\">商品份数：</text> <span type=\"text\" ng-bind=\"delivery.PRODUCTCOUNT>0?delivery.PRODUCTCOUNT:1+ '份'\"></span> </li> <li> <text class=\"text_hint\">订单号：</text> <span type=\"text\" ng-bind=\"delivery.ID\"></span> </li> <li> <text class=\"text_hint\">取餐地址：</text> <span type=\"text\">{{delivery.COUNTYNAME?delivery.COUNTYNAME+' ':''}}{{delivery.ADDRESS}}</span> <!--<span type=\"text\">{{delivery.AREANAME}}&nbsp; {{delivery.BUILDINGNAME}}&nbsp; {{delivery.ADDRESS}}</span>--> </li> </ul> <div class=\"d-m-i-s\" ng-if=\"delivery.DISPSTATUS == 'DISPATCHING'  && !showPackageDetial\"> <div class=\"nav-btn right\" ng-click=\"exception_reject($event,identyfy,delivery.ID)\"> <img class=\"img2\" src=\"img/icon_juqian@2x.png\"> <span>拒签</span> </div> <div class=\"nav-btn right\" ng-click=\"exception_delay($event,identyfy,delivery.ID,delivery)\"> <img class=\"img2\" src=\"img/yanqi-icon@2x.png\"> <span>延期</span> </div> <div class=\"nav-btn right\" ng-click=\"ideatify($event,identyfy,delivery.ID)\"> <img class=\"img2\" src=\"img/quhuo@2x.png\"> <span>确认</span> </div> <div class=\"nav-btn right\" ng-click=\"path($event,'/position/{{status}}_{{isSearch}}/{{delivery.ID}}')\"> <img class=\"img2\" src=\"img/ditu_2x.png\"> <span>地图</span> </div> </div> <div class=\"d-m-i-s\" ng-if=\"(delivery.DISPSTATUS == 'INITIAL' || delivery.DISPSTATUS == 'DISTRIBUTED' ) && !showPackageDetial\"> <div class=\"nav-btn right\" ng-click=\"claimGoods($event,identyfy,delivery.ID)\"> <img class=\"img2\" src=\"img/shouhuo--icon@2x.png\"> <span>取货</span> </div> </div> </section>"
  );


  $templateCache.put('views/classifyList/initialList.tpl.html',
    "<section class=\"d-m-info un delivery_list\" ng-if=\"status=='INITIAL'\"> <div class=\"{{delivery._dispateClass}}\">{{delivery._dispateText}}</div> <ul> <li> <text class=\"text_hint\">送餐时间：</text> <!--<div class=\"fa fa-clock-o\"></div>--> <span type=\"text\" class=\"delivery_dispdate2\" ng-bind=\"delivery.DISPDATE+' '+delivery.DISPTIME\"></span> </li> <li class=\"half_show\"> <text class=\"text_hint\">送餐人：</text> <span type=\"text\" ng-bind=\"delivery.RECEIVERNAME\"></span> </li> <li class=\"half_show\"> <text class=\"text_hint\">电话：</text> <a href=\"tel:{{delivery.RECEIVERMOBILE}}\" class=\"telephone\">{{delivery.RECEIVERMOBILE}}</a> </li> <li> <text class=\"text_hint\">商品份数：</text> <span type=\"text\" ng-bind=\"delivery.PRODUCTCOUNT>0?delivery.PRODUCTCOUNT:1 + '份'\"></span> </li> <li> <text class=\"text_hint\">订单号：</text> <span type=\"text\" ng-bind=\"delivery.ID\"></span> </li> <li> <text class=\"text_hint\">送餐地址：</text> <span type=\"text\">{{delivery.COUNTYNAME?delivery.COUNTYNAME+' ':''}}{{delivery.ADDRESS}}</span> <!--<span type=\"text\">{{delivery.AREANAME}}&nbsp; {{delivery.BUILDINGNAME}}&nbsp; {{delivery.ADDRESS}}</span>--> </li> </ul> <div class=\"d-m-i-s\" ng-show=\"delivery.DISPSTATUS=='INITIAL'  && !showPackageDetial\"> <div class=\"nav-btn right\" ng-click=\"path($event,'/position/{{status}}_{{isSearch}}/{{delivery.ID}}')\"> <img class=\"img2\" src=\"img/ditu_2x.png\"> <span>地图</span> </div> <!--<a ng-href=\"#/position/{{status}}_{{isSearch}}/{{delivery.ID}}\">--> <!--<button class=\"btn_delivery blue hasRadius ngdialog-button-primary\" ng-click=\"baiduMapButton($event)\">--> <!--地&nbsp;&nbsp;图--> <!--</button>--> <!--</a>--> <div class=\"nav-btn right\" ng-click=\"gaporders($event,delivery.ID)\"> <img class=\"img2\" src=\"img/qiangdan@2x.png\"> <span>抢单</span> </div> <!--<button class=\"btn_delivery green hasRadius ngdialog-button-primary\" ng-click=\"gaporders($event,delivery.ID)\">--> <!--抢单--> <!--</button>--> </div> </section>"
  );


  $templateCache.put('views/dialDialog.tpl.html',
    "<style>.dial-title{\n" +
    "    font-size: 14px;\n" +
    "    margin-top:-.4em;\n" +
    "    text-align: center;\n" +
    "  }\n" +
    "  .dial-list{\n" +
    "    margin-top:1em;\n" +
    "  }\n" +
    "  .dial-list > .dial-item{\n" +
    "    display: block;\n" +
    "    padding: 8px 12px;\n" +
    "    text-align: center;\n" +
    "  }\n" +
    "  .dial-list > .dial-item:active{\n" +
    "    background-color: rgba(0,0,0,.05);\n" +
    "  }\n" +
    "  .dial-list > .dial-item:not(:last-child){\n" +
    "    border-bottom: 1px solid #e0e0e0;\n" +
    "  }\n" +
    "  .dial-buttons{\n" +
    "    -webkit-justify-content: center;\n" +
    "    justify-content: center;\n" +
    "  }</style> <div class=\"ngdialog-message\"> <h4 class=\"dial-title\">请选择拨打对象</h4> <div class=\"dial-list\"> <a ng-repeat=\"item in ngDialogData.list\" ng-href=\"{{'tel:'+item.tel}}\" class=\"dial-item\"> {{item.name}}: {{item.tel}} </a> </div> </div> <div class=\"ngdialog-buttons flex dial-buttons\"> <button type=\"button\" id=\"alertModel-buttons\" class=\"ngdialog-button\" ng-click=\"confirm()\"> {{ngDialogData.buttonText||'取消'}} </button> </div>"
  );


  $templateCache.put('views/directives/DeliveryList.tpl.html',
    "<div id=\"d-m\" class=\"d-m\"> <!--<div class=\"d-m\" style=\"height: 100%;overflow: scroll\" drag-fresh>--> <!-- 已配送 --> <div class=\"d-m\" ng-show=\"status=='COMPLETE'\"> <ion-content class=\"has-footer has-header\"> <ion-refresher on-refresh=\"doRefresh()\" pulling-text=\"下拉刷新!!\" refreshing-text=\"刷新中...\" refreshing-icon=\"ion-loading-b\"></ion-refresher> <div ng-include=\"'views/classifyList/complateList.tpl.html'\" ng-click=\"showPackageDetialFunc(delivery)\" ng-repeat=\"delivery in DeliveryListFinsh | orderBy:DISPTIME:false\" ng-if=\"!isSearch && DeliveryListFinsh.length\"></div> <div ng-include=\"'views/classifyList/complateList.tpl.html'\" ng-click=\"showPackageDetialFunc(delivery)\" ng-repeat=\"delivery in DeliveryListSearched | orderBy:DISPTIME:false\" ng-if=\"isSearch && DeliveryListSearched.length\"></div> <div class=\"no_content_hint no_content_hint_complate\" ng-if=\"!isSearch && DeliveryListFinsh.length == 0 && !hasPage\">“暂时没有配送成功状态的配送单”</div> <div class=\"no_content_hint no_content_hint_complate\" ng-if=\"isSearch && DeliveryListSearched.length == 0 && searchTime\">“没有搜索到配送成功状态的配送单”</div> <ion-infinite-scroll ng-if=\"hasPage && status=='COMPLETE' && !isSearch\" on-infinite=\"loadMore()\" distance=\"1%\"></ion-infinite-scroll> </ion-content> </div> <!-- 待配送 --> <div class=\"d-m\" ng-show=\"status=='DISTRIBUTED'\"> <ion-content class=\"has-footer has-header\"> <ion-refresher on-refresh=\"doRefresh()\" pulling-text=\"下拉刷新!!\" refreshing-text=\"刷新中...\" refreshing-icon=\"ion-loading-b\"></ion-refresher> <div ng-include=\"'views/classifyList/distributedList.tpl.html'\" ng-click=\"showPackageDetialFunc(delivery)\" ng-repeat=\"delivery in DeliveryListDisp | orderBy:DISPTIME:false\" ng-if=\"!isSearch && DeliveryListDisp.length\"></div> <div ng-include=\"'views/classifyList/distributedList.tpl.html'\" ng-click=\"showPackageDetialFunc(delivery)\" ng-repeat=\"delivery in DeliveryListSearched | orderBy:DISPTIME:false\" ng-if=\"isSearch && DeliveryListSearched.length\"></div> <div class=\"no_content_hint no_content_hint_complate\" ng-if=\"!isSearch && DeliveryListDisp.length == 0 && !hasPage\">“暂时没有等待配送状态的配送单”</div> <div class=\"no_content_hint no_content_hint_complate\" ng-if=\"isSearch && DeliveryListSearched.length == 0 && searchTime\">”没有搜索到等待配送状态的配送单“</div> <ion-infinite-scroll ng-if=\"hasPage && status=='DISTRIBUTED'&&!isSearch\" on-infinite=\"loadMore()\" distance=\"1%\"></ion-infinite-scroll> </ion-content></div> <!-- 抢单 --> <div class=\"d-m\" ng-show=\"status=='INITIAL'\"> <ion-content class=\"has-footer has-header\"> <ion-refresher on-refresh=\"doRefresh()\" pulling-text=\"下拉刷新!!\" refreshing-text=\"刷新中...\" refreshing-icon=\"ion-loading-b\"></ion-refresher> <div ng-include=\"'views/classifyList/initialList.tpl.html'\" ng-click=\"showPackageDetialFunc(delivery)\" ng-repeat=\"delivery in DeliveryListUnDisp | orderBy:DISPDATE:true\" ng-if=\"!isSearch && DeliveryListUnDisp.length\"></div> <div ng-include=\"'views/classifyList/initialList.tpl.html'\" ng-click=\"showPackageDetialFunc(delivery)\" ng-repeat=\"delivery in DeliveryListSearched | orderBy:DISPDATE:true\" ng-if=\"isSearch && DeliveryListSearched.length\"></div> <div class=\"no_content_hint no_content_hint_complate\" ng-if=\"!isSearch && DeliveryListUnDisp.length == 0 && !hasPage\">“暂时没有可以抢单的配送单”</div> <div class=\"no_content_hint no_content_hint_complate\" ng-if=\"isSearch && DeliveryListSearched.length == 0 && searchTime\">”没有搜索到可以抢单的配送单“</div> <ion-infinite-scroll ng-if=\"hasPage && status=='INITIAL' && !isSearch\" on-infinite=\"loadMore()\" distance=\"1%\"></ion-infinite-scroll> </ion-content></div> <!-- 异常数据 --> <div class=\"d-m\" ng-show=\"status=='BACK'\"> <ion-content class=\"has-footer has-header\"> <ion-refresher on-refresh=\"doRefresh()\" pulling-text=\"下拉刷新!!\" refreshing-text=\"刷新中...\" refreshing-icon=\"ion-loading-b\"></ion-refresher> <div ng-include=\"'views/classifyList/backList.tpl.html'\" ng-click=\"showPackageDetialFunc(delivery)\" ng-repeat=\"delivery in DeliveryListException | orderBy:DISPDATE:true\" ng-if=\"!isSearch && DeliveryListException.length\"></div> <div ng-include=\"'views/classifyList/backList.tpl.html'\" ng-click=\"showPackageDetialFunc(delivery)\" ng-repeat=\"delivery in DeliveryListSearched | orderBy:DISPDATE:true\" ng-if=\"isSearch && DeliveryListSearched.length\"></div> <div class=\"no_content_hint no_content_hint_complate\" ng-if=\"!isSearch && DeliveryListException.length == 0 && !hasPage\">“暂时没有无法配送或者被取消状态的配送单”</div> <div class=\"no_content_hint no_content_hint_complate\" ng-if=\"isSearch && DeliveryListSearched.length == 0 && searchTime\">”没有搜索到无法配送或者被取消状态的配送单“</div> <ion-infinite-scroll ng-if=\"hasPage && status=='BACK'&&!isSearch\" on-infinite=\"loadMore()\" distance=\"1%\"></ion-infinite-scroll> </ion-content></div> </div>"
  );


  $templateCache.put('views/directives/dragFresh.html',
    "<div class=\"m-dragFresh-rotate\" ng-show=\"rotateUnit.show\" ng-style=\"{ '-webkit-transform' : 'translate(0px,{{rotateUnit.translate}}px) rotate({{rotateUnit.rotate}}deg)' }\"> <img src=\"images/loading.3a19d385.gif\"> </div>"
  );


  $templateCache.put('views/login.html',
    "<div class=\"page lg-page\"> <div class=\"lg-banner\"> </div> </div>"
  );


  $templateCache.put('views/login.tpl.html',
    "<div class=\"login-userInterface\"> <header class=\"title-name\">登录</header> <div class=\"brand\"> <img ng-if=\"vm.login_title.indexOf('原麦')>0\" src=\"img/withWheat.png\" alt=\"\" class=\"b-background\"> <img ng-if=\"vm.login_title.indexOf('JoySeed')>0\" src=\"img/joyseed-bg-img.png\" alt=\"\" class=\"b-background\"> <div class=\"brand-center\"> <img ng-if=\"vm.login_title.indexOf('原麦')>0\" src=\"img/wheat-logo.png\" alt=\"\" class=\"wheat-logo\"> <img ng-if=\"vm.login_title.indexOf('JoySeed')>0\" src=\"img/joyseed-logo.png\" alt=\"\" class=\"wheat-logo\"> <br> <span class=\"brand-name\">{{vm.login_title}}</span> </div> </div> <div class=\"main-body\"> <div class=\"entry\"> <form id=\"loginform\" name=\"loginform\" ng-submit=\"login($event)\" novalidate> <div class=\"phoneNum\"> <img src=\"img/mobilePhone.png\" alt=\"\"> <input type=\"text\" name=\"username\" id=\"username\" placeholder=\"请输入您的用户名\" ng-model=\"vm.username\" required> </div> <div class=\"password\"> <img src=\"img/lock.png\" alt=\"\"> <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"请输入您的密码\" ng-model=\"vm.password\" required> </div> </form> <div class=\"modify\"><a href=\"#/changePassword\">修改密码</a></div> </div> <input type=\"submit\" class=\"btn blue\" id=\"login_button\" form=\"loginform\" value=\"登录\"> <button class=\"btn white\" id=\"change_button\" ng-click=\"changeServer()\">切换</button> <div class=\"switch server_type\"> <label class=\"toggle toggle-balanced\" style=\"float: right\" ng-click=\"switchServer()\" ng-swipe-left=\"switchServer(false)\" ng-swipe-right=\"switchServer(true)\"> <input type=\"checkbox\" ng-model=\"isOfficeService\"> <div class=\"track\"> <div class=\"handle\"></div> </div> </label> <span class=\"label server_type\" ng-if=\"!isOfficeService\">正式环境－关</span> <span class=\"label server_type\" ng-if=\"isOfficeService\">正式环境－开</span> </div> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"header\"> <ul class=\"nav nav-pills pull-right\"> <li class=\"active\"><a ng-href=\"#\">Home</a></li> <li><a ng-href=\"#\">About</a></li> <li><a ng-href=\"#\">Contact</a></li> </ul> <h3 class=\"text-muted\">DeliveryUI</h3> </div> <div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.c582c4d1.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#\">Splendid!</a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div> <div class=\"footer\"> <p>♥ from the Yeoman team</p> </div>"
  );


  $templateCache.put('views/navigator.tpl.html',
    "<div class=\"usercenter\"> <div class=\"u-u-info\"> <dl> <dt><img class=\"usercenter_head\" width=\"100\" height=\"100\"></dt> <dd>{{vm.userObj.MOBILE}}</dd> <dd> {{userInfo.username}} <!-- <button ng-click=\"rechargeBtnClickHandler($event)\" class=\"mainBackgruond\">充值</button>--> </dd> </dl> </div> <div class=\"clear\"></div> <div class=\"u-fe-back\"> <ul> <li class=\"u-feedback\"><a ng-click=\"gotoDeliverUndisp()\"><i class=\"fa fa-bars fa-lg mainColor space\"></i>&nbsp;&nbsp;待配订单</a></li> <li class=\"u-feedback\"><a ng-href=\"#/changePassword\"><i class=\"fa fa-eraser fa-lg mainColor space\"></i>&nbsp;&nbsp;修改密码</a></li> <li class=\"u-feedback\" ng-if=\"isRNApp()\"><a ng-click=\"checkUpdate()\"><i class=\"fa fa-cloud-download fa-lg mainColor space\"></i>&nbsp;&nbsp;检查更新</a></li> <!--<li class=\"u-phone\"><a href=\"tel:400-992-6632\"><i class=\"fa fa-phone fa-lg mainColor space\"></i>&nbsp;&nbsp;客服电话： 400-992-6632</a></li>--> <li class=\"u-feedback\"><a ng-click=\"exitLogin()\"><i class=\"fa fa-close fa-lg mainColor space\"></i>&nbsp;&nbsp;退出登录</a></li> <!--<li class=\"u-issue\"><a href=\"#\">常见问题</a></li>--> <!--<li class=\"u-give\"><a ng-click=\"gotoReward()\"><i class=\"fa fa-money  fa-lg mainColor space\"></i>打赏</a></li>--> <!-- <li class=\"u-give\"><a ng-click=\"gotoCoupon()\"><i class=\"fa fa-money  fa-lg mainColor space\"></i>红包</a></li>--> </ul> </div> </div>"
  );


  $templateCache.put('views/packageDetail.tpl.html',
    "<style>.package-wrapper{\n" +
    "    /*height: 100%;\n" +
    "    width: 100%;\n" +
    "    position: fixed;\n" +
    "    top: 0;\n" +
    "    overflow-x:hidden;\n" +
    "    overflow-y: auto;\n" +
    "    z-index: 1000;*/\n" +
    "    background: white;\n" +
    "    height: 100%;\n" +
    "    padding: 0;\n" +
    "    -webkit-flex-direction: column;\n" +
    "    flex-direction: column;\n" +
    "  }\n" +
    "\n" +
    "  .order-info-wrapper{\n" +
    "    flex: 1;\n" +
    "    padding-top: 45px;\n" +
    "    padding-bottom: 25px;\n" +
    "    height: 100%;\n" +
    "    overflow-x: hidden;\n" +
    "    overflow-y: auto;\n" +
    "  }\n" +
    "\n" +
    "  .title.package-title.order-info{\n" +
    "    height: 45px;\n" +
    "    font-size: 16px;\n" +
    "    background: #f0f0f0;\n" +
    "  }\n" +
    "\n" +
    "  .order-page-title{\n" +
    "    position: fixed;\n" +
    "    left:0;\n" +
    "    top:0;\n" +
    "    right:0;\n" +
    "  }\n" +
    "\n" +
    "  .block.package-block{\n" +
    "    padding: 10px 15px;\n" +
    "    color: #666;\n" +
    "  }\n" +
    "\n" +
    "  .l-title{\n" +
    "    -webkit-box-flex: 0.25;\n" +
    "    -webkit-flex: 0.25;\n" +
    "    flex: 0.25;\n" +
    "  }\n" +
    "\n" +
    "  .l-value{\n" +
    "    -webkit-box-flex: 0.75;\n" +
    "    -webkit-flex: 0.75;\n" +
    "    flex: 0.75;\n" +
    "  }\n" +
    "\n" +
    "  .package-center-wrappe{\n" +
    "    padding-left: 15px;\n" +
    "    padding-right: 15px;\n" +
    "  }\n" +
    "\n" +
    "  .button.packageDetail-button{\n" +
    "    width: 100%;\n" +
    "    height: 50px;\n" +
    "    line-height: 50px;\n" +
    "    border:0;\n" +
    "  }\n" +
    "  .back-arrow-left{\n" +
    "    display: inline-block;\n" +
    "    width: 14px;\n" +
    "    height: 14px;\n" +
    "    border-style: solid;\n" +
    "    border-color: #bbb transparent transparent #bbb;\n" +
    "    border-width: 2px;\n" +
    "    -webkit-transform: rotate(-45deg);\n" +
    "    transform: rotate(-45deg);\n" +
    "  }\n" +
    "  .ngdialog-content{\n" +
    "    width:70% !important;\n" +
    "  }</style> <div class=\"wrapper package-wrapper flex\"> <h4 class=\"title package-title order-info order-page-title flex flex-vcenter\" ng-click=\"path('/main');\"> <span class=\"back-arrow-left\"></span> 订单信息 </h4> <div class=\"order-info-wrapper\"> <section class=\"section package-section order-info\"> <div class=\"block package-block order-info flex flex-vcenter\"> <span class=\"l-title\">订单号</span> <span class=\"l-value\">{{currPackage.ID}}</span> </div> <div class=\"block package-block order-info flex flex-vcenter\"> <span class=\"l-title\">配送状态</span> <span class=\"l-value\">{{currPackage.__DISPSTATUS__Option__}}</span> </div> <div class=\"block package-block order-info flex flex-vcenter\"> <span class=\"l-title\">收货人</span> <span class=\"l-value\">{{currPackage.RECEIVERNAME}}</span> </div> <div class=\"block package-block order-info flex flex-vcenter\"> <span class=\"l-title\">收货地址</span> <span class=\"l-value\">{{currPackage.COUNTYNAME?currPackage.COUNTYNAME+' ':''}}{{currPackage.ADDRESS}}</span> </div> <div class=\"block package-block order-info flex flex-vcenter\"> <span class=\"l-title\">收货人电话</span> <span class=\"l-value\">{{currPackage.RECEIVERMOBILE}}</span> </div> <h3 class=\"title package-title order-info flex flex-vcenter\">配送信息</h3> <div class=\"block package-block order-info flex flex-vcenter\"> <span class=\"l-title\">配送时间</span> <span class=\"l-value\">{{currPackage.DISPDATE+' '+currPackage.DISPTIME}}</span> </div> <div class=\"block package-block order-info flex flex-vcenter\" ng-if=\"currPackage.DELAY_REASON\"> <span class=\"l-title\">延期原因</span> <span class=\"l-value\">{{currPackage.DELAY_REASON}}</span> </div> <div class=\"block package-block order-info flex flex-vcenter\" ng-if=\"currPackage.OLDDISPTIME\"> <span class=\"l-title\">延期前</span> <span class=\"l-value\">{{currPackage.DISPDATE+' '+currPackage.OLDDISPTIME}}</span> </div> </section> <h3 class=\"title package-title order-info flex flex-vcenter\">商品详情</h3> <section class=\"section package-section order-info\" ng-repeat=\"detail in currPackage.ORDERDTLS\"> <div class=\"block package-block order-info flex flex-vcenter\"> <span class=\"l-title\">{{detail.MEALNAME}}</span> <span class=\"l-value\" style=\"text-align: right\">{{detail.MEALCOUNT}}份</span> </div> </section> <h3 class=\"title package-title order-info flex flex-vcenter\">客服备注</h3> <section class=\"section package-section contact-info\"> <div class=\"block package-block order-info flex flex-vcenter\"> xxx </div> </section> <div class=\"wrapper center-wrapper package-center-wrappe call\"> <!--<a class=\"button packageDetail-button call\" ng-href=\"{{'tel:'+currPackage.RECEIVERMOBILE}}\">拨打电话</a>--> <a class=\"button packageDetail-button call\" ng-click=\"selectDial(currPackage)\">拨打电话</a> </div> </div> </div>"
  );


  $templateCache.put('views/postpone_reason.html',
    "<div style=\"overflow: hidden\"> <div class=\"reject_left\"> <lebal>请选择延期理由:</lebal> <ul class=\"list\"> <li class=\"item\" ng-repeat=\"reason in reasons\" ng-bind=\"reason.REASON\" ng-click=\"choiseReason($event,reason.REASON);closeThisDialog()\"></li> </ul> <!--<select ng-model=\"reject_reason\" value=\"1\">--> <!--<option value=\"1\">{{config.reject_reason[0]}}</option>--> <!--<option value=\"2\">{{config.reject_reason[1]}}</option>--> <!--<option value=\"3\">{{config.reject_reason[2]}}</option>--> <!--</select>--> </div> <!--<div class=\"reject_right\">--> <!--<button class=\"btn_delivery2 blue hasRadius ngdialog-button-primary\" ng-click=\"delivery_reject() ; closeThisDialog()\">确&nbsp;&nbsp;定</button> <br/>--> <!--</div>--> <label class=\"font_red\">{{reject_warning}}</label> </div>"
  );

}]);
