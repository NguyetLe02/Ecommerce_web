import axios from '../axios'

export const apiCreateOrder = (data) => axios({
    url: '/order',
    method: 'post',
    data
})