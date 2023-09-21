import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    if (userInfo) navigate('/dashboard')
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!email || !password)
      return toast.error('Please include all the fields.')
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res.data }))
      toast.success('Login successfully')
      navigate('/dashboard')
    } catch (err) {
      return toast.error(err.data.error || err.error || 'Server Error')
    }
  }

  return (
    <div className="row mt-5 ">
      <div
        className="col-sm-5 mx-auto p-5 rounded"
        style={{
          backgroundColor: '#f8f8ff',
          height: '60vh',
        }}
      >
        <h3 className="text-center mb-3">LOGIN</h3>
        <form onSubmit={submitHandler} className="mb-3">
          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter email"
              className="form-control shadow-none"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter password"
              className="form-control shadow-none"
            />
          </div>
          {isLoading ? (
            <div className="mt-5">
              <Spinner />
            </div>
          ) : (
            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          )}
        </form>
        <small>
          New an account ?{' '}
          <Link to="/register" style={{ color: '#333' }}>
            Register here.
          </Link>
        </small>
      </div>
    </div>
  )
}

export default Login
