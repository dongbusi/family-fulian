/**
 * 
 * request请求
 * @author dongzhan
 * @date 2019-10-08
 * @params {data: object}
 */

// const BASR_URL = 'http://168.100.188.50/v1'
const BASR_URL = 'https://fl.xianghunet.com/v1'


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
        } else if (data.code == 1000) {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#EC7B7C',
            success: (result) => {
              if (result.confirm) {
                wx.redirectTo({
                  url: '/pages/registModule/index/index',
                })
              }
            }
          })
        } else if (data.code == 2000) {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: data.msg,
            confirmText: '确定',
            confirmColor: '#EC7B7C',
            success: (result) => {
              if (result.confirm) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }
            }
          })
        } else if (data.code == 3000) {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#EC7B7C',
            success: (result) => {
              if (result.confirm) {
                wx.redirectTo({
                  url: '/pages/registModule/index/index',
                })
              }
             
            }
          })
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
