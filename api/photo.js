import http from '../utils/request'

export default {
  upload: data => http({
    url: '/api/family_friend_save',
    data,
    method: 'post'
  }),
  getPhotoList: data => http({
    url: '/api/family_friend',
    data,
    method: 'post'
  }),
  getPhotoDetails: data => http({
    url: '/api/family_friend_details',
    data,
    method: 'post'
  }),
  getCommonPhotoList: data => http({
    url: '/common/family_friend',
    data,
    method: 'post'
  }),
  getCommonPhotosDetails: data => http({
    url: '/common/family_friend_details',
    data,
    method: 'POST'
  }),
}