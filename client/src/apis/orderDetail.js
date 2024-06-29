import axios from '../axios'

export const apiGetOrderItems = () => axios({
    url: '/orderDetail',
    method: 'get'
})

export const apiGetAllOrderItems = (data) => axios({
    url: '/orderDetail/admin',
    method: 'get',
    params: data
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

export const apiUpdateOrderClaim = (data, odid) => axios({
    url: '/orderDetail/claimstatus/' + odid,
    method: 'put',
    data
})