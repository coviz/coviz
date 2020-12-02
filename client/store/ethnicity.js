import axios from 'axios'

const SET_ETHNICITIES = 'SET_ETHNICITIES';

export const setEthnicities = usData => ({
    type: SET_ETHNICITIES,
    usData
});

export const fetchEthnicities = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get("/api/ethnicity")
            dispatch(setEthnicities(data))
        } catch (error) {
            console.log(error)
        }
    }
}

const initialState = {
    usData: []
}

export default function ethnicityReducer(state=initialState, action) {
    switch(action.type) {
        case SET_ETHNICITIES:
            return {...state, usData: action.usData}
        default:
            return state
    }
}