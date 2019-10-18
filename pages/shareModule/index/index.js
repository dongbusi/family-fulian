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
    id: ''
  },
  goDetails (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shareModule/details/index?id=' + id
    })
  },
  getFamily (id) {
    app.getOneFamily({
      id: id
    }).then(res => {
      let family = Object.assign({}, res.data.data)
      delete family.power
      family.length = Object.keys(family).length
      family = Array.from(family)
      let userInfo = family.find(item => item.pid == 0)
      userInfo.address = res.data.address
      this.setData({
        userInfo: userInfo,
        family: family,
      })
    })
  },
  getPhotoList(id) {
    app.getOneFamilyPhotos({
      id: id,
      limit: this.data.limit,
      page: this.data.page + 1,
    }).then(res => {
      this.setData({
        page: res.data.current_page,
        photoList: [...this.data.photoList, ...res.data.data]
      })
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id || ''
    })
    this.getFamily(options.id)
    this.getPhotoList(options.id)
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
    this.getFamily(this.data.id)
    this.setData({
      page: 0,
      photoList: []
    })
    this.getPhotoList(this.data.id)
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