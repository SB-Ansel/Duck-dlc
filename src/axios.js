import axios from 'axios';

let instance = axios.create();

instance.interceptors.request.use(request => {
    // console.log(request)

    // console.log(state);

    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
})

export default instance;