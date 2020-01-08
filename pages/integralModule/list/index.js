// pages/integralModule/list/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    intergalList: [],
    page: 0,
    limit: 20
  },
  getIntergalList () {
    app.getIntergalList({
      page: this.data.page + 1,
      limit: this.data.limit
    }).then(res => {
      let list = res.data.data
      list = list.map(item => {
        item.points > 0 ? item.points = "+" + item.points : item.points
        return item
      })
      this.setData({
        intergalList: [...this.data.intergalList, ...list],
        page: res.data.current_page
      })
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
    this.setData({
      intergalList: []
    })
    this.getIntergalList()
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
    this.getIntergalList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})