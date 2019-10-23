// action types
const SET_HIKES = 'SET_HIKES'



const defaultHikes = []

export default function(state = defaultHikes, action){
    switch(action.type){
        case SET_HIKES: 
            return action.hikes
        default: 
            return [...state]
    }
}