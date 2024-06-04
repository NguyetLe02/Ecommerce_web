import axios from '../axios'

export const apiGetUsableVouchers = () => axios({
    url: '/voucher',
    method: 'get'
})

export const apiGetVoucher = (vid) => axios({
    url: '/voucher' + vid,
    method: 'get'
})