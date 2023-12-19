import axios from 'axios';


const token = '1|7KmK9ZErDnEfmC79N3bfrdaUjh07uZi8bp4K0Ehja032a366';

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
})




