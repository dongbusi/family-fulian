import http from '../utils/request'

export default {
  login () {
    return new Promise((resolve, reject) => {
      wx.login({
        success (res) {
          http({
            data: {
              code: res.code
            },
            method: 'post',
            url: '/login/index',
            contentType: 'application/x-www-form-urlencoded'
          }).then(res => {
            if (res.points > 0) {
              wx.showToast({
                title: '登录成功，积分+1',
                icon: 'none',
                duration: 3000
              })
            }
            // register  4未注册 0待审核 1已注册 2重新注册
            wx.setStorageSync('token', res.data)
            wx.setStorageSync('registType', res.register)
            resolve(res.data)
          })
        },
        fail () {
          wx.showToast({
            title: '网络不给力',
            icon: 'none',
            duration: 1500,
            mask: true
          })
            
        }
      })
    })
  },
  regist: (data) => http({
    url: '/register/index',
    data: data,
    method: 'post'
  }),
  getTown: () => http({
    url: '/common/get_town',
    method: 'post'
  }),
  getVillage: data => http({
    url: '/common/get_village',
    data: {
      town_id: data.town_id
    },
    method: 'post'
  }),
  getPhone: data => http({
    url: '/register/getTel',
    data,
    method: 'post'
  }),
  getHouseHolder: data => http({
    url: '/common/family_master',
    data,
    method: 'post'
  }),
  getFamily: () => http({
    url: '/api/family_user',
    method: 'post'
  }),
  checkMember: data => http({
    url: '/api/family_adopt_status',
    data,
    method: 'post'
  }),
  getSwiper: data => http({
    url: '/common/carousel',
    method: 'POST'
  }),
  getInfoList: data => http({
    url: '/personal/message',
    method: "POST"
  }),
  removeInfo: data => http({
    url: '/personal/message_status',
    data,
    method: 'POST'
  })
}