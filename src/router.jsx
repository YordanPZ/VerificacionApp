import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import authRouter from './auth/authRouter';
import userRouter from './users/userRouter';

const router = createBrowserRouter([
    authRouter,
    userRouter,
    {
        path: "*",
        element: <Navigate to="/auth/login" />
    },
]);

export default router;