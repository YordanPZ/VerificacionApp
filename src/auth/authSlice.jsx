import { createSlice } from '@reduxjs/toolkit';
import axios from '../utils/axios';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authStatus: 'pending', // 'authenticated' | 'notAuthenticated' | 'pending'
        user: null,
        token: '',
    },
    reducers: {
        setAuth: (_, { payload }) => payload,
        logout: () => {
            localStorage.setItem('token', '');
            return {
                authStatus: 'notAuthenticated',
                user: null,
                token: '',
            }
        },
        setToken: (state, { payload: token }) => {
            localStorage.setItem('token', token);
            state.token = token;
        }
    }
})

export const authenticateThunk = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(logout());
    setToken(token);
    axios.get('/users/me', { headers: { Authorization: `Bearer ${token}`}})
        .then(res => dispatch(setAuth({
            authStatus: 'authenticated',
            user: res.data,
            token,
        })))
        .catch(() => dispatch(logout()))
}


export const { setAuth, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
