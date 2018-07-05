<!-- 个人信息 -->
<template>
  <div class="container">
    <p class="title">加入家度,与好友分享美宿</p>
    <div class="message-option">
      <input type="text" v-model="name" placeholder="请输入您的真实姓名"/>
    </div>
    <div class="message-option">
      <input type="text" v-model="phone" placeholder="请输入您的手机号码"/>
    </div>
    <div class="message-option messsage-code">
      <input type="text" v-model="code" placeholder="请输入验证码"/>
      <span class="code-btn" @click="getCode">{{codeValue}}</span>
    </div>
    <p class="order-btn" @click="userLogin">下一步</p>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiSendCode,apiSaveUserInfo,apiUserInfo } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
      name: '',
      phone: '',
      code: '',
      num: 60,
      codeValue: '发送验证码',
      timer: null,
      disabled: true
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
   getCode(){
     if(this.name == ''){
       wx.showToast({
         title: '请先填写用户名',
         icon: 'none',
         duration: 2000
       })
       return
     }
     if(this.phone == ''){
       wx.showToast({
         title: '手机号码不能为空',
         icon: 'none',
         duration: 2000
       })
       return
     }
     if(!this.disabled){
       return
     }
     this.disabled = false
     this.num = 60
     this.codeValue = this.num +'s'
     const self = this
     apiSendCode({
      mobile: this.phone
     })
     .then((res)=>{
       if(res.code == 200){
          
       }else{
         wx.showToast({
           title: res.msg,
           icon: 'none',
           duration: 2000
         })
       }
     })
     this.timer = setInterval(function(){
       self.num --
       self.codeValue = self.num +'s'
       if(self.num<=0){
        self.num = 0
        self.codeValue = '发送验证码'
        self.disabled = true
        clearInterval(self.timer)
       }
     },1000)
   },
   userLogin(){
    if(this.name == ''){
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.phone == ''){
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.code == ''){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    apiSaveUserInfo({
      mobile: this.phone,
      verifyCode: this.code,
      name: this.name
    })
    .then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
        wx.setStorageSync('login', true)
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
   }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding:0rpx 30rpx;
  padding-top: 30rpx;
  background: #ffffff;
}
.title{
  font-size: 26rpx;
  color:#2c2d2f;
  margin-bottom: 60rpx;
}
.message-option{
 border-top:1px solid #f1f1f0;
 input{
  height:90rpx;
  line-height: 90rpx;
 }
}
.messsage-code{
  border-bottom:1px solid #f1f1f0;
  position: relative;
  .code-btn{
    width:160rpx;
    height:50rpx;
    border:1px solid #8b8c8d;
    text-align: center;
    line-height: 50rpx;
    font-size: 26rpx;
    color:#b5b6b7;
    position: absolute;
    right:0rpx;
    top:20rpx;
    border-radius: 30rpx;
    z-index: 100;
  }
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
</style>
