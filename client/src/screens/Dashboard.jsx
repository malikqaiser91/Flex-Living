import { useState } from 'react'

import MondayReservation from '../components/MondayReservation'
import RentalReservation from '../components/RentalReservation'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-3 nav flex-column nav-item">
          <li className="nav-item  mb-5">
            <button
              className={`${
                activeTab === 'tab1' ? 'btn btn-dark' : 'btn border-dark'
              }`}
              onClick={() => setActiveTab('tab1')}
            >
              Monday Reservations
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`${
                activeTab === 'tab2' ? 'btn btn-dark' : 'btn border-dark'
              }`}
              onClick={() => setActiveTab('tab2')}
            >
              Rentals United Reservations
            </button>
          </li>
        </div>
        <div className="col-9">
          {activeTab === 'tab1' ? <MondayReservation /> : <RentalReservation />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
