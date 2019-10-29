const TOGGLE_MAP_VIEW = 'TOGGLE_MAP_VIEW'
const TOGGLE_DETAIL_VIEW = 'TOGGLE_DETAIL_VIEW'
const TOGGLE_OPEN_CARD = 'TOGGLE_OPEN_CARD'

const toggledMapView = () => ({type: TOGGLE_MAP_VIEW})

const toggledDetailView = (index = null) => ({type: TOGGLE_DETAIL_VIEW, index})

const toggledOpenCard = (card) => ({type: TOGGLE_OPEN_CARD, card})


export const toggleMapView = () => {
    return (dispatch) => dispatch(toggledMapView())
}

export const toggleDetailView = (area) => {
    return (dispatch) => dispatch(toggledDetailView(area))
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
        case TOGGLE_DETAIL_VIEW:
            return {
                ...state,
                detailView: state.index
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