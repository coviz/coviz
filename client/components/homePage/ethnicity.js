import { use } from 'chai'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchEthnicities} from '../../store/ethnicity'

const EthnicityChart = (props) => {
    useEffect(() => {
        props.fetchEthnicities()
    }, [])
    console.log(props)
    return (
        <div>this is the ethnicities chart component</div>
    )
}

const mapState = (state) => {
    return {
        usData: state.ethnicities.usData
    }
}
const mapDispatch = {
    fetchEthnicities: fetchEthnicities
}

export const Ethnicity = connect(mapState, mapDispatch)(
    EthnicityChart
)