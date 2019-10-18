// pages/photoModule/details/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    details: ''
  },
  previewPhoto (e) {
    let current = e.currentTarget.dataset.index
    wx.previewImage({
      urls: this.data.details.image,
      current: this.data.details.image[current]
    })
  },
  getDetails (id) {
    app.getCommonPhotosDetails({
      id
    }).then(res => {
      let details = res.data
      let date = new Date()
      date.setMinutes(0)
      date.setHours(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      let timeToday = date.getTime()
      let time = new Date(details.create_at.replace(/-/g, '/')).getTime()
        if (time - timeToday >= 0) {
          details.time = '今天 ' + details.create_at.slice(10, -3)
        } else if (Math.abs(time - timeToday) <= 24 * 60 * 60 * 1000) {
          details.time = '昨天 ' + details.create_at.slice(10, -3)
        } else if (Math.abs(time - timeToday) <= 24 * 60 * 60 * 1000 * 2) {
          details.time = '前天 ' + details.create_at.slice(10, -3)
        } else {
          details.time = details.create_at.slice(0,-3)
        }
      this.setData({
        details: details
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetails(options.id)
    this.setData({
      id: options.id
    })
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