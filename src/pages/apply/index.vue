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
        <picker mode="date" :value="date" start="2018-06-01" end="2019-09-01" @change="bindDateChange">
          <view class="picker" v-if="date == '请选择日期'">
            {{date}}
            <image src="/static/image/arrow.png" class="picker-image" mode="widthFix"></image>
          </view>
           <view class="picker-active" v-else>
            {{date}}
            <image src="/static/image/arrow.png" class="picker-image" mode="widthFix"></image>
          </view>
        </picker>
      </div>
      <div class="message-option message-price">
        <div>费用</div>
        <div>￥239</div>
      </div>
    </div>
    <p class="order-btn" @click="loginPage">发送申请给房东</p>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiUserSave,apiUserInfo } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
      num: 1,
      date: '请选择日期'
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
   submitApply(){
     
   },
   loginPage(){
      wx.navigateTo({
         url: '/pages/login/login'
      })
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
