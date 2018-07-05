<!-- 申请入住 -->
<template>
  <div class="container">
    <div class="apply-top">
      <p class="detail-title">市中心五羊新城里有一间明亮的玻璃花房</p>
      <p class="detail-introduce">广州市 越秀区五羊新城新马路南二街</p>
    </div>
    <div class="apply-content">
      <p class="apply-title">入住信息</p>
      <div class="message-option">
        <div>房客</div>
        <div class="apply-number">
          <span class="reduce" @click="reduceNum">-</span>
          <span class="num">{{num}}人</span>
          <span class="add" @click="addNum">+</span>
        </div>
      </div>
      <div class="message-option">
        <div>日期</div>
         <div class="piker-date">
          <span style="text-align: left;">
            <picker mode="date" :value="start_date" start="2018-06-01" end="2020-09-01" @change="startDateChange">
                <view class="picker">
                  {{start_date}}
                </view>
            </picker>
          </span>
          <span class="num-btn">{{days}}天</span>
          <span style="text-align: right;">
            <picker mode="date" :value="end_date" :start="startTime" end="2020-09-01" @change="endDateChange">
                <view class="picker">
                  {{end_date}}
                </view>
            </picker>
          </span>
        </div>
      </div>
      <div class="message-option message-price">
        <div>费用</div>
        <div>￥{{fee}}</div>
      </div>
    </div>
    <p class="order-btn" @click="loginPage">立即预定</p>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
// import { apiUserSave,apiUserInfo } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
      num: 1,
      date: '请选择日期',
      days: 0,
      start_date: '入住日期',
      end_date: '退房日期'
    }
  },
  components: {

  },
  computed:{
    startTime(){
      return this.start_date == '入住日期'?new Date:this.start_date
    },
    fee(){
      return this.days*239
    }
  },
  mounted() {

  },
  onShow(){
    if(wx.getStorageSync('start_date')){
      this.start_date = wx.getStorageSync('start_date')
    }
    if(wx.getStorageSync('end_date')){
      this.end_date = wx.getStorageSync('end_date')
    }
    if(wx.getStorageSync('days')){
      this.days = wx.getStorageSync('days')
    }
  },
  created(){

  },
  methods: {
   submitApply(){
     
   },
   loginPage(){
      wx.navigateTo({
         url: '/pages/login/login'
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
   addNum(){
     this.num++
   },
   reduceNum(){
     this.num--
     if(this.num<=1){
      this.num = 1
     }
   },
   bindDateChange(e){
     console.log('e',e)
     this.date = e.mp.detail.value
   }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 30rpx;
  background: #ffffff;
}
.apply-top{
  padding: 30rpx;
  background: #f5f5f5;
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
.apply-content{
  margin-top: 60rpx;
  padding:0rpx 30rpx;
  .apply-title{
    font-size: 36rpx;
    color:#b5b6b7;
    margin-bottom: 30rpx;
  }
}
.message-option{
 border-top:1px solid #f1f1f0;
 height:90rpx;
 line-height: 90rpx;
 display: flex;
 justify-content: space-between;
 .piker-date{
  display: inline-block;
  position: relative;
  span{
    display: inline-block;
    width:230rpx;
  }
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
 .apply-number{
  .reduce{
    font-size: 36rpx;
    display: inline-block;
    width:65rpx;
    text-align: right;
  }
  .num{
   margin-left: 10rpx;
   margin-right: 10rpx;
   font-size: 30rpx;
  }
  .add{
    font-size: 36rpx;
    display: inline-block;
    text-align: right;
  }
 }
}
.message-price{
  border-bottom:1px solid #f1f1f0;
}
.order-btn{
 width:100%;
 height:90rpx;
 line-height: 90rpx;
 text-align: center;
 font-size: 36rpx;
 color:#ffffff;
 position: fixed;
 left:0px;
 bottom: 0px;
 background: #2da1fa;
}
.picker{
  color:#b5b6b7;
}
.picker-active{
  color:#2c2d2f;
}
.picker-image{
  width:35rpx;
  transform: translateY(-3rpx);
}
</style>
