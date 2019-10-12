// pages/integralModule/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.previewImage({
    //   urls: ['http://www.v5.com/admin.html?s=store/api.goods/ceshi'] // 需要预览的图片http链接列表
    // })

    wx.request({
      url: 'http://www.v5.com/admin.html?s=store/api.goods/ceshi',
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      success: (result) => {
        console.log(result)
        // wx.previewImage({
        //   urls: ['result'] // 需要预览的图片http链接列表
        // })
      },
      fail: () => {},
      complete: () => {}
    });
      
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