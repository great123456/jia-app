<!-- 订单列表 -->
<template>
  <div class="container">
    <p style="margin-top:30rpx;color:#b5b6b7" v-show="orderList.length == 0">暂无订单数据</p>
    <div class="order-image" v-show="orderList.length == 0">
      <image src="/static/image/no-data.png" mode="widthFix"></image>
    </div>
    <div class="order-option" v-for="(item,index) in orderList" :key="index">
      <p class="option-title">
        <span>{{item.house.name}}</span>
        <span v-if="item.is_paid == 1" class="order-status">已付款</span>
        <span v-else class="order-status">未付款</span>
      </p>
      <div class="option-img">
        <image :src="item.house.mian_pic" mode="widthFix"></image>
      </div>
      <p class="order-num">订单编号:&nbsp{{item.order_no}}</p>
      <p class="order-price">订单总额:&nbsp{{item.total}}</p>
      <div class="order-time">
        <span>{{item.begin}}</span>
        <span class="line"></span>
        <span>{{item.end}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiOrderList } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
     orderList: []
    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){
    this.getOrderList()
  },
  created(){

  },
  methods: {
    getOrderList(){
      wx.showLoading({
        title: '加载中',
      })
      apiOrderList({
        page: 1
      })
      .then((res)=>{
        wx.hideLoading()
        if(res.code == 200){
          this.orderList = res.data.list
          this.orderList.forEach(function(item){
            item.house.mian_pic = 'https://api.jiaduminsu.com'+ item.house.mian_pic
          })
        }
      })
    },
    detailPage(index){
      wx.navigateTo({
         url: '/pages/order-detail/order-detail?index='+index
       })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 20rpx;
  padding-bottom: 100rpx;
  text-align: center;
}
.order-option{
  margin-bottom: 20rpx;
  widows: 100%;
  box-sizing: border-box;
  padding:30rpx;
  background: #ffffff;
  position: relative;
  .option-title{
    font-size: 30rpx;
    color:#2c2d2f;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    .order-status{
      color:#b5b6b7;
    }
  }
  .option-img{
    width:100%;
    image{
      width:100%;
    }
  }
  .order-price{
    margin-top: 10rpx;
    color:#b5b6b7;
    font-size: 32rpx;
    text-align: left;
  }
  .order-num{
    margin-top: 10rpx;
    font-size: 26rpx;
    color:#b5b6b7;
    text-align: left;
  }
  .order-time{
    position: absolute;
    width:100%;
    box-sizing: border-box;
    color:#ffffff;
    font-size: 36rpx;
    left:0px;
    bottom:140rpx;
    display: flex;
    justify-content: space-between;
    z-index: 9;
    padding-left:50rpx;
    padding-right: 50rpx;
    .line{
      width:100rpx;
      height:4rpx;
      background: #ffffff;
      margin-top: 22rpx;
    }
  }
}
.order-image{
  margin-top: 50rpx;
  text-align: center;
  image{
    width:200rpx;
  }
}
</style>
