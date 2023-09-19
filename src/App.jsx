
import { RouterProvider } from 'react-router-dom'
import router from './router'
import Notification from './shared/Notification/Notification.component'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { authenticateThunk } from './auth/authSlice'

const App = () => {

    const dispatch = useDispatch();
    const { authStatus } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(authenticateThunk());
    }, [ dispatch ]);

    if(authStatus === 'pending'){
        return <Spinner />
    }
    return (
        <>
            <RouterProvider router={router} />
            <Notification />
        </>
    )
}

export default App