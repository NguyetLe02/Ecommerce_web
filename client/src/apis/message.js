import axios from '../axios'

export const apiGetMessages = (cvId) => axios({
    url: '/message/' + cvId,
    method: 'get'
})

export const apiSendMessage = (data) => axios({
    url: '/message',
    method: 'post',
    data
})
