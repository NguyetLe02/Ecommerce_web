import axios from '../axios'

export const apiGetConversations = (uid) => axios({
    url: '/conversation/' + uid,
    method: 'get'
})
