<!-- 我的收藏 -->
<template>
  <div class="container">
    <p style="margin-top:30rpx;color:#b5b6b7" v-show="optionList.length == 0">暂无订单数据</p>
    <div class="order-image" v-show="optionList.length == 0">
      <image src="/static/image/no-data.png" mode="widthFix"></image>
    </div>
    <div class="option" v-for="(item,index) in optionList" :key="index" @click="detailPage(item.house[0].id)">
      <p class="option-line"></p>
      <p class="option-title">{{item.house[0].name}}</p>
      <image :src="item.house[0].mian_pic" class="option-image" mode="widthFix"></image>
      <p class="option-content">{{item.house[0].introduction}}</p>
      <p class="option-introduce">{{item.house[0].house_type}}-宜居{{item.house[0].amount}}人-{{item.house[0].region}}</p>
    </div>

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiCollectList } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
     optionList: []
    }
  },
  components: {

  },
  mounted() {

  },
  computed:{
    
  },
  onShow(){
     this.getHouseList()
  },
  created(){
    
  },
  methods: {
    getHouseList(){
      apiCollectList({
        page: 1
      })
      .then((res)=>{
        if(res.code == 200){
          this.optionList = res.data.list
          this.optionList.forEach(function(item){
            item.house[0].mian_pic = 'https://api.jiaduminsu.com'+item.house[0].mian_pic
          })
          console.log('optionlist',this.optionList)
        }
      })
    },
    detailPage(id){
      wx.navigateTo({
         url: '/pages/detail/detail?id='+id
       })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 100rpx;
  background: #ffffff;
  text-align: center;
  padding-top: 1px;
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
  text-align: left;
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
.order-image{
  margin-top: 50rpx;
  text-align: center;
  image{
    width:200rpx;
  }
}
</style>
