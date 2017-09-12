//=============================== URLObj ===============================//
var URLObj={};
URLObj.Config = {
  server_type : localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).server_type||'official':'official',//或者test,是否为正式环境
  registerURLs:{
    official : [
      {name:'JoySeed正式',host:'https://www.joyseed.com/zaofans'},
      {name:'原麦正式',host:'http://wx.withwheat.com/zaofans'}
      //{name:'下午茶正式',host:'http://tea.zaofans.com/zaofans'},
    ],
    test : [
      //{name:'刘星',host: 'http://192.168.46.81:8081/zaofans_trunk'},
      {name:'JoySeed测试',host:'http://it.zaofans.com:8070/zaofans_joyseed'},
      {name:'原麦测试',host:'http://it.zaofans.com:8070/zaofans_wheat'}
      //{name:'下午茶测试',host:'http://it.zaofans.com:8070/zaofans_tea'}
    ]
  }
    ,
  getDescription: function () {
    return this.urlName;
  },
  switch : function(){
    if(this.server_type == 'official'){
      this.server_type = 'test';
    }else{
      this.server_type = 'official';
    }
    this.reset();
    return this.isOfficialServer();
  },
  isOfficialServer : function(){
    return this.server_type == 'official';
  },
  reset: function () {
    if (typeof this.urlIndex == 'undefined') {
      this.urlIndex = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).urlIndex||0:0;
      this.urlIndexMax = this.registerURLs[this.server_type].length;
    }
    var url = this.registerURLs[this.server_type][this.urlIndex];
    var urlName = this.urlName = url.name;
    var urlHost = this.urlHost = url.host;
    this.urls = {
      //getUser: urlHost + '/usercenter/user/info',
      getDeliveryList: urlHost + '/tms/app/getDeliverymanOrders/',
      searchDeliveryList: urlHost + '/tms/app/getMatchedDeliverymanOrders/',
      getInitialOrders: urlHost + '/tms/app/getInitialOrders',
      searchInitialList: urlHost + '/tms/app/getMatchedInitialOrders',
      identityURL: urlHost + '/tms/app/verifyCheckCode',
      gapOrderURL: urlHost + '/tms/app/grapOrders',
      getPostponeReason : urlHost + '/tms/app/reject/reason',
      login: urlHost + '/tms/app/login',
      changePwd : urlHost + '/tms/app/modifyPassword',
      rejectURL : urlHost + '/tms/app/rejectOrder',
      delayURL : urlHost + '/tms/app/delayOrder',
      claimGoods : urlHost + '/tms/app/claimGoods',
      stationUseStart : urlHost + '/tms/app/setStationUseStart',
      stationUseEnd : urlHost + '/tms/app/setStationUseEnd',
      tmsURL: urlHost + '/tms.do'
    };

    var user = JSON.parse(localStorage.getItem('user')) || {};
    user.urlIndex = this.urlIndex;
    user.server_type = this.server_type;
    localStorage.setItem('user',JSON.stringify(user));
    return this.getDescription();
  },
  changeServer: function () {
  	if (this.urlIndex<this.urlIndexMax) {
  		this.urlIndex++;
      this.urlIndex = this.urlIndex%this.urlIndexMax;
  	} else {
  		this.urlIndex = 0;
  	}
    this.reset();
  },
  init: function () {
    this.reset();
  },
  version: 1.2910
};
URLObj.Config.init();
//=============================== Zaofans ===============================//
// namespace
if (typeof Zaofans == 'undefined')
  Zaofans = {};
Zaofans.Mobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) ? true : false;
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
  }
};
Zaofans.Config = {
  isRealPhone: false // Zaofans.Mobile.Android()||Zaofans.Mobile.iOS()
};
// onDeviceReady
function onDeviceReady() {
  console.log('onDeviceReady');
  Zaofans.Config.isRealPhone = true;
  Zaofans.Plugin = {};
}
// addEventListener
document.addEventListener("deviceready", onDeviceReady, false); // native inited
