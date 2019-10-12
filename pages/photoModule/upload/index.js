// pages/photoModule/upload/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    focus: false,
    list: [],
    uploadList: []
  },
  setFocus () {
    this.setData({
      focus: true
    })
  },
  chooseImage () {
    let count = 6 - this.data.list.length > 0 ? 6 - this.data.list.length : 0;
    let _this = this
    wx.chooseImage({
      count: count,
      success (res) {
        _this.setData({
          list: [..._this.data.list, ...res.tempFilePaths]
        })
        _this.upload()
      }
    })
  },
  delImage (e) {
    let index = e.currentTarget.dataset.index
    let uploadList = this.data.uploadList
    let list = this.data.list
    list.splice(index, 1)
    uploadList.splice(index, 1)
    this.setData({
      list: list,
      uploadList
    })
  },
  upload () {
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    let uploadList = this.data.uploadList
    let list = this.data.list
    list.forEach((item, index) => {
      wx.uploadFile({
        header:{
          Cookie: wx.getStorageSync('token') || ''
        },
        url: 'http://www.v5.com/admin.html?s=admin/api.plugs/upload',
        filePath: item,
        name: 'file',
        success: (res) => {
          uploadList.push(JSON.parse(res.data).url)
          if (index === list.length - 1) {
            this.setData({
              uploadList
            })
            wx.hideLoading()
          }
        }
      })
    })
   
    // wx.navigateTo({
    //   url: '/pages/photoModule/result/index'
    // })
  },
  submit () {
    app.upload({
      content: this.data.message,
      image: this.data.uploadList.join('|')
    }).then(res => {
      wx.navigateTo({
        url: '../result/index'
      })
    })
  },
  onChange (event) {
    this.setData({
      message: event.detail
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})