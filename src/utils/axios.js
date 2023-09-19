import axiosOriginal from 'axios';
import store from '../reduxStore/store';
import { showNotification } from '../shared/Notification/notificationSlice';

const axios = axiosOriginal.create({
    baseURL: import.meta.env.VITE_API_URL
})

axios.interceptors.request.use(function (config) {
    const token = store.getState().auth.token;
    if(config.headers?.Authorization) return config;
    config.headers.Authorization =  `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use((res) => {
    return res;
}, error => {
    if(error.response?.status === 401) throw error;
    store.dispatch(showNotification({
        variant: "danger",
        message: "There was an error"
    }))
    console.log(error);
    throw error;
})

export default axios;
