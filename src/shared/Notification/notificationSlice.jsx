import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name: 'toast',
    initialState: {
        show: false,
        variant: "success",
        header: "",
        message: ""
    },
    reducers: {
        showNotification: (_, { payload }) => {
            return { show: true, ...payload };
        },
        closeNotification: (state) => {
            state.show = false;
        }
    }
})

export const { showNotification, closeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
