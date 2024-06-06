import axios from '../axios'

export const apiGetUsableVouchers = () => axios({
    url: '/voucher',
    method: 'get'
})

export const apiGetVoucher = (vid) => axios({
    url: '/voucher/' + vid,
    method: 'get'
})

export const apiRemoveVoucher = (vid) => axios({
    url: '/voucher/' + vid,
    method: 'delete'
})

export const apiGetAllVouchers = () => axios({
    url: '/voucher',
    method: 'get'
})

export const apiCreateVoucher = (data) => axios({
    url: '/voucher',
    method: 'post',
    data
})

export const apiUpdateVoucher = (data, vid) => axios({
    url: '/voucher/' + vid,
    method: 'put',
    data
})