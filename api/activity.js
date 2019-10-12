import http from '../utils/request'


export default {
  getActivityList: data => http({
    url: '/api/activity',
    data,
    method: 'post'
  }),
  getActivityDetails: data => http({
    url: '/api/activity_details',
    data,
    method: 'post'
  }),
  getAvtivityMembers: data => http({
    url: '/api/family_member',
    data,
    method: 'post'
  }),
  signActivity: data => http({
    url: '/api/activity_sign',
    data,
    method: 'post'
  }),
  cancelSignActivity: data => http({
    url: '/api/activity_cancel',
    data,
    method: 'post'
  })
}