import { Outlet } from 'react-router-dom'
import loginBackground from '../../../assets/login-background.mp4';
import './AuthLayout.styles.css';

const AuthLayout = () => {
    return (
        <div className='auth-container'>
            <div className="outlet-container">
                    <div className="w-100">
                        <Outlet />
                    </div>
            </div>
            <video
                className='video-background'
                src={loginBackground}
                autoPlay
                muted
                loop
            ></video>
        </div>
    )
}

export default AuthLayout