// pages/index/index.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiper: [],
    photoList: [],
    activityList: [],
    registType: 4, //  4未注册 0待审核 1已注册 2重新注册
    limit: 6,
    page: 0,
    notice__text: '',
    showNotice: false
  },
  goAppreciation () {
    wx.showToast({
      title: '该功能正在开发中',
      icon: 'none',
      duration: 3000,
      mask: true
    })
  },
  goPhotoList () {
    wx.navigateTo({
      url: '/pages/photoModule/list/index',
    })
  },
  goActivity (e) {
    wx.switchTab({
      url: '/pages/activity/index',
      success: () => {
        this.setData({
          showNotice: false
        })
      }
    })
  },
  goPhotoDetails (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shareModule/details/index?id=' + id,
    })
  },
  goActivityDetails (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/activityDetails/index?id=' + id,
    })
  },
  goUpload () {
    wx.navigateTo({
      url: '/pages/photoModule/upload/index'
    })
  },
  goExchange () {
    wx.navigateTo({
      url: '/pages/integralModule/index/index'
    })
  },
  getActivityList () {
    app.getCommonActivityList({
      limit: 2,
      page: 1
    }).then(res => {
        this.setData({
          activityList: res.data.data
        })
    })
  },
  getPhotoList () {
    app.getCommonPhotoList({
      range: 0,
      page: this.data.page + 1,
      limit: this.data.limit
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
        photoList: [...this.data.photoList, ...list],
        page: res.data.current_page
      })
      wx.stopPullDownRefresh()
    })
  },
  getSwiper () {
    app.getSwiper().then(res => {
      this.setData({
        swiper: res.data
      })
    })
  },
  showActivityTips () {
    if (wx.getStorageSync('token')) {
      app.getActivityList({
        range: 1,
        limit: 10,
        page: 1,
        join: ''
      }).then(res => {
        let text = ''
        res.data.data.forEach((item, index) => {
          text += (index+1) + '. ' + item.title + '活动已开始报名' + '  '
        })
        this.setData({
          notice__text: text,
          showNotice: true
        })
      })
    } else {
      app.login().then(res => {
        app.getActivityList({
          range: 1,
          limit: 10,
          page: 1,
          join: ''
        }).then(res => {
          let text = ''
          res.data.data.forEach((item, index) => {
            text += (index+1) + '. ' + item.title + '活动已开始报名' + '  '
          })
          this.setData({
            notice__text: text,
            showNotice: true
          })
        })
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiper()
    this.showActivityTips()
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
      photoList: [],
      activityList: [],
      page: 0
    })
    this.getActivityList()
    this.getPhotoList()
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
    this.getActivityList()
    this.setData({
      page: 0,
      photoList: []
    })
    this.getPhotoList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getPhotoList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})