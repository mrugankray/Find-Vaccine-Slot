import axios from "axios"

import { SET_APPOINTMENT, APPOINTMENT_ERROR, RESET_APPOINTMENT } from "./types"

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

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${formattedDate}`)

    appointments.centers = appointments.centers.concat(res.data.centers)
  }

  if(req === 5) {
    return appointments
  }
}

const makeReq = async (pincode) => {

  const daysOfDataInEachReq = 7
  const numOfRequests = 4

  const appointments = await getAppointmentsForMultipleDates(numOfRequests, daysOfDataInEachReq, pincode)

  return appointments
}

export const getCalenderByPin = async (pincode, context) => {
    try {
        // const appointment = await axios.get(`/api/calenderByPin/${pincode}`)
        // const appointment = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=04-05-2021`)
        const appointment = await makeReq(pincode)
        context.appointmentDispatch({type: RESET_APPOINTMENT})
        context.appointmentDispatch({type: SET_APPOINTMENT, value: appointment.centers})
        // return appointment   
    } catch (error) {
        console.log(error.response.status)
        context.appointmentDispatch({type: APPOINTMENT_ERROR})
        return
    }
} 