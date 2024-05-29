import axios from '../axios'

export const apiGetOrderItems = () => axios({
    url: '/orderDetail',
    method: 'get'
})

export const apiUpdateOrderDetail = (data, odid) => axios({
    url: '/orderDetail/' + odid,
    method: 'put',
    data
})