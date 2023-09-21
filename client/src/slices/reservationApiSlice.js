import { apiSlice } from './apiSlice'
import { RESERVATION_URL } from '../constants'

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    rentalReservation: builder.query({
      query: (data) => ({
        url: `${RESERVATION_URL}/rental-united`,
        method: 'GET',
      }),
    }),
    mondayReservation: builder.query({
      query: (data) => ({
        url: `${RESERVATION_URL}/monday`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useRentalReservationQuery, useMondayReservationQuery } =
  reservationApiSlice
