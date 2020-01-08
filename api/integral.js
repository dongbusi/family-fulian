import http from '../utils/request'

export default {
  villageIntegral: data => http({
    url: '/Integral/village_buckle',
    data,
    method: 'POST',
  }),
  getExchangeList: data => http({
    url: '/integral/integral_list',
    data,
    method: 'POST'
  }),
  orderComplete: data => http({
    url: '/integral/order_up',
    data,
    method: 'POST'
  })
}