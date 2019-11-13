

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
    uploadList: [],
    checked: true,
    video: '',
    videoUpload: ''
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
        _this.uploadImg()
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
  uploadImg () {
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    let uploadList = []
    let list = this.data.list
    list.forEach((item, index) => {
      wx.uploadFile({
        header:{
          Cookie: wx.getStorageSync('token') || ''
        },
        url: 'https://www.zhimwj.cn/admin.html?s=admin/api.plugs/upload',
        // url: "http://168.100.188.50/admin.html?s=admin/api.plugs/upload",
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
  },
  uploadVideo () {
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    wx.uploadFile({
      header:{
        Cookie: wx.getStorageSync('token') || ''
      },
      url: 'https://www.zhimwj.cn/admin.html?s=admin/api.plugs/upload',
      // url: "http://168.100.188.50/admin.html?s=admin/api.plugs/upload",
      filePath: this.data.video,
      name: 'file',
      success: (res) => { 
        this.setData({
          videoUpload: JSON.parse(res.data).url
        })
        wx.hideLoading()
      }
    })
  },
  submit () {
    let status
    if (this.data.checked) {
      status = ''
    } else {
      status = 'no'
    }
    app.upload({
      content: this.data.message,
      image: this.data.uploadList.join('|'),
      status: status,
      video: this.data.videoUpload,
      type: this.data.videoUpload ? 2 : 1
    }).then(res => {
      wx.navigateTo({
        url: '/pages/photoModule/result/index',
        success () {
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  chooseVideo () {
    wx.chooseVideo({
      success: (res) => {
        this.setData({
          video: res.tempFilePath
        })
        this.uploadVideo()
      }
    })
  },
  onChange (event) {
    this.setData({
      message: event.detail
    })
  },
  checkRegistType() {
    app.login().then(res => {
      if (res == 4) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请前往注册',
          confirmText: '确定',
          confirmColor: '#EC7B7C',
          success: (result) => {
            if (result.confirm) {
              wx.redirectTo({
                url: '/pages/registModule/index/index',
              })
            }
          }
        })
      } else if (res == 0) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '待户主审核，若已审核，请重新打开小程序',
          confirmText: '确定',
          confirmColor: '#EC7B7C',
          success: (result) => {
            if (result.confirm) {
              wx.navigateBack({
                deita: 1
              })
            }
          }
        })
      } else if (res == 2) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '户主未通过审核，请重新注册',
          confirmText: '确定',
          confirmColor: '#EC7B7C',
          success: (result) => {
            if (result.confirm) {
              wx.redirectTo({
                url: '/pages/registModule/index/index',
              })
            }
          }
        })
      }
    })
  },
  scopeChange({ detail }) {
    this.setData({ checked: detail });
  },
  delVideo () {
    this.setData({
      video: '',
      videoUpload: ''
    })
  },
  choose () {
    wx.showActionSheet({
      itemList: [
        '图片', '视频'
      ],
      itemColor: '#EC7B7C',
      success: (result)=>{
        this.setData({
          list: [],
          uploadList: [],
          video: '',
          videoUpload: ''
        })
        if (result.tapIndex == 0) {
          this.chooseImage()
        } else {
          this.chooseVideo()
        }
      }
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
    this.checkRegistType()
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