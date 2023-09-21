import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { useRegisterMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    if (userInfo) navigate('/dashboard')
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password)
      return toast.error('Please include all the fields.')
    try {
      const res = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap()
      dispatch(setCredentials({ ...res.data }))
      toast.success('Register successfully')
      navigate('/dashboard')
    } catch (err) {
      return toast.error(err.data.error || err.error || 'Server Error')
    }
  }

  return (
    <div className="row mt-3 ">
      <div
        className="col-sm-5 mx-auto p-5 rounded"
        style={{
          backgroundColor: '#f8f8ff',
          height: '75vh',
        }}
      >
        <h3 className="text-center ">REGISTER</h3>
        <form onSubmit={submitHandler} className="mb-3">
          <div className="form-group mb-3">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="firstName"
              placeholder="Enter first name"
              className="form-control shadow-none"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
              placeholder="Enter last name"
              className="form-control shadow-none"
            />
          </div>
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
            <Spinner />
          ) : (
            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          )}
        </form>
        <small>
          Already have an account ?{' '}
          <Link to="/login" style={{ color: '#333' }}>
            Login here.
          </Link>
        </small>
      </div>
    </div>
  )
}

export default Register
