import axios from 'axios';


const token = '1|echtH3gdgoDRoV1v4sSpDD68K5yPEkOUK4XGUHIL70c34e72';

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
})




