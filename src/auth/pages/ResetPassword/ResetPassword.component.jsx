
import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import axios from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../../../shared/Notification/notificationSlice';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {

    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async ({ email }) => {
        setIsLoading(true);
        try {
            const frontBaseUrl = location.protocol + '//' + location.host;
            const body = { email, frontBaseUrl }
            await axios.post('/users/reset_password', body);
            navigate('/auth/login');
            dispatch(showNotification({
                header: 'Email sent!',
                message: `An email was sent to ${email} with the instructions to reset your password`,
                variant: 'success',
            }))
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            <h1 className="mb-5">Reset password</h1>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-5" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email")}
                    />
                    <Form.Text className="text-muted">
                        Insert your email to reset your password
                    </Form.Text>
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

export default ResetPassword