// pages/study/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 8,
    page: 0,
    list: [],
    registType: ''
  },
  goDetails (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/studyDetails/index?id=' + id
    })
  },
  getList () {
    
    app.getStudyList({
      limit: this.data.limit,
      page: this.data.page + 1
    }).then(res => {
      this.setData({
        list: [...this.data.list, ...res.data.data],
        page: res.data.current_page
      })
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    this.setData({
      page: 0,
      list: []
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})