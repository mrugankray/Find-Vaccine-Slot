import React, { useReducer, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from "../components/layouts/NavBar"
import Tabs from "../components/layouts/Tabs"
import SearchByPin from "../components/searchByType/SearchByPin"
import Result from "../components/results/Result"
import Filter from "../components/layouts/Filter"

import { SET_APPOINTMENT, RESET_APPOINTMENT, APPOINTMENT_ERROR } from "../actions/types"

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const AppointmentContext = React.createContext()
export const FilterByAgeContext = React.createContext()
export const SearchTypeContext = React.createContext()

const initialAppointmentState = {
  centers: []
}
const appointmentReducer = (state, action) => {
  switch(action.type) {
    case SET_APPOINTMENT:
      return {
        centers: state.centers.concat(action.value)
      }
    case APPOINTMENT_ERROR:
    case RESET_APPOINTMENT:
      return {
        centers: []
      }
    default:
      return state
  }
}

export default function Home() {

  const [appointmentState, appointmentDispatch] = useReducer(appointmentReducer, initialAppointmentState)
  const [filterByAgeState, setFilterByAge] = useState("all")
  const [searchTypeState, setSearchType] = useState(0)

  return (
    <>
      <Head>
        <title>Find Vaccine Slot - Home</title>
      </Head>
      <NavBar />
      <Box display="flex" justifyContent="center" m={0} p={0}>
        <Box p={0}>
          <Typography variant="h4">Check Slots for vaccine</Typography>
        </Box>
      </Box>
      <Container maxWidth="md">
        <SearchTypeContext.Provider value={{searchTypeState, setSearchType}}>
          <Tabs />
          <AppointmentContext.Provider value={{appointmentState, appointmentDispatch}}>
            <Box display="flex" justifyContent="center" m={0} p={0}>
                <Box p={0}>
                      <SearchByPin /> 
                </Box>
            </Box>
            <FilterByAgeContext.Provider value={{filterByAgeState, setFilterByAge}}>
              <Filter />
              <Result />
            </FilterByAgeContext.Provider>
          </AppointmentContext.Provider>
        </SearchTypeContext.Provider>
      </Container>
    </>
  )
}
