// action types
const SET_BOULDERS = 'SET_BOULDERS'

const setBoulders = (boulders) => ({type: SET_BOULDERS, boulders})

export const fetchBoulders = () => {

}


const defaultBoulders = []

export default function(state = defaultBoulders, action){
    switch(action.type){
        case SET_BOULDERS: 
            return action.boulders
        default: 
            return [...state]
    }
}