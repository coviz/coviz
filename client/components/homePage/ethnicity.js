import React, {useEffect, useLayoutEffect} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {fetchEthnicities} from '../../store/ethnicity'
import {drawChart, initChart} from '../chartd3/BasicD3'

export  const EthnicityChart = (props) => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.ethnicities.usData)
    console.log('dataaaa1', data[0])
    // dispatch(fetchEthnicities())
    
    useEffect(() => {
        dispatch(fetchEthnicities())
        console.log('dataaaa2', data)
    }, [])
    useEffect(() => {
        initChart(400, 600);
        console.log('is it the 1st time?')
        console.log('data rn: ', data)
        // if (data !== null || data !== undefined || Object.keys(data).length>0 ) {
        //     console.log('is it the 2nd time?')
        //     console.log('data rn: ', data)
        //     console.log('data at 0 index', data[0])
        //     let mappedData = Object.keys(data[0]).map(ethnKey => {
        //     if (ethnKey.includes('Totals')) {
        //         return data[0][ethnKey]
        //     }
        //     })
        //     console.log('this is the mapped data', mappedData)
        //     drawChart(400, 600, mappedData)
        // } else {
        //     console.log('damn')
        // }
        console.log(data==={},  data)
        
        drawChart(400, 600, data)
    }, [])
    
    console.log(data[0])
    // let mappedData = Object.keys(data[0]).map(ethnKey => {
    //     if (ethnKey.includes('Totals')) {
    //         return data[0][ethnKey]
    //     }
    // })
    // console.log(mappedData)
    // console.log(props)
    return (
        <div>
            <div>this is the ethnicities chart component</div>
            <div id='chart' />
        </div>
        
    )
}

// const mapState = (state) => {
//     return {
//         usData: state.ethnicities.usData
//     }
// }
// const mapDispatch = {
//     fetchEthnicities: fetchEthnicities
// }

// export const Ethnicity = connect(mapState, mapDispatch)(
//     EthnicityChart
// )