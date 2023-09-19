import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../shared/Notification/notificationSlice';
import axios from '../../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

const ChangePassword = () => {

    const { handleSubmit, register } = useForm();
    const [ isLoading, setIsLoading ] = useState(false);
    const dispatch = useDispatch();
    const { code } = useParams();
    const navigate = useNavigate();

    const submit = async ({password, confirmPassword}) => {
        setIsLoading(true);
        if(password !== confirmPassword){
            dispatch(showNotification({
                header: 'Error!',
                message: `The passwords don't match`,
                variant: 'danger',
            }))
            setIsLoading(false);
            return;
        }
        try {
            await axios.post(`/users/reset_password/${code}`, { password })
            dispatch(showNotification({
                header: 'Password changed!',
                message: `Login with your new password`,
                variant: 'success',
            }));
            navigate('/auth/login');
        } finally { setIsLoading(false) }
    }

    return (
        <div>
            <h1 className="mb-5">Reset password</h1>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        {...register("password")}
                    />
                </Form.Group>
                <Form.Group className="mb-5" controlId="confirmPassword">
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password again"
                        {...register("confirmPassword")}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className='w-100'
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : 'Submit'}
                </Button>
            </Form>
        </div>
    )
}

export default ChangePassword