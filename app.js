//app.js

import api from './api/index'

App({
  ...api,
  onLaunch: function () {
  },
  onShow: function () {
    this.login().then(res => {
      if (res == 1) {
        this.getInfoList().then(res => {
          if (res.data.length !== 0) {
            wx.setTabBarBadge({
              index: 4,
              text: res.data.length + '' || ''
            })
          }
         
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    phone: ''
  }
})