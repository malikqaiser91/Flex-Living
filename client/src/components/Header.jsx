import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { logout } from '../slices/authSlice'
import { capitalizeFirstLetter } from '../utils'

const Header = () => {
  const { userInfo } = useSelector((state) => state?.auth)
  const pathName = window?.location?.pathname

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    toast.success('Logout successfully')
    navigate('/login')
  }

  const protectedLink = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <span className="nav-link" style={{ cursor: 'pointer' }}>
          {userInfo?.firstName + ' ' + userInfo?.lastName}{' '}
          <span>({capitalizeFirstLetter(userInfo?.role)})</span>
        </span>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </ul>
  )

  const otherLink = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item ">
        <Link
          className={`nav-link ${pathName === '/login' && 'active'}`}
          aria-current="page"
          to="/login"
        >
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${pathName === '/register' && 'active'}`}
          to="/register"
        >
          Register
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-lg  bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to={userInfo ? '/dashboard' : '/'}>
          Flex Living
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ outline: 'none' }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ outline: 'none' }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userInfo ? protectedLink : otherLink}
        </div>
      </div>
    </nav>
  )
}

export default Header
