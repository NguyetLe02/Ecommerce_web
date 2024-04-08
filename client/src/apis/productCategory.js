import axios from '../axios'

export const apiGetProductCategories = () => axios({
    url: '/productcategory',
    method: 'get',
})