import { Button, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../shared/Notification/notificationSlice';
import { setAuth, setToken } from '../../authSlice';

const Login = () => {

  const { handleSubmit, register } = useForm();
  const [ isLoading, setIsLoading ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async data => {
    setIsLoading(true);
    try {
      const res = await axios.post('/users/login', data);
      dispatch(setToken(res.data.token));
      dispatch(setAuth({
        ...res.data, authStatus: 'authenticated'
      }));
      navigate('/users/all_users');
    } catch (error) {
      if(error.response.status === 401) {
        dispatch(showNotification({
          variant: "danger",
          message: "Invalid credentials",
        }));
      }
    } finally { setIsLoading(false); }
  }

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            {...register("email")}
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-5" controlId="passworrd">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            {...register("password")}
          />
          <Link to="/auth/reset_password" className='d-inline-block mt-1'>
            Forgot your password?
          </Link>
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
      
      <p className='mt-4'>
        Don&apos;t have an account? {" "}
        <Link to="/auth/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default Login