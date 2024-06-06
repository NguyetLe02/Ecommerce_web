import axios from '../axios'

export const apiGetBrands = () => axios({
    url: '/brand',
    method: 'get',
})

export const apiAddBrand = (data) => axios({
    url: '/brand',
    method: 'post',
    data
})

export const apiRemoveBrand = (bid) => axios({
    url: '/brand/' + bid,
    method: 'delete',
})