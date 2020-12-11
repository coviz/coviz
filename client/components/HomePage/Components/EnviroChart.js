import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchEnviro} from '../../../store/environment'
import {initEnviroChart, drawEnviroChart} from '../../D3Charts/LineChart'


export const EnviroChart = props => {
    const dispatch = useDispatch()

    const data = useSelector(state => state.environments.co2Data)
    const isLoading = useSelector(state => state.environments.isLoading)

    useEffect(() => {
        dispatch(fetchEnviro())
    }, [])
    useEffect(() => {
        initEnviroChart(1000, 1000)
    }, [])

    console.log('enviro data: ', data)
    return (
        <div>
            <h1 style={{color: 'white'}}>Covid v. Environment</h1>
            {isLoading ? drawEnviroChart(840, 800, data) : <div />}
            <div>
                <div style={{border: 'solid 2px red'}} id="enviroChart" />
                {/* <b>COVID-19 and Types of Carbon Emissions</b> */}
            </div>
        </div>
    )
}
