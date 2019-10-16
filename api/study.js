import http from '../utils/request'


export default {
  getStudyList: data => http({
    data,
    method: 'POST',
    url: '/common/study'
  }),
  getStudyDetails: data => http({
    url: '/api/study_details',
    data,
    method: 'POST'
  }),
  getCommonStudyDetails: data => http({
    url: '/common/study_details',
    data,
    method: 'POST'
  })
}