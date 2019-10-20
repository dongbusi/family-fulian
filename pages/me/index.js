// pages/me/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    family: '',
    power: 0,
    userInfo: '',
    infoList: [],
    intergalList: [],
    qrcode: ''
  },
  toogleTabInfo () {
    this.setData({
      tab: 0
    })
    this.getInfoList()
  },
  toogleTabMember () {
    this.setData({
      tab: 3
    })
    this.getFamily()
  },
  toogleDetails () {
    this.setData({
      tab: 1
    })
    this.getIntergalList()
  },
  toogleFamily () {
    this.setData({
      tab: 2
    })
    this.getQrcode()
  },
  getFamily () {
    app.getFamily().then(res => {
      let family = Object.assign({}, res.data)
      delete family.power
      family.length = Object.keys(family).length
      family = Array.from(family)
        this.setData({
          family: family,
          power: res.data.power
        })
      wx.stopPullDownRefresh()
    })
  },
  checkPass (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    app.checkMember({
      id: id,
      status: 1
    }).then(res => {
      this.setData({
        [`family[${index}].adopt_status`]: 1
      })
      wx.showToast({
        title: '已确认通过',
        icon: 'success'
      })
    })
  },
  cancelPass (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    app.checkMember({
      id: id,
      status: 2
    }).then(res => {
      this.setData({
        [`family[${index}].adopt_status`]: 2
      })
      wx.showToast({
        title: '已取消通过',
        icon: 'success'
      })
    })
  },
  removeInformation (e) {
    let index = e.currentTarget.dataset.index, id = e.currentTarget.dataset.id
    let infoList = this.data.infoList
    infoList.splice(index, 1)
    this.setData({
      infoList: infoList
    })
    let length  = String(this.data.infoList.length)
    if (length == 0) {
      wx.removeTabBarBadge({index: 4})
    } else {
      wx.setTabBarBadge({
        index: 4,
        text: length
      })
    }
    app.removeInfo({
      id: id
    })
    
  },
  getInfoList () {
    app.getInfoList().then(res => {
      this.setData({
        infoList: res.data
      })
      if (res.data.length !== 0) {
        wx.setTabBarBadge({
          index: 4,
          text: res.data.length + '' || ''
        })
      } else {
        wx.removeTabBarBadge({index: 4})
      }
    })
  },
  getIntergalList () {
    app.getIntergalList().then(res => {
      let list = res.data
      list = list.map(item => {
        item.points > 0 ? item.points = "+" + item.points : item.points
        item.create_at = item.create_at.slice(0,10)
        return item
      })
      this.setData({
        intergalList: list
      })
    })
  },
  getUserInfo () {
    app.getUserInfo().then(res => {
      let userInfo = res.data
      userInfo.mobile = userInfo.mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
      this.setData({
        userInfo: userInfo
      })
    })
  },
  getQrcode () {
    wx.request({
      url: 'https://fl.xianghunet.com/v1/api/family_qrcode',
      method: 'POST',
      responseType: 'arraybuffer',
      success:(res) => {
        let image = wx.arrayBufferToBase64(res.data)
        this.setData({ qrcode:"data:image/PNG;base64,"+ image})
      },
      fail: (res) => {
        wx.showToast({
          title: '获取失败，请稍后重试',
          icon: 'none'
        })
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
    this.getUserInfo()
    if(this.data.tab == 0) {
      this.setData({
        infoList: []
      })
      this.getInfoList()
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