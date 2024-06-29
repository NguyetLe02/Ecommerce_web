import axios from '../axios'

export const apiGetBlog = () => axios({
    url: '/blog',
    method: 'get',
})
export const apiGetBlogById = (blogId) => axios({
    url: '/blog/' + blogId,
    method: 'get',
})