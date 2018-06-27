<!-- 首页 -->
<template>
  <div class="container">
    <div class="banner">
       <swiper :indicator-dots="indicatorDots" circular :autoplay="autoplay" :interval="interval" :duration="duration"
       :indicator-active-color="color" style="height:400rpx;">
          <block v-for="(item,index) in imgUrl" :key="index">
            <swiper-item>
              <image :src="item" class="slide-image" mode="widthFix"></image>
            </swiper-item>
          </block>
       </swiper>
    </div>
    <div class="option" v-for="(item,index) in optionList" :key="index" @click="detailPage">
      <p class="option-line"></p>
      <p class="option-title">{{item.title}}</p>
      <image :src="item.url" class="option-image" mode="widthFix"></image>
      <p class="option-content">{{item.content}}</p>
      <p class="option-introduce">{{item.introduce}}</p>
    </div>

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { weixinlogin } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
     userInfo: {},
     imgUrl: ['/static/image/index/option.png',
     '/static/image/index/option2.png','/static/image/index/option3.png'],
     indicatorDots: true,
     color: '#0D9EFF',
     autoplay: true,
     interval: 2500,
     duration: 500,
     optionList: [{
      url:'/static/image/index/a1.jpg',
      title:'广州最文艺民宿',
      introduce:'整层或套间-宜居2人-广州市-天河区',
      content:'市中心的花园别墅里充满童趣的空间'
     },{
      url:'/static/image/index/a2.jpg',
      title:'广州最美民宿',
      introduce:'整层或套间-宜居1人-广州市-海珠区',
      content:'市中心的花园别墅里充满童趣的空间'
     },{
      url:'/static/image/index/a3.jpg',
      title:'广州最有趣民宿',
      introduce:'整层或套间-宜居3人-广州市-番禺区',
      content:'市中心的花园别墅里充满童趣的空间'
     },{
      url:'/static/image/index/a4.jpg',
      title:'广州最好玩民宿',
      introduce:'整层或套间-宜居5人-广州市-越秀区',
      content:'市中心的花园别墅里充满童趣的空间'
     }]
    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){
     wx.login({
       success: function(res) {
         console.log('code-res',res)
         wx.setStorageSync('code', res.code)
         weixinlogin({
           code: res.code
         })
         .then((res)=>{
           console.log('res',res)
            wx.setStorageSync('token', res.data.token)
         })
       }
     })
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              // console.log('res',res)
              this.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
            }
          })
        }
      })
    },
    detailPage(){
      wx.navigateTo({
         url: '/pages/detail/detail'
       })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 100rpx;
  background: #ffffff;
}
.banner{
  width:100%;
  image{
    width:100%;
  }
}
.option{
  width:100%;
  margin-top: 65rpx;
  padding:0rpx 30rpx;
  box-sizing: border-box;
  .option-line{
    width:200rpx;
    height:1px;
    background: #b5b6b7;
    margin-bottom: 30rpx;
  }
  .option-title{
    font-size: 36rpx;
    color:#b5b6b7;
    margin-bottom: 30rpx;
  }
  .option-image{
    width:100%;
    margin-bottom:20rpx;
  }
  .option-content{
    font-size: 32rpx;
    color:#2c2d2f;
  }
  .option-introduce{
    font-size: 23rpx;
    color:#b5b6b7;
    margin-top: 20rpx;
  }
}
</style>
