import Vue from 'vue'
// import store from './store/index'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  // store,
  ...App
})
app.$mount()

export default {
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，
    // 其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/index',                           // 首页
      'pages/detail/detail',                          //详情页
      'pages/center/center',                          //我的
      'pages/order/order',                            //订单列表
      'pages/my-order/my-order',                      //订单列表
      'pages/apply/apply',                            //申请入住
      'pages/message/message',                        //个人信息
      'pages/login/login'                             //个人信息
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      position: 'bottom',
      color: '#AEAEBD',
      selectedColor: '#303135',
      backgroundColor: '#FFFFFF',
      borderStyle: '#E1E1E6',
      list: [{
        text: '首页',
        pagePath: 'pages/index/index',
        iconPath: '/static/image/index/home.png',
        selectedIconPath: '/static/image/index/home-select.png'
      },{
        text: '订单',
        pagePath: 'pages/order/order',
        iconPath: '/static/image/index/order.png',
        selectedIconPath: '/static/image/index/order-select.png'
      },{
        text: '我的',
        pagePath: 'pages/center/center',
        iconPath: '/static/image/detail/account.png',
        selectedIconPath: '/static/image/index/me-select.png'
      }]
    }
  }
}
