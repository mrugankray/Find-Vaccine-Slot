const searchStateId = (statesList, searchState) => {
    // console.log(statesList, searchState)
    for(let i=0; i < statesList.length; i++) {
        let stateObj = statesList[i]
        if(stateObj.state_name === searchState) {
            // console.log(stateObj.state_id)
            return stateObj.state_id
        }
    }
}

export default searchStateId