/**
 * 
 * request请求
 * @author dongzhan
 * @date 2019-10-08
 * @params {data: object}
 */

// const BASR_URL = 'http://168.100.188.50/v1'
const BASR_URL = 'http://www.v5.com/v1'

function login () {
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
        // register  4未注册 0待审核 1已注册 2重新注册
        wx.setStorageSync('token', res.data)
        wx.setStorageSync('registType', res.register)
        wx.hideLoading()
        wx.showToast({
          title: '重新登录成功',
          icon: 'none',
          duration: 1500,
          mask: true
        })
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
}

export default function http({url, data, method = 'GET', contentType = 'application/json' }, flag = true) {
  flag && wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASR_URL + url,
      data,
      header: {
        'content-type':contentType,
        'Cookie': wx.getStorageSync('token') || ''
      },
      method,
      success: ({data, Code}) => {
        if (data.code === 200 || data.Code == 'OK') {
          resolve(data)
          flag && wx.hideLoading()
        } else if (data.code === 10000) {
          flag && wx.hideLoading()
          wx.removeStorageSync('token')
          wx.showLoading({
            title: '正在重新登录',
            mask: true
          })
          login()
        } else if (data.code == 300) {
          wx.redirectTo({
            url: '/pages/registModule/index/index',
            success: (result) => {
              wx.showToast({
                title: data.msg || data.info || data.Message,
                icon: 'none',
                duration: 3000,
              })
            },
          });
            
        } else {
          reject(data)
          flag && wx.hideLoading()
          wx.showToast({
            title: data.msg || data.info || data.message || data.Message,
            icon: 'none',
            duration: 3000,
            mask: true
          })
        }
      },
      fail: (err) => {
        reject(err)
        flag && XMLDocument.hideLoading()
        wx.showToast({
          title: '网络不给力',
          icon: 'loading',
          duration: 3000
        })
      }
    })
      
  })
}
