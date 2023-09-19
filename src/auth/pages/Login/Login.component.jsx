import { Button, Form, Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import axios from "../../../utils/axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { showNotification } from "../../../shared/Notification/notificationSlice"
import { setAuth, setToken } from "../../authSlice"

const Login = () => {
  const { handleSubmit, register } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (data) => {
    setIsLoading(true)
    dispatch(
      showNotification({
        variant: "warning",
        message: "Hey! This could take a second..."
      })
    )
    try {
      const res = await axios.post(
        "https://loginapp-g0zp.onrender.com/users/login",
        data
      )
      dispatch(setToken(res.data.token))
      dispatch(
        setAuth({
          ...res.data,
          authStatus: "authenticated"
        })
      )
      navigate("/users/all_users")
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(
          showNotification({
            variant: "danger",
            message: "Invalid credentials"
          })
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div className="bg-info rounded p-2 text-white my-4 text-break">
        <p className="fw-bold text-decoration-underline text-decoration-underline-offset-5">
          To fully test sign up and verification, register your own account. To
          explore the app, you can use:
        </p>
        <p>Email: yordanpz@hotmail.com</p>
        <p>Password:123</p>
      </div>
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
          <Link to="/auth/reset_password" className="d-inline-block mt-1">
            Forgot your password?
          </Link>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </Form>

      <p className="mt-4">
        Don&apos;t have an account? <Link to="/auth/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default Login
