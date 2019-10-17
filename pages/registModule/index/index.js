// pages/registModule/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goIndex (e) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  goRegistMember (e) {

    wx.showModal({
      title: '提示',
      content: '您的家庭是否已创建家庭主账户',
      showCancel: true,
      cancelText: '否',
      cancelColor: '#999999',
      confirmText: '是',
      confirmColor: '#EC7B7C',
      success: (result) => {
        if (result.confirm) {
          if (e.detail.userInfo) {
            wx.navigateTo({
              url: '/pages/registModule/member/index',
            })
          }
        } else {
          if (e.detail.userInfo) {
            wx.navigateTo({
              url: '/pages/registModule/householder/index',
            })
          }
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