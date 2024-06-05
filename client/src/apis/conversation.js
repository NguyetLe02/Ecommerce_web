import axios from '../axios'

export const apiGetConversations = (uid) => axios({
    url: '/conversation/' + uid,
    method: 'get'
})

export const apiGetConversationWithAdmin = (uid) => axios({
    url: '/conversation/current/' + uid,
    method: 'get'
})
