//app.js

import api from './api/index'

App({
  ...api,
  onLaunch: function () {
   
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
  onShow: function () {
    this.login()
  },
  globalData: {
    userInfo: null,
    phone: ''
  }
})