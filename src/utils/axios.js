import axios from 'axios';



const instance = axios.create({
    baseURL: 'https://backend.logixjunction.com',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

export default instance;