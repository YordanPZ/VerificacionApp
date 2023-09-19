import AuthLayout from './pages/AuthLayout/AuthLayout.component';
import ChangePassword from './pages/ChangePassword/ChangePassword.component';
import Login from './pages/Login/Login.component';
import ResetPassword from './pages/ResetPassword/ResetPassword.component';
import SignUp from './pages/SignUp/SignUp.component';
import VerificateEmail from './pages/VerificateEmail/VerificateEmail.component';

const authRouter = {
    path: "auth",
    element: <AuthLayout />,
    children: [
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "signup",
            element: <SignUp />,
        },
        {
            path: "verify_email/:email_code",
            element: <VerificateEmail />,
        },
        {
            path: 'reset_password',
            element: <ResetPassword />,
        },
        {
            path: 'reset_password/:code',
            element: <ChangePassword />,
        },
    ]
}

export default authRouter;
