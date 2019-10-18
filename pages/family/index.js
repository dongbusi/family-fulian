// pages/family/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    family: '',
    userInfo: '',
    limit: 8,
    page: 0,
    photoList: [],
    status: 1 // 1 通过 2未审核 0未通过
  },
  goDetails (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/photoModule/details/index?id=' + id
    })
  },
  getFamily () {
    app.getFamily().then(res => {
      let family = Object.assign({}, res.data)
      delete family.power
      family.length = Object.keys(family).length
      family = Array.from(family)
      let userInfo = family.find(item => item.self == 1)
      this.setData({
        userInfo: userInfo,
        family: family,
      })
    })
  },
  getPhotoList(index = 1) {
    app.getPhotoList({
      range: 1,
      limit: this.data.limit,
      page: this.data.page + 1,
      status: Number(this.data.status)
    }).then(res => {
      this.setData({
        page: res.data.current_page,
        photoList: [...this.data.photoList, ...res.data.data]
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
    this.setData({
      status: e.currentTarget.dataset.index,
      page: 0,
      photoList: []
    })
    this.getPhotoList(e.currentTarget.dataset.index)
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
      photoList: [],
      registType: wx.getStorageSync('registType')
    })
    if(this.checkRegistType(wx.getStorageSync('registType'))) {
      this.getFamily()
      this.getPhotoList()
    }
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
    this.getFamily()
    this.setData({
      page: 0,
      photoList: [],
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