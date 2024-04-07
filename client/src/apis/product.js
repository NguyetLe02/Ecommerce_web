import axios from '../axios'

export const apiGetProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'get',
})