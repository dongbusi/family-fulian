// pages/integralModule/list/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 0
  },
  goDetails () {
    wx.navigateTo({
      url: '/pages/integralModule/exchangeDetails/index'
    })
  },
  getList () {
    app.getExchangeList({
      page: this.data.page + 1,
    }).then(res => {
      res.data.list.forEach(item => {
        item.create_at = item.create_at.slice(0, 10)
      })
      this.setData({
        list: res.data.list
      })
    })
  },
  confirm (e) {
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '重要提示',
      content: '此按钮必须当着商家的面，让商家工作人员点击操作，一旦确认领取，即表示您已经领取了该物品，此操作无法取消。',
      cancelText: '取消操作',
      cancelColor: '#03081A',
      confirmText: '确定领取',
      confirmColor: '#EC7B7C',
      success (res) {
        if (res.confirm) {
          app.orderComplete({
            order_no: id
          }).then(res => {
            wx.navigateTo({
              url: '/pages/integralModule/drawResult/index'
            })
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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