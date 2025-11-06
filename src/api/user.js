import request from '@/utils/request'
//request返回promise对象：request本质是axios，axios所有请求方法都返回promise
export function login(data) {
  return request({
    //后端api接口地址
    url: '/user/login',
    method: 'post',
    data
  })
}
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}
export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}
export function updateUser(id, data) {
  return request({
    url: `/user/update/${id}`,
    method: 'put',
    data
  })
}
export function deleteUser(id) {
  return request({
    url: `/user/update/${id}`,
    method: 'delete'
  })
}
