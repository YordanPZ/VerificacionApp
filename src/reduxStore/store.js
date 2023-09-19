import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from '../shared/Notification/notificationSlice'
import authSlice from '../auth/authSlice'

export default configureStore({
  reducer: {
    notification: notificationSlice,
    auth: authSlice,
  },
})
