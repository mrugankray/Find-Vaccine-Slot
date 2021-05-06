export const searchForSlots = (centers) => {
    let availableAppointments = []
    centers.forEach(center => {
        const tempCenters = {
            center_id: center.center_id,
            name: center.name,
            fee_type: center.fee_type,
            pincode: center.pincode,
            available_sessions: []
        }
        center.sessions.forEach(session => {
            if(session.available_capacity > 0) {
                tempCenters.available_sessions.push(session)
            }
        });
        if(tempCenters.available_sessions.length > 0) {
            availableAppointments.push(tempCenters)
        }
    });
    return availableAppointments
}

export const filterByAge = (centers, min_age_limit) => {
    let availableAppointments = []
    centers.forEach(center => {
        const tempCenters = {
            center_id: center.center_id,
            name: center.name,
            fee_type: center.fee_type,
            pincode: center.pincode,
            available_sessions: []
        }
        center.sessions.forEach(session => {
            if(session.available_capacity > 0 && session.min_age_limit === min_age_limit) {
                // console.log(session.min_age_limit === min_age_limit)
                tempCenters.available_sessions.push(session)
            }
        });
        if(tempCenters.available_sessions.length > 0) {
            availableAppointments.push(tempCenters)
        }
    });
    return availableAppointments
}