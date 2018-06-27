<!-- 个人中心 -->
<template>
  <div class="container">
    <div class="center-header">
      <image src="/static/image/center/bac.jpg" class="bac-img"></image>
       <div class="center-header-img">
         <div class="user-img">
           <open-data type="userAvatarUrl" style="border-radius:100%;"></open-data>
         </div>
         <open-data type="userNickName" class="header-name"></open-data>
       </div>
    </div>
    <div class="center-container">
       <div class="center-content">
         <div class="center-option" @click="orderPage">
           <image src="/static/image/center/order.png" mode="widthFix" class="center-option-img"></image>
           <span>我的订单</span>
           <image src="/static/image/center/arrow.png" mode="widthFix" class="center-option-icon"></image>
         </div>
         <div class="center-option">
           <image src="/static/image/center/center.png" mode="widthFix" class="center-option-img"></image>
           <span>我的收藏</span>
           <image src="/static/image/center/arrow.png" mode="widthFix" class="center-option-icon"></image>
         </div>
         <div class="center-option" @click="linkService">
           <image src="/static/image/center/center.png" mode="widthFix" class="center-option-img"></image>
           <span>联系客服</span>
           <image src="/static/image/center/arrow.png" mode="widthFix" class="center-option-icon"></image>
         </div>
         <div class="center-option">
           <image src="/static/image/center/center.png" mode="widthFix" class="center-option-img"></image>
           <span>成为房东</span>
           <image src="/static/image/center/arrow.png" mode="widthFix" class="center-option-icon"></image>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
export default {
  mixins: [wxShare],
  data () {
    return {
      userInfo: {}
    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){
    this.userInfo = wx.getStorageSync('userInfo')
  },
  created(){

  },
  methods: {
    orderPage(){
     wx.navigateTo({
        url: '/pages/my-order/my-order'
      })
    },
    messagePage(){
      wx.navigateTo({
         url: '/pages/message/message'
       })
    },
    linkService(){
      wx.makePhoneCall({
        phoneNumber: '4001005678'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{

}
.center-header{
  width:100%;
  position:relative;
  .bac-img{
    width:100%;
    height:350rpx;
  }
}
.center-container{
  padding: 0rpx 30rpx;
  box-sizing: border-box;
}
.center-content{
  width:100%;
  background: #ffffff;
  padding-top: 160rpx;
  padding-left: 50rpx;
  padding-right: 50rpx;
  box-sizing: border-box;
  padding-bottom:50rpx;
  .center-option{
    height:100rpx;
    line-height: 100rpx;
    color: #333333;
    .center-option-img{
      width:40rpx;
      margin-right: 20rpx;
      position: relative;
      top:-2rpx;
    }
    .center-option-icon{
      width:36rpx;
      float:right;
      margin-top: 25rpx;
    }
  }
}
.center-header-img{
  position: absolute;
  left:50%;
  bottom: -130rpx;
  transform: translateX(-50%);
  text-align: center;
  font-size:36rpx;
  z-index: 99;
  .user-img{
    width:130rpx;
    height:130rpx;
    border-radius: 50%;
    border:3px solid #ffffff;
    overflow: hidden;
  }
  p{
    margin-top:20rpx;
    font-size: 39rpx;
    color: #333333;
  }
}
.center-bottom{
  margin-top: 25rpx;
  color:#999999;
  line-height:70rpx;
  image{
    width:40rpx;
    margin-right: 20rpx;
    position: relative;
    top:-2rpx;
  }
}
</style>
