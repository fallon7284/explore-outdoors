const SET_FILTER = 'SET_FILTER'

const setFilterActionCreator = (filter) => ({type: SET_FILTER, filter})

export const setFilter = (filter) => {
    return (dispatch) => {
        dispatch(setFilterActionCreator(filter))
    }
}  



export default function(state = 'distance', action){
    switch(action.type){
        case SET_FILTER:
            return action.filter
        default:
            return state
    }
}