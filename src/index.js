/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  WebView,
  Modal,
  TouchableOpacity,
  BackHandler,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  AppRegistry
} from 'react-native';

import codePush from 'react-native-code-push';
import {QRScannerView} from './components/qrscanner';

const DEFAULT_STATUS_BLUE = {
  barStyle: 'light-content',
  backgroundColor: '#00aef1'
};

const DEFAULT_STATUS_GRAY = {
  barStyle: 'light-content',
  backgroundColor: '#777'
};

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

const isAndroid =  Platform.OS === 'android';

let lastClickTime = 0;

const injectedJavaScript = () => {
  return 'window.__APP_ENV__ = "react-native";\n' +
    '(function(w){\n' +
    '   var originPostMsg = w.postMessage;\n' +
    '   w.postMessage = function() {\n' +
    '     if (!!w.originalPostMessage) {\n' +
    '       originPostMsg.apply(w, arguments);\n' +
    '     } else {\n' +
    '       throw \'postMessage接口还未注入\';\n' +
    '     }\n' +
    '   }\n' +
    '})(window);';
};

export default class TMS extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      animating: false,
      canGoBack: false,
      canGoForward: false,
      url: ""
    };
    this.webview = null;
    this._backHandler = this._backHandler.bind(this);
  }
  componentWillMount(){
    this.changeStatusBar(DEFAULT_STATUS_BLUE);
  }
  componentDidMount() {
    if(isAndroid) {
      BackHandler.addEventListener("webHardwareBackPress", this._backHandler);
    }
  }
  componentWillUnmount() {
    if(isAndroid) {
      BackHandler.removeEventListener("webHardwareBackPress", this._backHandler);
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    let {modalVisible, animating} = this.state;
    if(modalVisible !== nextState.modalVisible || animating !== nextState.animating){
      return true;
    } else {
      return false;
    }
  }
  _backHandler(){
    try {
      if (this.state.canGoBack) {
        if(this.state.url.indexOf("#/main") > -1){
          return this.exitApp();
        }
        this.webview.goBack();//返回上一个页面
        return true;//true 系统不再处理 false交给系统处理
      }
    } catch (error) {
      return this.exitApp();
    }
    return this.exitApp();
  }
  exitApp(){
    let now = Date.now();
    if (now - lastClickTime < 2500 ){
      return false;
    }
    lastClickTime = now ;
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  }
  changeStatusBar(payload){
    if(payload.barStyle){
      StatusBar.setBarStyle(payload.barStyle);
    }
    if(payload.backgroundColor){
      StatusBar.setBackgroundColor(payload.backgroundColor);
    }
  }
  handleMessage(e){
    let data = e.nativeEvent.data;
    if(data) {
      data = JSON.parse(data);
      if (data.action === 'changeStatusBar') {
        if(data.payload.theme){
          if(data.payload.theme === 'blue'){
            this.changeStatusBar(DEFAULT_STATUS_BLUE);
          }
          else if(data.payload.theme === 'gray'){
            this.changeStatusBar(DEFAULT_STATUS_GRAY);
          }
        }
        else {
          this.changeStatusBar(data.payload);
        }
      }
      else if(data.action === 'qrscan'){
        this.setModalVisible(true);
      }
      else if(data.action === 'checkUpdate'){
        this.updateApp();
      }
    }
  }
  barcodeReceived(e){
    this.setModalVisible(false);
    if(this.webview) {
      this.webview.postMessage(JSON.stringify({
        action: "qrcodeReceive",
        payload: e.data
      }));
    }
  }
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      url: navState.url
    });
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  updateApp() {
    this.setState({
      animating: true
    });
    const onSyncStatusChange = (syncStatus) => {
      if (syncStatus !== 5) {
        this.updateEnd();
      }
      switch (syncStatus) {
        case 0: Alert.alert(null, '已是最新版本'); break;
        case 3: Alert.alert(null, '更新发生错误'); break;
        default: break;
      }
    };
    const onError = (error) => {
      this.updateEnd();
      Alert.alert(null, `发生错误: ${error}`);
    };
    codePush.sync({
      updateDialog: {
        updateTitle: '检测有更新',
        optionalUpdateMessage: '有新版本，是否安装？',
        optionalIgnoreButtonLabel: '取消',
        optionalInstallButtonLabel: '安装',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    }, onSyncStatusChange, null, onError);
  }
  updateEnd(){
    this.setState({
      animating: false
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={w => this.webview = w}
          style={styles.webview}
          source={{uri:'file:///android_asset/www/index.html'}}
          injectedJavaScript={injectedJavaScript()}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onMessage={this.handleMessage.bind(this)}
          /*onError={alert("app加载失败，请重新打开试试!")}*/
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <QRScannerView
            onBarCodeRead={this.barcodeReceived.bind(this)}
            renderTopBarView={() => function () {}}
            renderBottomMenuView={() => function () {}}
            hintText="请将发票左上角的二维码放入框内即可自动扫描"
            hintTextPosition={80}
            style={{flex: 1}}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backIcon}
            onPress={this.setModalVisible.bind(this, false)}
          >
            <Image style={{width: 40, height: 40}} source={require('./images/back.png')}/>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.animating}
          onRequestClose={this.updateEnd.bind(this)}
        >
          <View style={styles.updating}>
            <ActivityIndicator animating={true} size="large" />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview:{
    flex: 1
  },
  backIcon: {
    position: "absolute",
    left: 15,
    top: 15
  },
  updating: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('TMS', () => codePush(codePushOptions)(TMS));