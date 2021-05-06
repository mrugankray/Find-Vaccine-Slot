import React, {useState, useReducer, useContext} from 'react'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { FilterByAgeContext }from "../../pages/index"

const useStyles = makeStyles((theme) => ({
    radioInline: {
      display: "inline"
    }
  }));

function Filter() {

    const classes = useStyles()
    // const [value, setValue] = useState("all")
    const filterByAgeContext = useContext(FilterByAgeContext)

    const handleChange = (event) => {
        // setValue(event.target.value);
        filterByAgeContext.setFilterByAge(event.target.value)
    };

    return (
        <>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Filter by age</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={filterByAgeContext.filterByAgeState} onChange={handleChange} className={classes.radioInline}>
                        <FormControlLabel value="all" control={<Radio />} label="All Age" />
                        <FormControlLabel value="18" control={<Radio />} label="18 - 44" />
                        <FormControlLabel value="45" control={<Radio />} label="45+" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </>
    )
}

export default Filter
