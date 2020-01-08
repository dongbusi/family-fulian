// pages/family/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    family: [],
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
    })
    this.getFamily()
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
  onShareAppMessage: function (res) {
    app.shareAddIntegral({
      type: 11,
      activity_id: this.data.userInfo.id
    })
    return {
      path: '/pages/shareModule/index/index?scene=' + this.data.userInfo.id
    }
  }
})