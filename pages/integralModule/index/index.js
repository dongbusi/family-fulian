// pages/integralModule/index/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    skuList: [],
    userInfo: '',
    endTime: ''
  },
  exchange () {
    wx.navigateTo({
      url: '/pages/integralModule/result/index'
    })
  },
  goGoodsDetails (e) {
    let id = e.target.dataset.id, goods_id = e.target.dataset.goods_id
    wx.navigateTo({
      url: '/pages/integralModule/details/index?goods_id=' + goods_id + '&id=' + id
    })
  },
  // goGoodsDetails () {

  // },
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
    wx.navigateTo({
      url: '/pages/integralModule/exchangeList/index'
    })
  },
  getList () {
    wx.request({
      // url: 'https://www.zhimwj.cn/admin.html?s=store/api.goods/gets',
      url: 'http://168.100.188.50/v1/admin.html?s=store/api.goods/gets',
      method: 'POST',
      header: {
        'Cookie': wx.getStorageSync('token')
      },
      success: (res) => {
        let end_time = res.data.data.list.end_time
        delete res.data.data.list.end_time
        res.data.data.list.length = Object.keys(res.data.data.list).length
        let list = Array.from(res.data.data.list)
        let skuList = []
        list.forEach(item => {
          item.list.forEach(childItem => {
            childItem.logo = item.logo
            childItem.title = item.title
            childItem.exchange = item.exchange
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
            exchange: item.exchange
          }
        })
        skuList = skuList.filter(item => item.status == 1)
        this.setData({
          skuList: skuList,
          endTime: end_time
        })
      }
    })
  },
  getUserInfo () {
    app.getFamily().then(res => {
      let { quarter_num, rank_num } = res.data
      let family = Object.assign({}, res.data)
      family.length = Object.keys(family).length
      family = Array.from(family)
      let userInfo = family.find(item => item.pid == 0)
      Object.assign(userInfo, {quarter_num : quarter_num}, { rank_num: rank_num})
      this.setData({
        userInfo: userInfo
      })
    })
  },
  goCountryside () {
    wx.navigateTo({
      url: '/pages/integralModule/countryside/index'
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