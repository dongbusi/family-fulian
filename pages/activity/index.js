// pages/activity/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIn: false,
    page: 0,
    limit: 6,
    list: [],
    total: 0,
    registType: '',
    tab: 0
  },
  goDetails (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/activityDetails/index?id=' + id
    })
  },
  getList (type = 0, join = '') {
    app.getActivityList({
      range: type,
      limit: this.data.limit,
      page: this.data.page + 1,
      join: join
    }).then(res => {
      let list = res.data.data
      list.map(item => {
        item.create_at = item.create_at.slice(0, 10)
        return item
      })
        this.setData({
          list: [...this.data.list, ...list],
          page: res.data.current_page,
          total: res.data.total
        })
      wx.stopPullDownRefresh()
    })
  },
  changeTabs (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      tab: index,
      page: 0,
      list: []
    })
    if (index == 2) {
      this.getList(index, 1)
      return
    }
    this.getList(index)
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
  onShow: function (options) {
    this.setData({
      page: 0,
      tab: 0,
      list: [],
    })
    this.getList()
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
    if (this.data.tab == 2) {
      this.getList(2, 1)
    } else {
      this.getList(this.data.tab)
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.tab == 2) {
      this.getList(2, 1)
    } else {
      this.getList(this.data.tab)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})