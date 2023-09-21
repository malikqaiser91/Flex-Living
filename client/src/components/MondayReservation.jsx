import { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  MondayUserTableHeading,
  MondayManagerTableHeading,
  capitalizeFirstLetter,
  formatISODateToReadable,
} from '../utils'
import { useMondayReservationQuery } from '../slices/reservationApiSlice'
import Spinner from '../components/Spinner'

const MondayReservation = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [reservations, setReservation] = useState([])
  const [filter, setFilter] = useState('')

  const { data, isLoading, refetch } = useMondayReservationQuery()

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    setReservation(data?.data)
  }, [setReservation, data])

  const clearFilter = () => {
    setFilter('')
    setReservation(data?.data)
  }

  const handleFilter = (e) => {
    const val = e.target.value

    setFilter(e.target.value)

    if (val === 'CheckIn') {
      setReservation(
        [...reservations].sort((a, b) => {
          const dateA = new Date(a.CheckIn_date)
          const dateB = new Date(b.CheckIn_date)
          return dateB - dateA
        })
      )
    }

    if (val === 'AscBookingVal') {
      setReservation(
        [...reservations].sort((a, b) => {
          return a.Booking_Value - b.Booking_Value
        })
      )
    }

    if (val === 'DscBookingVal') {
      setReservation(
        [...reservations].sort((a, b) => {
          return b.Booking_Value - a.Booking_Value
        })
      )
    }
  }

  return (
    <div>
      <p className="lead text-center text-decoration-underline">
        Monday Reservations
      </p>
      <div>
        <div className="form-group">
          <select
            name="filter"
            className="form-select shadow-none d-inline"
            id="filter"
            style={{ width: '30%' }}
            value={filter}
            // onChange={(e) => setFilter(e.target.value)}
            onChange={handleFilter}
          >
            <option value="" selected disabled>
              Filter
            </option>
            <option value="CheckIn">CheckIn</option>
            {userInfo.role === 'manager' && (
              <Fragment>
                <option value="AscBookingVal">Ascending Booking Value</option>
                <option value="DscBookingVal">Descending Booking Value</option>
              </Fragment>
            )}
          </select>
          {filter && (
            <button
              className="btn btn-dark"
              style={{ marginLeft: '10px' }}
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            {userInfo?.role === 'manager'
              ? MondayManagerTableHeading?.map((val) => (
                  <th scope="col">{val}</th>
                ))
              : MondayUserTableHeading?.map((val) => (
                  <th scope="col">{val}</th>
                ))}
          </tr>
        </thead>
        {isLoading ? (
          <div className="mt-4 text-center d-flex justify-content-center align-items-center">
            <Spinner />
          </div>
        ) : (
          <tbody>
            {reservations?.map((reservation, index) => (
              <tr key={index}>
                <td>{capitalizeFirstLetter(reservation?.Guest_Name)}</td>
                <td>{reservation?.Status}</td>
                <td>{reservation?.Flat_Booked}</td>
                <td>{reservation?.CheckIn_date}</td>
                <td>{reservation?.CheckOut_date}</td>
                <td>{reservation?.Creation_Log}</td>
                {reservation?.Booking_Value && userInfo.role === 'manager' ? (
                  <td>${reservation?.Booking_Value}</td>
                ) : (
                  ''
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  )
}

export default MondayReservation
