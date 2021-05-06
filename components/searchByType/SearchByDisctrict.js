import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

import searchStateId from "../../utils/searchStateId"
import searchDistrictId from "../../utils/searchDistrictId"
import {base_url} from "../../utils/backendUrl"

import { getCalenderByDistrict } from "../../actions/get_calender_by_type"

import { AppointmentContext } from "../../pages/index"

const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: "1.5em"
    },
    discrict: {
        marginLeft: "1em"
    },
    autoComplete: {
        minWidth: 230
    }
  }));

function SearchByDisctrict() {

    const classes = useStyles()
    const appointmentContext = useContext(AppointmentContext)
    const [metadataState, setMetadata]= useState({
        states: [],
        districts: []
    })
    const [formData, setFormData] = useState({
        selectedState: null,
        selectedDiscrict: null
    })

    useEffect(() => {
        const getStateMetadata = async() => {
            const statesRes = await axios.get(`${base_url}/api/v2/admin/location/states`)
            setMetadata({...metadataState, states: statesRes.data.states})
        }
        getStateMetadata()
    }, [])

    useEffect(() => {
        const getDiscrictMetadata = async() => {
            const districtRes = await axios.get(`${base_url}/api/v2/admin/location/districts/${formData.selectedState}`)
            if(metadataState.states.length > 0) {
                setMetadata({...metadataState, districts: districtRes.data.districts})
            }
        }
        getDiscrictMetadata()
    }, [formData.selectedState])

    const handleStateFormOnChange = (val) => {
        const state_id = searchStateId(metadataState.states, val)
        setFormData({...formData, selectedState: state_id})
    }

    const handleDiscrictFormOnChange = (val) => {
        const district_id = searchDistrictId(metadataState.districts, val)
        setFormData({...formData, selectedDiscrict: district_id})
    }

    const handleSearchClick = async () => {
        const appointmentResults = await getCalenderByDistrict(formData.selectedDiscrict, appointmentContext)
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Box display="flex" justifyContent="center" m={0} p={0} bgcolor="background.paper">
                <Box>
                    <Autocomplete
                        id="states"
                        freeSolo
                        // autoSelect={true}
                        options={metadataState.states.map((state) => state.state_name)}
                        // onChange={(e, value) => {console.log(value)}}
                        onChange={(e, val) => {handleStateFormOnChange(val)}}
                        renderInput={(params) => (
                        <TextField {...params} label="Search State" margin="normal" variant="outlined" 
                        className={classes.autoComplete}/>
                        )}
                    />
                </Box>
                {/* align button vertiacally at center */}
                <Box display="flex" alignItems="flex-end" className={classes.discrict}>
                    <Box>
                        <Autocomplete
                            id="discrict"
                            freeSolo
                            options={metadataState.districts.map((discrict) => discrict.district_name)}
                            onChange={(e, val) => {handleDiscrictFormOnChange(val)}}
                            renderInput={(params) => (
                            <TextField {...params} label="Search Discrict" margin="normal" variant="outlined" 
                            className={classes.autoComplete}/>
                            )}
                        />
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" className={classes.discrict}>
                    <Box>
                        <Button variant="contained" color="primary" onClick={() => {handleSearchClick()}}>
                        Search
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    )
}

export default SearchByDisctrict
