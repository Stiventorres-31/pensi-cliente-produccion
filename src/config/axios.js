import axios from 'axios';
import storage from '../storage/storage';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
    baseURL: storage.getAPI_URL(),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});






export default axiosInstance;