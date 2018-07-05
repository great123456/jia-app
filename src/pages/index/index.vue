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

    <div class="reserve-content">
      <div class="center">
        <div class="time-content">
          <div class="map">
            <span>广州</span>
            <span><image src="/static/image/map.png" mode="widthFix"></image>定位城市</span>
          </div>
          <div class="piker-content">
            <div class="piker-date">
              <span style="float:left">
                <picker mode="date" :value="start_date" start="2018-06-01" end="2020-09-01" @change="startDateChange">
                    <view class="picker">
                      {{start_date}}
                    </view>
                </picker>
              </span>
              <span class="num-btn">{{days}}天</span>
              <span style="float:right">
                <picker mode="date" :value="end_date" :start="startTime" end="2020-09-01" @change="endDateChange">
                    <view class="picker">
                      {{end_date}}
                    </view>
                </picker>
              </span>
            </div>
            <p class="piker-btn">搜索</p>
          </div>
        </div>
      </div>
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
import { weixinlogin,apiHouseList } from '@/service/my'
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
     days: 0,
     start_date: '入住日期',
     end_date: '退房日期',
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
  computed:{
    startTime(){
      return this.start_date == '入住日期'?new Date:this.start_date
    }
  },
  onShow(){
     
  },
  created(){
    //this.getUserInfo()
    const self = this
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
           self.getHouseList()
        })
      }
    })
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
    startDateChange(e){
      this.start_date = e.mp.detail.value
      if(this.end_date!='退房日期'){
        this.days = this.DateDiff(this.start_date,this.end_date)
         wx.setStorageSync('start_date', this.start_date)
         wx.setStorageSync('end_date', this.end_date)
         wx.setStorageSync('days', this.days)
      }
    },
    DateDiff(sDate1,  sDate2){  
     let aDate  =  sDate1.split("-") 
     let oDate1  = new Date(aDate[0]  +  '-'  +  aDate[1]  +  '-'  +  aDate[2])    
     aDate  =  sDate2.split("-")  
     let oDate2  = new Date(aDate[0]  +  '-'  +  aDate[1]  +  '-'  +  aDate[2])
     let iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)
     return  iDays  
    },
    endDateChange(e){
      this.end_date = e.mp.detail.value
      if(this.start_date!='入住日期'){
        this.days = this.DateDiff(this.start_date,this.end_date)
         wx.setStorageSync('start_date', this.start_date)
         wx.setStorageSync('end_date', this.end_date)
         wx.setStorageSync('days', this.days)
      }
    },
    getHouseList(){
      apiHouseList({
        page: 10
      })
      .then((res)=>{
        if(res.code == 200){

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
.reserve-content{
  width:100%;
  padding: 0rpx 30rpx;
  box-sizing: border-box;
  .center{
    height:160rpx;
    position: relative;
  }
  .time-content{
    position: absolute;
    width:100%;
    left:0px;
    top:-160rpx;
    height:330rpx;
    border:1px solid #f1f1f0;
    background: #ffffff;
    border-radius: 5px;
    padding:0rpx 20rpx 30rpx;
    box-sizing: border-box;
    .map{
      display: flex;
      justify-content: space-between;
      height:90rpx;
      line-height: 90rpx;
      font-size: 30rpx;
      color:#2c2d2f;
      border-bottom:1px solid #f1f1f0;
      image{
        width:30rpx;
        margin-right: 10rpx;
        transform: translateY(-2rpx);
      }
    }
    .piker-date{
      height:100rpx;
      font-size: 30rpx;
      color:#b5b6b7;
      line-height: 100rpx;
      position: relative;
      .num-btn{
        position: absolute;
        display: inline-block;
        height:40rpx;
        width:90rpx;
        border-radius: 30rpx;
        border:1px solid #f1f1f0;
        text-align: center;
        line-height: 40rpx;
        left: 50%;
        top:25rpx;
        font-size: 26rpx;
        letter-spacing: 2px;
        transform: translateX(-50%);
      }
    }
    .piker-btn{
      width:100%;
      height:39px;
      line-height: 39px;
      text-align: center;
      font-size: 30rpx;
      color:#ffffff;
      background: #2da1fa;
      border-radius: 3px;
      margin-top: 5px;
    }
  }
}
</style>
