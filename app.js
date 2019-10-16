//app.js

import api from './api/index'

App({
  ...api,
  onLaunch: function () {
    wx.setTabBarBadge({
      index: 4,
      text: '13'
    })
    this.login()
  },
  onShow: function () {
    this.login()
  },
  globalData: {
    userInfo: null,
    phone: ''
  }
})