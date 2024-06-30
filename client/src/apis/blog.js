import axios from '../axios';

export const apiGetBlog = () => axios({
    url: '/blog',
    method: 'get',
});

export const apiGetBlogById = (bid) => axios({
    url: '/blog/' + bid,
    method: 'get',
});

export const apiLikeBlog = (bid) => axios({
    url: '/blog/like/' + bid,
    method: 'put',
});

export const apiDislikeBlog = (bid) => axios({
    url: '/blog/dislike/' + bid,
    method: 'put',
});
