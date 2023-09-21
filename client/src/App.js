import { useEffect } from 'react'
import { logout } from './slices/authSlice'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime')
    const currentTime = new Date().getTime()
    if (expirationTime) {
      if (currentTime > expirationTime) dispatch(logout())
    }
  }, [dispatch])
  return (
    <div className='container-main'>
      <Header />
      <ToastContainer autoClose={1200} />
      <div className="container" id='body'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
