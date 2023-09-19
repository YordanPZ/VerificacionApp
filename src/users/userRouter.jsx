import ProtectedRoute from '../shared/ProtectedRoute/ProtectedRoute.component';
import AllUsers from './pages/AllUsers/AllUsers.component';
import UsersLayout from './pages/UsersLayout/UsersLayout.component';

const userRouter = {
    path: "users",
    element: <ProtectedRoute><UsersLayout /></ProtectedRoute>,
    children: [
        {
            path: "all_users",
            element: <AllUsers />,
        },
    ]
}

export default userRouter;