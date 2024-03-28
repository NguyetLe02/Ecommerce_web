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