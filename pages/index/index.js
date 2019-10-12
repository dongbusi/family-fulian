// pages/index/index.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    photoList: [],
    activityList: [],
    registType: 4, //  4未注册 0待审核 1已注册 2重新注册
    limit: 6,
    page: 0
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
  goActivity () {
    this.checkRegistType() && wx.switchTab({
      url: '/pages/activity/index'
    })
  },
  goPhotoDetails (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/photoModule/details/index?id=' + id,
    })
  },
  goActivityDetails (e) {
    let id = e.currentTarget.dataset.id
    this.checkRegistType() && wx.navigateTo({
      url: '/pages/activityDetails/index?id=' + id,
    })
  },
  goUpload () {
    this.checkRegistType() && wx.navigateTo({
        url: '/pages/photoModule/upload/index'
      })
  },
  checkRegistType () {
    switch (this.data.registType) {
      case 4:
        wx.navigateTo({
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
        wx.showToast({
          title: '请通知户主审核通过',
          icon: 'none'
        })
        return false
      case 2:
        wx.navigateTo({
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
      wx.navigateTo({
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
  goExchange () {
    this.checkRegistType() && wx.navigateTo({
      url: '/pages/integralModule/index/index'
    })
  },
  getActivityList () {
    app.getActivityList({
      range: 0,
      limit: 2,
      page: 1
    }).then(res => {
        this.setData({
          activityList: res.data.data
        })
    })
  },
  getPhotoList () {
    app.getPhotoList({
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'registType',
      success: (res) => {
        this.setData({
          registType: res.data
        })
      }
    })
    this.getActivityList()
    this.getPhotoList()
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
    wx.getStorage({
      key: 'registType',
      success: (res) => {
        this.setData({
          registType: res.data
        })
      }
    })
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
      page: 0
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