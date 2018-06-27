<!-- 详情页 -->
<template>
  <div class="container">
    <div class="banner">
       <swiper circular :duration="duration"
       :indicator-active-color="color" style="height:360rpx;">
          <block v-for="(item,index) in imgUrl" :key="index">
            <swiper-item style="position: relative;">
              <image :src="item" class="slide-image" mode="widthFix"></image>
              <span style="position: absolute;right:20rpx;bottom: 20rpx;color:#ffffff;">{{index+1}}/5</span>
              <div class="collect" @click="selectCollect"><image :src="collectUrl" mode="widthFix"></image></div>
            </swiper-item>
          </block>
       </swiper>
    </div>
    <div class="detail">
      <div class="detail-top">
        <p class="detail-title">市中心五羊新城里有一间明亮的玻璃花房</p>
        <p class="detail-introduce">广州市 越秀区五羊新城新马路南二街</p>
      </div>
      <div class="detail-content">
        <div class="detail-content-option">
          <image src="/static/image/detail/store.png" class="detail-content-icon" mode="widthFix"></image>
          <span class="introduce">整层或套间</span>
          <span class="content">房子面积60平方米</span>
        </div>
        <div class="detail-content-option">
          <image src="/static/image/detail/account.png" class="detail-content-icon" mode="widthFix"></image>
          <span class="introduce">宜住2人</span>
          <span class="content">户型5居室,出租1间卧室</span>
        </div>
        <div class="detail-content-option">
          <image src="/static/image/detail/home.png" class="detail-content-icon" mode="widthFix"></image>
          <span class="introduce">1床2卫</span>
          <span class="content">1公用卫生间,1独立卫生间</span>
        </div>
      </div>
      <div class="detail-describe detail-list">
        <p class="detail-describe-title">预订时长</p>
        <p class="detail-describe-text">随时可预订 </p>
      </div>
      <div class="detail-describe detail-list">
        <p class="detail-describe-title">入住须知</p>
        <p class="detail-describe-text">入住时间：12:00后 </p>
        <p class="detail-describe-text">退房时间：12:00前</p>
      </div>
      <div class="detail-describe detail-list">
        <p class="detail-describe-title">退订政策</p>
        <p class="detail-describe-text">入住前1天12:00前退订，可获100%退款。之后退订不退款</p>
      </div>
      <div class="detail-describe detail-list">
        <p class="detail-describe-title">客人须知</p>
        <p class="detail-describe-text">允许做饭、适合儿童（2-12岁）、适合婴幼儿（2岁以下）、适合老人（60岁以上）、</p>
      </div>
      <div class="detail-describe">
        <p class="detail-describe-title">房源描述</p>
        <p class="detail-describe-text">
          您好，很高兴您关注到这套公寓，这套公寓是一室一厅一厨一卫的格局，卧室里有一张大床，卧的床是2米*1.8米，卧室里都配备有冷暖空调；客厅里有沙发电视机，厨房间里锅碗瓢盆都有，在公寓门口的菜市场买点菜即可做饭。
         公寓旁边有超市菜市场饭店早餐店医院药店公交站台，生活很方便，我们另外提供免费接机场或者火车站，迪士尼提供免费接送，野生动物园提供免费接送，如果你们去市区，我们提供免费接送我们附近的地铁站，为你们的出行提供便利。我房源有多套，有迪士尼卡通房和常规普通房，可以根据你们的需要来选取。
         如果你们去迪士尼的话，我们也可以代购迪士尼优惠门票，去迪士尼提供免费接送，我们也提供有偿迪士尼导游服务，就是帮你们在迪士尼排队，缩短你们在迪士尼游玩的时间，从而提高你们在迪士尼游玩的质量，希望在上海遇到你们，谢谢！
        </p>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="detail-consult">咨询房东<button open-type="contact" class="detail-btn"></button></div>
      <div class="detail-price">￥239</div>
      <div class="detail-apply" @click="loginPage">申请入住</div>
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
     imgUrl: ['/static/image/index/a1.jpg',
     '/static/image/index/a2.jpg','/static/image/index/a3.jpg','/static/image/index/a5.jpg','/static/image/index/a6.jpg'],
     collectUrl: '/static/image/detail/favorites.png',
     indicatorDots: true,
     color: '#0D9EFF',
     duration: 500
    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){
    
  },
  created(){
    
  },
  methods: {
    messagePage(){
      wx.navigateTo({
         url: '/pages/edit-message/edit-message'
      })
    },
    selectCollect(){
      if(this.collectUrl == '/static/image/detail/favorites.png'){
        this.collectUrl = '/static/image/detail/favorites-select.png'
        wx.showToast({
          title: '收藏成功',
          icon: 'none',
          duration: 2000
        })
      }else{
        this.collectUrl = '/static/image/detail/favorites.png'
        wx.showToast({
          title: '取消收藏',
          icon: 'none',
          duration: 2000
        })
      }
    },
    loginPage(){
      wx.navigateTo({
         url: '/pages/apply/apply'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 100rpx;
}
.banner{
  width:100%;
  image{
    width:100%;
  }
}
.detail{
  .detail-top{
    background: #ffffff;
    padding:0rpx 30rpx;
    border-bottom:1px solid #f1f1f0;
    padding-bottom: 30rpx;
    padding-top: 30rpx;
  }
  .detail-content{
    font-size: 32rpx;
    color:#2c2d2f;
  }
  .detail-introduce{
    font-size: 23rpx;
    color:#b5b6b7;
    margin-top: 20rpx;
  }
}
.detail-content{
  padding:30rpx;
  background: #ffffff;
  .detail-content-option{
    font-size: 28rpx;
    height:60rpx;
    line-height: 60rpx;
    image{
      width:35rpx;
      transform: translateY(-5rpx);
    }
    .introduce{
      display: inline-block;
      margin-left: 20rpx;
      color:#2c2d2f;
      width:200rpx;
    }
    .content{
      display: inline-block;
      margin-left:30rpx;
      color:#b5b6b7;
    }
  }
}
.detail-describe{
  margin-top: 30rpx;
  background: #ffffff;
  padding:30rpx;
  .detail-describe-title{
    font-size: 36rpx;
    color:#b5b6b7;
    margin-bottom: 30rpx;
  }
  .detail-describe-text{
    font-size: 28rpx;
    color:#333;
    line-height: 50rpx;
  }
}
.detail-list{
  margin-top: 0px;
  border-bottom:1px solid #f1f1f0;
}
.detail-bottom{
  width:100%;
  position: fixed;
  left:0px;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  div{
    height:90rpx;
    line-height: 90rpx;
    text-align: center;
    font-size: 36rpx;
  }
  .detail-consult{
    background: #dbdbdb;
    color:#2c2d2f;
    position: relative;
    width:40%;
    .detail-btn{
      width:100%;
      height:100%;
      position: absolute;
      left:0px;
      bottom: 0px;
      opacity: 0;
    }
  }
  .detail-price{
    /*background: #fecd0f;*/
    /*color:#2c2d2f;*/
    width:25%;
    text-align: right;
    background: #2da1fa;
    color:#ffffff;
  }
  .detail-apply{
    /*background: #fecd0f;*/
    /*color:#2c2d2f;*/
    width:35%;
    background: #2da1fa;
    color:#ffffff;
  }
}
.collect{
  width:60rpx;
  height:60rpx;
  border-radius: 100%;
  background: rgba(0,0,0,0.2);
  position: absolute;
  right:20rpx;
  top:30rpx;
  image{
    width:40rpx;
    margin-top: 10rpx;
    margin-left: 10rpx;
  }
}
</style>
