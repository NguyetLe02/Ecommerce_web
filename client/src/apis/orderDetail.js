import axios from '../axios'

export const apiGetOrderItems = () => axios({
    url: '/orderDetail',
    method: 'get'
})

export const apiGetAllOrderItems = () => axios({
    url: '/orderDetail/admin',
    method: 'get'
})

export const apiUpdateOrderDetail = (data, odid) => axios({
    url: '/orderDetail/' + odid,
    method: 'put',
    data
})

export const apiCreateOrderClaim = (data, odid) => axios({
    url: '/orderDetail/claim/' + odid,
    method: 'put',
    data
})