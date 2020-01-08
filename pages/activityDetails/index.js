// pages/studyDetails/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    number: 1,
    id: '',
    details: '',
    family: [],
    result: [],
    registered: ''
  },
  closeNumSetting() {
    this.setData({ show: false });
  },
  showNumSetting () {
    this.setData({ show: true });
    this.getFamily()
  },
  getDetails (id) {
    app.getActivityDetails({
      id: id
    }).then(res => {
      let details = res.data
      details.create_at = details.create_at.slice(0, 10)
      details.close_date = details.close_date.slice(0, 10)
      details.content = details.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
      this.setData({
        details: details
      })
    })
  },
  getFamily() {
    app.getAvtivityMembers({
      activity_id: this.data.id || ''
    }).then(res => {
      let result = res.data.filter(item => item.sign.length) || []
      if (result.length) {
        result = result.map(item => {
          return String(item.id)
        })
      }
      this.setData({
        family: res.data,
        result: result,
        registered: result
      })
    })
  },
  onChange(event) {
    if (event.detail.length > this.data.details.surplus) {
      wx.showToast({
        title: '当前选择人数超过活动剩余名额',
        icon: 'none'
      })
      return false
    }
    this.setData({
      result: event.detail
    })
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle()
  },
  noop() {},
  submit () {
    if (this.data.result.length === 0) {
      wx.showToast({
        title: '您未选择家庭成员',
        icon: 'none'
      })
      return
    }
    let result = this.data.result.filter(item => !this.data.registered.includes(item))
    app.signActivity({
      sign_uid: result.join(','),
      id: this.data.id
    }).then(res => {
      wx.navigateTo({
        url: '/pages/activityResult/index'
      })
    })
  },
  cancelSign () {
    app.cancelSignActivity({
      activity_id: this.data.id
    }).then(res => {
      wx.showToast({
        title: '报名取消成功',
        icon: 'none',
        success: () => {
          this.setData({
            'details.sign_status': 0
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id || ''
    })
    this.getDetails(options.id || '')
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
    app.shareAddIntegral({
      type: 8,
      activity_id: this.data.id
    })
  }
})