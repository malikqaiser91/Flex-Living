const xmlData = `<Pull_ListReservations_RQ>
<Authentication>
    <UserName>${process.env.RENTAL_UNITED_USERNAME}</UserName>
    <Password>${process.env.RENTAL_UNITED_PASSWORD}</Password>
</Authentication>
<DateFrom>${process.env.RENTAL_UNITED_DATE_FROM}</DateFrom>
<DateTo>${process.env.RENTAL_UNITED_DATE_TO}</DateTo>
<LocationID>${process.env.RENTAL_UNITED_LOCATION_TO}</LocationID>
</Pull_ListReservations_RQ>`

const mondayQuery = `{ boards (limit:100) {
  name
  id
  description
  items {
    name
    column_values {
      title
      id
      type
      text
} } } }`

module.exports = {
  xmlData,
  mondayQuery,
}
