// pages/photoModule/photoList/index.js

const app = getApp()
import util from '../../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    limit: 5,
    list: []
  },
  goDetails (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/photoModule/details/index?id=' + id
    })
  },
  getList () {
    app.getPhotoList({
      range: 0,
      limit: this.data.limit,
      page: this.data.page + 1
    }).then(res => {
      let list = res.data.data
      let date = new Date()
      date.setMinutes(0)
      date.setHours(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      let timeToday = date.getTime()
      list.map(item => {
        let time = new Date(item.create_at.replace(/-/g, '/')).getTime()
        if (time - timeToday >= 0) {
          item.time = '今天 ' + item.create_at.slice(10, -3)
        } else if (Math.abs(time - timeToday) <= 24 * 60 * 60 * 1000) {
          item.time = '昨天 ' + item.create_at.slice(10, -3)
        } else if (Math.abs(time - timeToday) <= 24 * 60 * 60 * 1000 * 2) {
          item.time = '前天 ' + item.create_at.slice(10, -3)
        } else {
          item.time = item.create_at.slice(0,-3)
        }
        return item
      })
      this.setData({
        list: [...this.data.list, ...list],
        page: res.data.current_page
      })
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