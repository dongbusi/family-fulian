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
  }),
  getNewsList: data => http({
    data,
    method: 'POST',
    url: '/common/dynamic'
  }),
  getNewsDetails: data => http({
    url: '/api/dynamic_details',
    data,
    method: 'POST'
  }),
  getCommonNewsDetails: data => http({
    url: '/common/dynamic_details',
    data,
    method: 'POST'
  })
}