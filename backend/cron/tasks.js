const cron = require('node-cron')
const convert = require('xml-js')
const { xmlData, mondayQuery } = require('../utils/index')
const RentalUnited = require('../model/RentalUnited')
const Monday = require('../model/Monday')

const job1 = cron.schedule('0 * * * *', async () => {
  await RentalUnited.deleteMany({})
  const response = await fetch(process.env.RENTAL_UNITED_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
    },
    body: xmlData,
  })

  if (!response.ok) {
    return new Error(`HTTP error! Status: ${response.status}`)
  }

  const xml = await response.text()
  const result = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 4 }))

  let reservations =
    result?.Pull_ListReservations_RS?.Reservations?.Reservation?.map(
      (reservation) => {
        return {
          Guest_Name: reservation?.CustomerInfo?.Name?._text,
          Status:
            reservation?.StatusID?._text === '1'
              ? 'Success'
              : reservation?.StatusID?._text === '2'
              ? 'Canceled'
              : reservation?.StatusID?._text === '3'
              ? 'Modified'
              : reservation?.StatusID?._text === '4'
              ? 'Request'
              : '',
          Flat_Booked: reservation?.StatusID?._text === '1' ? 'Yes' : 'No',
          CheckIn_date: new Date(
            reservation?.StayInfos?.StayInfo?.DateFrom?._text
          ),
          CheckOut_date: new Date(
            reservation?.StayInfos?.StayInfo?.DateTo?._text
          ),
          Guest_Email: reservation?.CustomerInfo?.Email?._text,
          Phone_Number: reservation?.CustomerInfo?.Phone?._text,
          Booking_Value: Number(
            reservation?.StayInfos?.StayInfo?.ReservationBreakdown?.RUBreakdown
              ?.Total?._text
          ),
        }
      }
    )

  await RentalUnited.insertMany(reservations)
  console.log('Rental data inserted successfully')
})

const job2 = cron.schedule('0 * * * *', async () => {
  await Monday.deleteMany({})
  const response = await fetch(process.env.MONDAY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.MONDAY_AUTHORIZATION_TOKEN,
      'API-Version': '2023-04',
    },
    body: JSON.stringify({
      query: mondayQuery,
    }),
  })
  const data = await response.json()
  const reservations = data?.data?.boards?.map((reservation) => {
    return {
      Guest_Name: reservation.name,
      Status:
        reservation?.items[0]?.column_values?.filter(
          (col) => col.id === 'status'
        )[0]?.text || null,
      Flat_Booked:
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.title === 'Flat Booked'
        )[0]?.text ||
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.id === 'dropdown5'
        )[0]?.text ||
        null,
      CheckIn_Date:
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.title === 'Check-in'
        )[0]?.text ||
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.id === 'date4'
        )[0]?.text ||
        null,
      CheckOut_Date:
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.title === 'Check-out'
        )[0]?.text ||
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.id === 'dup__of_date'
        )[0]?.text ||
        null,
      Creation_Log:
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.id === 'date4'
        )[0]?.text ||
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.title === 'Date' || col?.title === 'Due Date'
        )[0]?.text ||
        null,
      Booking_Value:
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.id === 'numbers1'
        )[0]?.text ||
        reservation?.items[0]?.column_values?.filter(
          (col) => col?.title === 'Net Revenue'
        )[0]?.text ||
        null,
    }
  })
  await Monday.insertMany(reservations)
  console.log('Monday reservation data inserted successfully')
})

module.exports = { job1, job2 }
