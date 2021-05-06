import React, {useContext, useEffect, useState, Fragment} from 'react'

import { AppointmentContext, FilterByAgeContext, SearchTypeContext }from "../../pages/index"

import { searchForSlots, filterByAge } from "../../actions/search_for_slots"

import RESET_APPOINTMENT from "../../actions/types"

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: "1em",
    },
    divider: {
        margin: "0.5em 0 1.5em 0"
    },
    vaccineCenterHeader: {
        marginBottom: "0.5em"
    },
    vaccineCenterText: {
        fontSize: "0.95rem",
        display: "block",
        marginBottom: "0.2em"
    },
    vaccineCenterCaption: {
        lineHeight: "1em"
    },
    typographyBlock: {
        display: "block"
    },
    cardRoot: {
        maxWidth: 275,
    },
    cardContent: {
        // margin: "1em 1em"
    },
    cardText: {
        fontSize: "0.9rem"
    }
  }));

function Result() {

    // const [slotsState, setSlots] = useState([
    //     {
    //         center_id: 123,
    //         name: "ala",
    //         fee_type: "kuch bhi bc",
    //         available_sessions: [
    //             {
    //                 session_id: 4789,
    //                 vaccine: "zdfh",
    //                 available_capacity: 70
    //             },
    //             {
    //                 session_id: 4789,
    //                 vaccine: "dfgbh",
    //                 available_capacity: 70
    //             }
    //         ]
    //     },
    //     {
    //         center_id: 456,
    //         name: "2nd",
    //         fee_type: "kuch bhi bc 22222",
    //         available_sessions: [
    //             {
    //                 session_id: 4789,
    //                 vaccine: "dfgbh",
    //                 available_capacity: 70
    //             }
    //         ]
    //     }
    // ])
    const [slotsState, setSlots] = useState([])
    const classes = useStyles()
    const appointmentContext = useContext(AppointmentContext)
    const filterByAgeContext = useContext(FilterByAgeContext)
    // const searchTypeContext = useContext(SearchTypeContext)

    useEffect(() => {
        // console.log(appointmentContext.appointmentState.centers)
        if(appointmentContext.appointmentState.centers.length > 0) {
            setSlots(searchForSlots(appointmentContext.appointmentState.centers))
        }
        else {
            setSlots([])
        }
    }, [appointmentContext])

    useEffect(() => {
        if(filterByAgeContext.filterByAgeState !== "all") {
            setSlots(filterByAge(appointmentContext.appointmentState.centers, parseInt(filterByAgeContext.filterByAgeState)))
            // console.log(filterByAgeContext.filterByAgeState)
        }
        else {
            setSlots(searchForSlots(appointmentContext.appointmentState.centers))
        }
        // console.log(filterByAgeContext)
    }, [filterByAgeContext])

    return (
        <>
            <Typography variant="h5" align="center">Results</Typography>
            <Divider variant="middle" className={classes.divider}/>
            {slotsState.length > 0 ? (
                slotsState.map((center, index) => (
                    <Fragment key={index}>
                        <div className={classes.vaccineCenterHeader}>
                            <Typography className={classes.vaccineCenterText} variant="h5">
                                {center.name}
                            </Typography>
                            <Typography className={clsx(classes.vaccineCenterCaption, classes.vaccineCenterText)} variant="caption" color="textSecondary">
                                PinCode: {center.pincode}
                            </Typography>
                            <Typography className={clsx(classes.vaccineCenterCaption, classes.vaccineCenterText)} variant="caption" color="textSecondary">
                                Fee: {center.fee_type}
                            </Typography>
                        </div>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {center.available_sessions.map((session) => (
                                <Box key={session.session_id} m={1}>
                                    <Card className={classes.cardRoot} variant="outlined">
                                        <CardContent>
                                            <Typography variant="body1" display="block" className={classes.cardText}>
                                                Availability date: {session.date}
                                            </Typography>
                                            <Typography variant="body1" display="block" className={classes.cardText}>
                                                Min age limit: {session.min_age_limit}
                                            </Typography>
                                            <Typography variant="body1" display="block" className={classes.cardText}>
                                                Available number of vaccines: {session.available_capacity}
                                            </Typography>
                                            <Typography variant="body1" display="block" className={classes.cardText}>
                                                Vaccine Name: {session.vaccine}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                    </Fragment>
                ))
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default Result
