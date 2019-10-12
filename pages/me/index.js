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
    userInfo: ''
  },
  toogleTabInfo () {
    this.setData({
      tab: 0
    })
  },
  toogleTabMember () {
    this.setData({
      tab: 1
    })
    this.getFamily()
  },
  getFamily () {
    app.getFamily().then(res => {
      let family = Object.assign({}, res.data)
      delete family.power
      family.length = Object.keys(family).length
      family = Array.from(family)
      if (!this.data.userInfo) {
        let userInfo = family.find(item => item.self == 1)
        userInfo.mobile = userInfo.mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
        this.setData({
          userInfo: userInfo,
          family: family,
          power: res.data.power
        })
        return
      }
      this.setData({
        family: family,
        power: res.data.power
      })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFamily()
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