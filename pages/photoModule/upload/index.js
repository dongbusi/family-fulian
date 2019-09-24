// pages/photoModule/upload/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    focus: false,
    list: []
  },
  setFocus () {
    this.setData({
      focus: true
    })
  },
  chooseImage () {
    let count = 6 - this.data.list.length > 0 ? 6 - this.data.list.length : 0;
    let _this = this
    wx.chooseImage({
      count: count,
      success (res) {
        _this.setData({
          list: [..._this.data.list, ...res.tempFilePaths]
        })
      }
    })
  },
  upload () {
    wx.navigateTo({
      url: '/pages/photoModule/result/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})