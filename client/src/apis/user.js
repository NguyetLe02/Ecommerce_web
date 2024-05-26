import axios from '../axios'

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data
})

export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data
})

export const apiCurrent = () => axios({
    url: '/user/current',
    method: 'get',
})

export const apiGetUsers = (params) => axios({
    url: '/user/',
    method: 'get',
    params
})

export const apiUpdateUser = (data, uid) => axios({
    url: '/user/' + uid,
    method: 'put',
    data
})

export const apiUpdateCurrent = (data) => axios({
    url: '/user/current',
    method: 'put',
    data
})

export const apiDeleteUser = (uid) => axios({
    url: '/user/' + uid,
    method: 'delete'
})

export const apiUpdateCart = (data) => axios({
    url: '/user/cart',
    method: 'put',
    data
})

export const apiRemoveCart = (data) => axios({
    url: '/user/removecart',
    method: 'delete',
    data
})

