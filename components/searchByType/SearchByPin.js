import React, {useContext, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { getCalenderByPin } from "../../actions/get_calender_by_type"

import { AppointmentContext } from "../../pages/index"

const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: "1.5em"
    },
    btn: {
      marginLeft: "1.5em"
    }
  }));

function SearchByPin() {

    const classes = useStyles();
    const [pincodeState, setPincodeState] = useState(null)
    const appointmentContext = useContext(AppointmentContext)

    const handleSearchClick = async (pincode) => {
      const appointmentResults = await getCalenderByPin(pincode, appointmentContext)
    }

    const handlePincodeChange = (e) => {
      e.preventDefault()
      setPincodeState(e.target.value)
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
          <Box display="flex" justifyContent="center" m={0} p={0} bgcolor="background.paper">
            <Box>
              <TextField id="standard-basic" label="Enter your PIN" fullWidth={true} onChange={(e) => {handlePincodeChange(e)}}/>
            </Box>
            {/* align button vertiacally at center */}
            <Box display="flex" alignItems="flex-end" className={classes.btn}>
              <Box>
                <Button variant="contained" color="primary" onClick={() => {handleSearchClick(pincodeState)}}>
                  Search
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
    )
}

export default SearchByPin
