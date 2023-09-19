import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.styles.css';
import axios from '../../../utils/axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../shared/Notification/notificationSlice';

const SignUp = () => {

  const { register, handleSubmit, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async userData => {
    const frontBaseUrl = location.protocol + '//' + location.host;
    const body = { ...userData, frontBaseUrl }
    setIsLoading(true);
    try {
      await axios.post('/users', body);
      navigate('/auth/login');
      dispatch(showNotification({
        header: 'Account created!',
        message: `An email was sent to ${body.email} with the instructions to create your account`,
        variant: 'success',
      }))
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email")} />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="passworrd">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password")} />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="firstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control type="text" placeholder="Enter firstname" {...register("firstName")} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="lastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" placeholder="Enter lastname" {...register("lastName")} />
            </Form.Group>
          </Col>
        </Row>


        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter country" {...register("country")} />
        </Form.Group>

        <div className="image-container mb-3">
          <div className="input">
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" placeholder="Enter image url" {...register("image")} />
            </Form.Group>
          </div>

          <div className="image-placeholder">
            <img src={watch('image')} alt="" />
          </div>
        </div>

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
        Already have an account? {" "}
        <Link to="/auth/login">Login</Link>
      </p>
    </div>
  )
}

export default SignUp