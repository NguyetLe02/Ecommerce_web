import axios from '../axios'

export const apiGetProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'get',
})

export const apiGetProducts = (params) => axios({
    url: '/product/',
    method: 'get',
    params
})

export const apiGetStyle = () => axios({
    url: '/style',
    method: 'get',
})

export const apiGetBrands = () => axios({
    url: '/brand',
    method: 'get',
})

export const apiRating = (data, pid) => axios({
    url: '/product/ratings/' + pid,
    method: 'put',
    data
})