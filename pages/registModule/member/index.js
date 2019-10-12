// pages/registModule/member/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      houseName: '',
      housePhone: '',
      selfName: '',
      selfPhone: '',
      code: ''
    },
    downTime: '获取验证码',
    error: '',
    pid: ''
  },
  input (e) {
    let type = e.target.dataset.type
    this.setData({
      [`form.${type}`]: e.detail
    })
  },
  cutDown () {
    let timer = setInterval(() => {
      if (this.data.downTime > 0) {
        this.setData({
          downTime: this.data.downTime - 1
        })
      } else {
        clearInterval(timer)
        this.setData({
          downTime: '获取验证码'
        })
      }
    }, 1000)
  },
  getCode () {
    this.setData({
      downTime: 60
    })
    this.cutDown()
  },
  submit () {
    if (this.data.form.houseName === '') {
      this.setData({
        error: 'houseName'
      })
      return
    }
    if (this.data.form.housePhone === '') {
      this.setData({
        error: 'housePhone'
      })
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(this.data.form.housePhone))) {
      this.setData({
        error: 'housePhone'
      })
      return
    }
    if (this.data.form.selfName === '') {
      this.setData({
        error: 'selfName'
      })
      return
    }
    if (this.data.form.selfPhone === '') {
      this.setData({
        error: 'selfPhone'
      })
      return
    }
    // if (!(/^1[3456789]\d{9}$/.test(this.data.form.selfPhone))) {
    //   this.setData({
    //     error: 'selfPhone'
    //   })
    //   return
    // }
    if (this.data.form.code === '') {
      this.setData({
        error: 'code'
      })
      return
    }
    this.setData({
      error: ''
    })
    this.getHouseHolder()
  },
  getPhoneNumber (e) {
    wx.removeStorageSync('token');
    if (e.detail.iv) {
      app.login().then(res => {
        app.getPhone({
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }).then(res => {
          let reg = /^(\d{3})\d{4}(\d{4})/
          this.setData({
            'form.selfPhone': res.data.phoneNumber.replace(reg, '$1****$2')
          })
          app.globalData.phone = res.data.phoneNumber
        })
      })
    }
  },
  getHouseHolder () {
    app.getHouseHolder({
      realname: this.data.form.houseName,
      mobile: this.data.form.housePhone
    }).then(res => {
      this.setData({
        pid: res.data.pid
      })
      this.regist()
    })
  },
  regist () {
    wx.getUserInfo({
      success: (res) => {
        app.regist({
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          signature: res.signature,
          mobile: app.globalData.phone,
          code: this.data.form.code,
          pid: this.data.pid,
          realname: this.data.form.selfname
        }).then(res => {
          wx.navigateTo({
            url: '/pages/registModule/result/index?type=1'
          })
        })
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