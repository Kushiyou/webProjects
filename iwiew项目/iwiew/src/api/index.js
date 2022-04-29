import axios from 'axios'

/* export const getMusicRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params,
        headers: {
            'accessToken': accessToken
        }
    });
}; */
let base = 'http://music.cyrilstudio.top'
const getRequestByKeyword =(url,data)=> axios({
    method:'get',
    url:`${base}${url}${data}`,
    data:data,
})


const getRequesBytId =(url,data)=> axios({
    method:'get',
    url:`${base}${url}${data}`,
    data:data,
})

export default{
    getRequestByKeyword,
    getRequesBytId,
}