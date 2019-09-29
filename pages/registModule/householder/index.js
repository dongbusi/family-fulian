// pages/registModule/hoseholder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      area: '',
      address: '',
      phone: '',
      code: ''
    },
    downTime: '获取验证码',
    error: '',
    showAddress: false,
    areaList:{
      province_list: { // 实际为街道，vant字段限制，暂不修改，code自定义
        110000: '北京市',
        120000: '天津市'
      },
      city_list: { // 实际为村庄，vant字段限制，暂不修改，code自定义
        110100: '北京市',
        110200: '县',
        120100: '天津市',
        120200: '县'
      }
    }
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
  shoWselectAdress () {
    this.setData({ showAddress: true });
  },
  closeAddress () {
    this.setData({ showAddress: false });
  },
  selectaddress (e) {
    console.log(e.detail.values)
    let values = e.detail.values
    this.setData({
      'form.area': values[0].name + values[1].name,
      showAddress: false
    })

  },
  submit () {
    if (this.data.form.name === '') {
      this.setData({
        error: 'name'
      })
      return
    }
    if (this.data.form.area === '') {
      this.setData({
        error: 'area'
      })
      return
    }
    if (this.data.form.address === '') {
      this.setData({
        error: 'address'
      })
      return
    }
    if (this.data.form.phone === '') {
      this.setData({
        error: 'phone'
      })
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(this.data.form.phone))) {
      this.setData({
        error: 'phone'
      })
      return
    }
    if (this.data.form.code === '') {
      this.setData({
        error: 'code'
      })
      return
    }
    this.setData({
      error: ''
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