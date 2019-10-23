// action types
const setHikes = 'setHikes'



const defaultHikes = []

export default function(state = defaultHikes, action){
    switch(action.type){
        case setHikes: 
            return action.hikes
        default: 
            return [...state]
    }
}