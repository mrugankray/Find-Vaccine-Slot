import axios from "axios"

import { SET_APPOINTMENT, APPOINTMENT_ERROR, RESET_APPOINTMENT } from "./types"

const getAppointmentsForMultipleDates = async (numOfRequests, daysOfDataInEachReq, url) => {

  let appointments = {
    centers: []
  }

  let req=1

  const date = new Date
  const time = date.getTime()

  while(req<=numOfRequests) {
    // if today's date is one next req should be from 8 so req+1
    // converting into millisecs
    const nextTime = null
    if(req === 1) { // if it is the first req don't add 1 week to it
      nextTime = time 
    }
    else {
      // (req-1)*daysOfDataInEachReq:   N/A   7[(2-1)*7]
      // date:                          1     8  
      nextTime = time+((req-1)*daysOfDataInEachReq)*24*60*60*1000
    }

    const nextDate = new Date(nextTime)

    // jan -> 0 in js but backend takes jan -> 1
    const dateOnly = (nextDate.getDate() < 10 ? "0" : "") + nextDate.getDate()
    const monthOnly = (nextDate.getMonth() + 1 < 10 ? "0" : "") + (nextDate.getMonth() + 1)
    const yearOnly = (nextDate.getFullYear() < 10 ? "0" : "") + nextDate.getFullYear()

    const formattedDate = `${dateOnly}-${(monthOnly)}-${yearOnly}`

    const res = await axios.get(`${url}date=${formattedDate}`)

    appointments.centers = appointments.centers.concat(res.data.centers)
    req += 1
  }

  if(req === 5) {
    return appointments
  }
}

const makeReqByPin = async (daysOfDataInEachReq, numOfRequests, pincode) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&`
  const appointments = await getAppointmentsForMultipleDates(numOfRequests, daysOfDataInEachReq, url)

  return appointments
}

const makeReqByDistrict = async (daysOfDataInEachReq, numOfRequests, district_id) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&`
  const appointments = await getAppointmentsForMultipleDates(numOfRequests, daysOfDataInEachReq, url)

  return appointments
}

export const getCalenderByPin = async (pincode, context) => {
    try {
        const daysOfDataInEachReq = 7
        const numOfRequests = 4
        const appointment = await makeReqByPin(daysOfDataInEachReq, numOfRequests, pincode)
        context.appointmentDispatch({type: RESET_APPOINTMENT})
        context.appointmentDispatch({type: SET_APPOINTMENT, value: appointment.centers}) 
    } catch (error) {
        console.log(error.response.status)
        context.appointmentDispatch({type: APPOINTMENT_ERROR})
        return
    }
} 

export const getCalenderByDistrict = async (district_id, context) => {
  try {
      const daysOfDataInEachReq = 7
      const numOfRequests = 4
      const appointment = await makeReqByDistrict(daysOfDataInEachReq, numOfRequests, district_id)
      context.appointmentDispatch({type: RESET_APPOINTMENT})
      context.appointmentDispatch({type: SET_APPOINTMENT, value: appointment.centers})
      // return appointment   
  } catch (error) {
      console.log(error.response.status)
      context.appointmentDispatch({type: APPOINTMENT_ERROR})
      return
  }
} 