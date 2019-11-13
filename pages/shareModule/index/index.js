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
      id: Number(id)
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
      id: Number(id),
      limit: this.data.limit,
      page: this.data.page + 1,
    }).then(res => {
      let date = new Date()
      date.setMinutes(0)
      date.setHours(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      let timeToday = date.getTime()
      res.data.data.forEach(item => {
        let time = new Date(item.create_at.replace(/-/g, '/')).getTime()
        if (time - timeToday >= 0) {
          item.time = '今天 ' + item.create_at.slice(10, -3)
        } else if (Math.abs(time - timeToday) <= 24 * 60 * 60 * 1000) {
          item.time = '昨天 ' + item.create_at.slice(10, -3)
        } else if (Math.abs(time - timeToday) <= 24 * 60 * 60 * 1000 * 2) {
          item.time = '前天 ' + item.create_at.slice(10, -3)
        } else {
          item.time = item.create_at.slice(0,10)
        }
        if (item.image.includes('|')) {
          item.image = item.image.split('|')
        } else {
          item.image = [item.image]
        }
      })
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
      id: decodeURIComponent(options.scene) || ''
    })
    this.getFamily(decodeURIComponent(options.scene))
    this.getPhotoList(decodeURIComponent(options.scene))
  },
  showImage (e) {
    let index = e.currentTarget.dataset
    let list = this.data.photoList[index.listindex].image
    wx.previewImage({
      current: this.data.photoList[index.listindex].image[index.index],
      urls: list,
    })
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
    this.getPhotoList(this.data.id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})