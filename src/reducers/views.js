const TOGGLE_MAP_VIEW = 'TOGGLE_MAP_VIEW'
const TOGGLE_DETAIL_VIEW = 'TOGGLE_DETAIL_VIEW'
const TOGGLE_OPEN_CARD = 'TOGGLE_OPEN_CARD'

const toggledMapView = () => ({type: TOGGLE_MAP_VIEW})

const toggledDetailView = () => ({type: TOGGLE_DETAIL_VIEW})

const toggledOpenCard = (card = null) => ({type: TOGGLE_OPEN_CARD, card})


export const toggleMapView = () => {
    return (dispatch) => dispatch(toggledMapView())
}

export const toggleDetailView = () => {
    return (dispatch) => dispatch(toggledDetailView())
}

export const toggleOpenCard = () => {
    return (dispatch) => dispatch(toggledOpenCard())
}

const defaultViews = {
    mapView: true,
    detailView: false,
    card: null
}

export default function(state = defaultViews, action){
    switch(action.type){
        case TOGGLE_MAP_VIEW:
            return {
                ...state,
                mapView: !state.mapView
            }
        case TOGGLE_DETAIL_VIEW:
            return {
                ...state,
                detailView: !state.detailView
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