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
  checkRegistType (registType) {
    switch (registType) {
      case 4:
        wx.redirectTo({
          url: '/pages/registModule/index/index',
          success () {
            wx.showToast({
              title: '请先注册',
              icon: 'none',
              duration: 3000
            })
          }
        })
        return false
      case 0:
        wx.switchTab({
          url: '/pages/index/index',
          success () {
            wx.showToast({
              title: '请通知户主审核通过，如已通过审核，请重新打开小程序',
              icon: 'none',
              duration: 3000
            })
          }
        })
        return false
      case 2:
        wx.redirectTo({
          url: '/pages/registModule/index/index',
          success () {
            wx.showToast({
              title: '户主审核失败，请重新注册',
              icon: 'none',
              duration: 3000
            })
          }
        })
        
        return false
      case 1:
        return true
      default: 
      wx.redirectTo({
        url: '/pages/registModule/index/index',
        success () {
          wx.showToast({
            title: '请先注册',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }
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
  onShow: function () {
    this.setData({
      page: 0,
      tab: 0,
      list: [],
      registType: wx.getStorageSync('registType')
    })
    this.checkRegistType(wx.getStorageSync('registType')) && this.getList()
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