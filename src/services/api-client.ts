import axios from 'axios';


const token = '1|YQd4qPDrQw2eVgD4PPhzGMCGkmoLbXJvXDWpnOB8660919b7';

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
})




