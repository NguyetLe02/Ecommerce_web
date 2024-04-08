import axios from '../axios'

export const apiGetProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'get',
})

export const apiGetStyle = () => axios({
    url: '/style',
    method: 'get',
})

export const apiGetBrands = () => axios({
    url: '/brand',
    method: 'get',
})