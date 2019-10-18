// pages/me/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    family: '',
    power: 0,
    userInfo: '',
    infoList: [],
    intergalList: []
  },
  toogleTabInfo () {
    this.setData({
      tab: 0
    })
    this.getInfoList()
  },
  toogleTabMember () {
    this.setData({
      tab: 3
    })
    this.getFamily()
  },
  toogleDetails () {
    this.setData({
      tab: 1
    })
    this.getIntergalList()
  },
  toogleFamily () {
    this.setData({
      tab: 2
    })
  },
  getFamily () {
    app.getFamily().then(res => {
      let family = Object.assign({}, res.data)
      delete family.power
      family.length = Object.keys(family).length
      family = Array.from(family)
        this.setData({
          family: family,
          power: res.data.power
        })
      wx.stopPullDownRefresh()
    })
  },
  checkPass (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    app.checkMember({
      id: id,
      status: 1
    }).then(res => {
      this.setData({
        [`family[${index}].adopt_status`]: 1
      })
      wx.showToast({
        title: '已确认通过',
        icon: 'success'
      })
    })
  },
  cancelPass (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    app.checkMember({
      id: id,
      status: 2
    }).then(res => {
      this.setData({
        [`family[${index}].adopt_status`]: 2
      })
      wx.showToast({
        title: '已取消通过',
        icon: 'success'
      })
    })
  },
  checkRegistType (registType) {
    switch (registType) {
      case 4:
        wx.redirectTo({
          url: '/pages/registModule/index/index',
          success () {
            wx.showToast({
              title: '请先注册',
              icon: 'none',
              duration: 3000
            })
          }
        })
        return false
      case 0:
        wx.switchTab({
          url: '/pages/index/index',
          success () {
            wx.showToast({
              title: '请通知户主审核通过，如已通过审核，请重新打开小程序',
              icon: 'none',
              duration: 3000
            })
          }
        })
        return false
      case 2:
        wx.redirectTo({
          url: '/pages/registModule/index/index',
          success () {
            wx.showToast({
              title: '户主审核失败，请重新注册',
              icon: 'none',
              duration: 3000
            })
          }
        })
        
        return false
      case 1:
        return true
      default: 
      wx.redirectTo({
        url: '/pages/registModule/index/index',
        success () {
          wx.showToast({
            title: '请先注册',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }
  },
  removeInformation (e) {
    let index = e.currentTarget.dataset.index, id = e.currentTarget.dataset.id
    let infoList = this.data.infoList
    infoList.splice(index, 1)
    this.setData({
      infoList: infoList
    })
    let length  = String(this.data.infoList.length)
    if (length == 0) {
      wx.removeTabBarBadge({index: 4})
    } else {
      wx.setTabBarBadge({
        index: 4,
        text: length
      })
    }
    app.removeInfo({
      id: id
    })
    
  },
  getInfoList () {
    app.getInfoList().then(res => {
      this.setData({
        infoList: res.data
      })
      if (res.data.length !== 0) {
        wx.setTabBarBadge({
          index: 4,
          text: res.data.length + '' || ''
        })
      } else {
        wx.removeTabBarBadge({index: 4})
      }
    })
  },
  getIntergalList () {
    app.getIntergalList().then(res => {
      let list = res.data
      list = list.map(item => {
        item.points > 0 ? item.points = "+" + item.points : item.points
        item.create_at = item.create_at.slice(0,10)
        return item
      })
      this.setData({
        intergalList: list
      })
    })
  },
  getUserInfo () {
    app.getUserInfo().then(res => {
      let userInfo = res.data
      userInfo.mobile = userInfo.mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
      this.setData({
        userInfo: userInfo
      })
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
    if (this.checkRegistType(wx.getStorageSync('registType'))) {
      this.getUserInfo()
      if(this.data.tab == 0) {
        this.setData({
          infoList: []
        })
        this.getInfoList()
      }
    }
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