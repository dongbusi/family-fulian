//app.js
App({
  onLaunch: function () {
    wx.setTabBarBadge({
      index: 4,
      text: '13'
    })
  },
  globalData: {
    userInfo: null
  }
})