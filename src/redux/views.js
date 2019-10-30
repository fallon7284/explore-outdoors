const TOGGLE_MAP_VIEW = 'TOGGLE_MAP_VIEW'
const TOGGLE_FULL_PAGE = 'TOGGLE_FULL_PAGE'
const TOGGLE_OPEN_CARD = 'TOGGLE_OPEN_CARD'

const toggledMapView = () => ({type: TOGGLE_MAP_VIEW})

const toggledFullPage = (index = null) => ({type: TOGGLE_FULL_PAGE, index})

const toggledOpenCard = (card) => ({type: TOGGLE_OPEN_CARD, card})


export const toggleMapView = () => {
    return (dispatch) => dispatch(toggledMapView())
}

export const toggleFullPage = (area) => {
    return (dispatch) => dispatch(toggledFullPage(area))
}

export const toggleOpenCard = (area) => {
    return (dispatch) => dispatch(toggledOpenCard(area))
}

const defaultViews = {
    mapView: true,
    detailView: null,
    card: null
}

export default function(state = defaultViews, action){
    switch(action.type){
        case TOGGLE_MAP_VIEW:
            return {
                ...state,
                mapView: !state.mapView
            }
        case TOGGLE_FULL_PAGE:
            console.log(action.index)
            return {
                ...state,
                detailView: action.index
            }
        case TOGGLE_OPEN_CARD: 
            return {
                ...state,
                card: action.card
            }
        default: 
            return state
    }
}