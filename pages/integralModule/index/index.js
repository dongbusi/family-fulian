// pages/integralModule/index/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    skuList: '',
    userInfo: ''
  },
  goGoodsDetails (e) {
    let id = e.target.dataset.id, goods_id = e.target.dataset.goods_id
    wx.navigateTo({
      url: '/pages/integralModule/details/index?goods_id=' + goods_id + '&id=' + id
    })
  },
  goRules () {
    wx.navigateTo({
      url: '/pages/integralModule/rules/index'
    })
  },
  goIntergalDetail () {
    wx.navigateTo({
      url: '/pages/integralModule/list/index'
    })
  },
  goExchangeDetail () {
    wx.showToast({
      title: '正在开发中',
      icon: 'none'
    })
    return
    wx.navigateTo({
      url: '/pages/integralModule/exchangeList/index'
    })
  },
  getList () {
    wx.request({
      url: 'https://fl.xianghunet.com/admin.html?s=store/api.goods/gets',
      method: 'POST',
      header: {
        'Cookie': wx.getStorageSync('token')
      },
      success: (res) => {
        let list = res.data.data.list
        let skuList = []
        list.forEach(item => {
          item.list.forEach(childItem => {
            childItem.logo = item.logo
            childItem.title = item.title
          })
          skuList = [...skuList, ...item.list]
        })
        skuList = skuList.map(item => {
          return {
            thumb: item.logo,
            num: item.number_stock - item.number_sales,
            integra: item.price_selling.slice(0,-3),
            goods_id: item.goods_id,
            id: item.id,
            name: item.title,
            status: item.status,
          }
        })
        skuList = skuList.filter(item => item.status == 1)
        this.setData({
          skuList: skuList
        })
      }
    })
  },
  getUserInfo () {
    app.getFamily().then(res => {
      let family = Object.assign({}, res.data)
      delete family.power
      family.length = Object.keys(family).length
      family = Array.from(family)
      let userInfo = family.find(item => item.pid == 0)
      this.setData({
        userInfo: userInfo
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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