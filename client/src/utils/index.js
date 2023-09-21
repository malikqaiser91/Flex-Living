export const capitalizeFirstLetter = (str) => {
  if (str?.length === 0) {
    return str
  }
  return str?.charAt(0).toUpperCase() + str?.slice(1)
}

export const formatISODateToReadable = (dateStr) => {
  const date = new Date(dateStr)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)

  return formattedDate
}

export const MondayUserTableHeading = [
  'Guest name',
  'Status',
  'Flat booked',
  'Checkin date',
  'Checkout date',
  'Creation log',
]

export const MondayManagerTableHeading = [
  'Guest name',
  'Status',
  'Flat booked',
  'Checkin date',
  'Checkout date',
  'Creation log',
  'Booking value',
]

export const RentalUserTableHeading = [
  'Guest name',
  'Status',
  'Flat booked',
  'Checkin date',
  'Checkout date',
  'Guest email',
  'Phone number',
]

export const RentalManagerTabHeading = [
  'Guest name',
  'Status',
  'Flat booked',
  'Checkin date',
  'Checkout date',
  'Guest email',
  'Phone number',
  'Booking value',
]
