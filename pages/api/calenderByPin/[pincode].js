// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"

const getAppointmentsForMultipleDates = async (numOfRequests, daysOfDataInEachReq, pincode) => {

  let appointments = {
    centers: []
  }

  let req=1

  const date = new Date
  const time = date.getTime()

  while(req<=numOfRequests) {
    req += 1

    // if today's date is one next req should be from 8 so req+1
    // converting into millisecs
    const nextTime = time+((req+1)*daysOfDataInEachReq)*24*60*60*1000
    const nextDate = new Date(nextTime)  

    // jan -> 0 in js but backend takes jan -> 1
    const formattedDate = `${nextDate.getDate()}-${nextDate.getMonth()}-${nextDate.getFullYear()}`

    const res = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${formattedDate}`)

    appointments.centers = appointments.centers.concat(res.data.centers)
  }

  if(req === 5) {
    return appointments
  }
}

export default async (req, res) => {

  const daysOfDataInEachReq = 7
  const numOfRequests = 4

  const appointments = await getAppointmentsForMultipleDates(numOfRequests, daysOfDataInEachReq, req.query.pincode)

  res.status(200).json(appointments)
}
