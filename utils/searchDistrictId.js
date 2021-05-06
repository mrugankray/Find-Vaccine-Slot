const searchDistrictId = (districtList, searchDistrict) => {
    // console.log(statesList, searchState)
    for(let i=0; i < districtList.length; i++) {
        let districtObj = districtList[i]
        if(districtObj.district_name === searchDistrict) {
            // console.log(stateObj.state_id)
            return districtObj.district_id
        }
    }
}

export default searchDistrictId