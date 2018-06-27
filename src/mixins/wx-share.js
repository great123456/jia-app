export default {
  data: {
    shareParams: {
      title: '民宿预订',
      path: '/pages/index/index',
      imageUrl: '/static/image/index/a5.jpg',
      success () {
        wx.showToast({
          title: '转发成功！',
          icon: 'none'
        })
      }
    }
  },
  onShareAppMessage () {
    return this.shareParams
  }
}
