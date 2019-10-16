// pages/integralModule/details/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    skuList: [],
    sku: '',
    currentDetails: '',
    skuInfoList: [],
    defaultId: '',
    goods_id: ''
  },
  exchange () {
    wx.showToast({
      title: '正在开发中',
      icon: 'none'
    })
    return
    wx.showModal({
    title: '提示',
    content: '是否确定兑换',
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#EC7B7C',
    confirmText: '确定',
    confirmColor: '#EC7B7C',
    success: (result) => {
      if (result.confirm) {
        console.log(111)
        }
      }
    })
      
  },
  showSelect () {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  selectSKU(event) {
    const { value, index } = event.detail;
    this.setData({
      'currentDetails.sku': value,
      show: false,
      'currentDetails.price_selling': this.data.skuInfoList[index].price_selling,
      'currentDetails.num': this.data.skuInfoList[index].num
    })
  },
  getDetails (id) {
    wx.request({
      url: 'http://www.v5.com/admin.html?s=store/api.goods/get',
      data: {
        goods_id: id
      },
      header: {
        Cookie: wx.getStorageSync('token')
      },
      method: 'POST',
      success: (res) => {
        
        let list = res.data.data.list.filter(item => item.status == 1)
        list = list.map(item => {
          item.image = res.data.data.image
          item.price_selling = item.price_selling.slice(0,-3)
          item.desc = res.data.data.content
          item.sku = item.goods_spec.replace(/\:/g, ' ').replace(/\;/g, ' ')
          item.num = item.number_stock - item.number_sales
          return item
        })
        let skuList = list.map(item => item.goods_spec.replace(/\:/g, ' ').replace(/\;/g, ' '))
        this.setData({
          skuInfoList: list,
          skuList
        })
        this.getCurrentSku()
      },
      fail: (res) => {
        wx.showToast({
          title: res.data.info,
          icon: 'none',
          mask: true
        })
      },
    });
      
  },
  getCurrentSku () {
    let list = this.data.skuInfoList
    let defaultGoods = list.find(item => item.id == this.data.defaultId)
    this.setData({
      currentDetails: defaultGoods
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetails(options.goods_id || '')
    this.setData({
      goods_id: options.goods_id,
      defaultId: options.id
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