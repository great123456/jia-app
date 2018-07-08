<!-- 详情页 -->
<template>
  <div class="container">
    <div class="banner">
       <swiper circular :duration="duration"
       :indicator-active-color="color" style="height:360rpx;">
          <block v-for="(item,index) in imgUrl" :key="index">
            <swiper-item style="position: relative;">
              <image :src="item" class="slide-image" mode="widthFix"></image>
              <span style="position: absolute;right:20rpx;bottom: 20rpx;color:#ffffff;">{{index+1}}/{{imgUrl.length}}</span>
              <div class="collect" @click="selectCollect"><image :src="collectUrl" mode="widthFix"></image></div>
            </swiper-item>
          </block>
       </swiper>
    </div>
    <div class="detail">
      <div class="detail-top">
        <p class="detail-title">{{detailInfo.introduction}}</p>
        <p class="detail-introduce">{{detailInfo.address}}</p>
      </div>
      <div class="detail-content">
        <div class="detail-content-option">
          <image src="/static/image/detail/store.png" class="detail-content-icon" mode="widthFix"></image>
          <span class="introduce">整层或套间</span>
          <span class="content">房子面积{{detailInfo.area}}平方米</span>
        </div>
        <div class="detail-content-option">
          <image src="/static/image/detail/account.png" class="detail-content-icon" mode="widthFix"></image>
          <span class="introduce">宜住{{detailInfo.amount}}人</span>
          <span class="content">户型5居室,出租1间卧室</span>
        </div>
        <div class="detail-content-option">
          <image src="/static/image/detail/home.png" class="detail-content-icon" mode="widthFix"></image>
          <span class="introduce">{{detailInfo.house_type}}</span>
          <span class="content">1公用卫生间,1独立卫生间</span>
        </div>
      </div>
      <div class="detail-describe detail-list">
        <p class="detail-describe-title">预订时长</p>
        <p class="detail-describe-text">随时可预订 </p>
      </div>
      <div class="detail-describe detail-list">
        <p class="detail-describe-title">入住须知</p>
        <p class="detail-describe-text">{{detailInfo.occupancy_note}}</p>
      </div>
      <div class="detail-describe detail-list">
        <p class="detail-describe-title">退订政策</p>
        <p class="detail-describe-text">{{detailInfo.policy}}</p>
      </div>
      <div class="detail-describe detail-list">
        <p class="detail-describe-title">客人须知</p>
        <p class="detail-describe-text">{{detailInfo.guest_note}}</p>
      </div>
      <div class="detail-describe">
        <p class="detail-describe-title">房源描述</p>
        <p class="detail-describe-text">{{detailInfo.description}}</p>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="detail-consult">咨询房东<button open-type="contact" class="detail-btn"></button></div>
      <div class="detail-price">￥{{detailInfo.price}}</div>
      <div class="detail-apply" @click="loginPage">申请入住</div>
    </div>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiHouseDetail,apiHouseCollect } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
     userInfo: {},
     imgUrl: [],
     collectUrl: '/static/image/detail/favorites.png',
     indicatorDots: true,
     color: '#0D9EFF',
     duration: 500,
     detailId: '',
     detailInfo: {}
    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){
    this.detailId = this.$mp.query.id
    wx.setStorageSync('house_id', this.detailId)
    this.getHouseDetail(this.detailId)
  },
  created(){
    
  },
  methods: {
    messagePage(){
      wx.navigateTo({
         url: '/pages/edit-message/edit-message'
      })
    },
    getHouseDetail(id){
      apiHouseDetail({
        id: id
      })
      .then((res)=>{
        if(res.code == 200){
          this.imgUrl = res.data.detail_pic
          this.detailInfo = res.data
          wx.setStorageSync('fee', this.detailInfo.price)
        }
      })
    },
    selectCollect(){
      if(this.collectUrl == '/static/image/detail/favorites.png'){
        this.collectUrl = '/static/image/detail/favorites-select.png'
        apiHouseCollect({
          id: this.detailId
        })
        .then((res)=>{
          if(res.code == 200){
            wx.showToast({
              title: '收藏成功',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }else{
        this.collectUrl = '/static/image/detail/favorites.png'
        // wx.showToast({
        //   title: '取消收藏',
        //   icon: 'none',
        //   duration: 2000
        // })
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
