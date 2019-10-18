// pages/registModule/hoseholder/index.js
const app = getApp();

  

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
    fullPhone: '',
    downTime: '获取验证码',
    error: '',
    showAddress: false,
    townId: '',
    villageId: '',
    areaList:[
      /* {
        values: '',
        className: 'town',
      },
      {
        values: '',
        className: 'town',
        defaultIndex: ''
      } */
    ],
    town_id: '',
    village_id: ''
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
    if (!this.data.fullPhone) {
      this.setData({
        error: 'phone'
      })
      return
    }
    this.setData({
      downTime: 60
    })
    
    app.getCode({
      telephone: this.data.fullPhone,
      tag:'register'
    })
    this.cutDown()
  },
  shoWselectAdress () {
    this.setData({ showAddress: true });
  },
  closeAddress () {
    this.setData({ showAddress: false });
  },
  onChange(event) {
    const { value } = event.detail;
    let townIndex = this.data.areaList[0].values.findIndex(item => item == value[0])
    this.getVillage(this.data.townId[townIndex])
  },
  selectaddress (e) {
    let value = e.detail.value
    let town_id = this.data.townId[this.data.areaList[0].values.findIndex(item => item == value[0])]
    let village_id = this.data.villageId[this.data.areaList[1].values.findIndex(item => item == value[1])]
    this.setData({
      town_id,
      village_id,
      'form.area': value.join()
    })
    this.closeAddress()
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
    if (this.data.form.code === '') {
      this.setData({
        error: 'code'
      })
      return
    }
    this.setData({
      error: ''
    })
    wx.getUserInfo({
      success: (res) => {
        app.regist({
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          signature: res.signature,
          mobile: this.data.fullPhone,
          code: this.data.form.code,
          town_id: this.data.town_id,
          village_id: this.data.village_id,
          pid: 0,
          realname: this.data.form.name,
          address: this.data.form.address
        }).then(res => {
          wx.navigateTo({
            url: '/pages/registModule/result/index?type=0',
            success () {
              wx.setStorageSync('registType', 1); 
            }
          })
        })
      }
    })
  },
  getTown () {
    app.getTown().then(res => {
      let townName = res.data.map(item => {
        return item.name
      })
      let townId = res.data.map(item => {
        return item.id
      })
      this.setData({
        'areaList[0]': {
          values: townName
        },
        townId
      })
      this.getVillage(res.data[0].id)
    })
  },
  getVillage (town_id = 1) {
    app.getVillage({
      town_id: town_id
    }).then(res => {
      let village = res.data.map(item => {
        return item.name
      })
      let villageId = res.data.map(item => {
        return item.id
      })
      this.setData({
        'areaList[1]': {
          values: village,
          defaultIndex: 0,
        },
        villageId
      })
    })
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
            'form.phone': res.data.phoneNumber.replace(reg, '$1****$2'),
            'fullPhone': res.data.phoneNumber
          })
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTown()
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