import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo) navigate('/dashboard')
  }, [userInfo, navigate])
  return (
    <div
      style={{
        backgroundColor: '#f8f8ff',
        textAlign: 'center',
        height: '60vh',
      }}
      className="mt-5 p-5 rounded"
    >
      <h2>ONE PAGE STOP FOR ALL YOUR RESERVATION ✈️😃 !</h2>
      <Link className="btn btn-dark mt-5 btn-lg" to="/login">
        Get Started
      </Link>
    </div>
  )
}

export default HomeScreen
