import { SEARCH_MINERALS } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case SEARCH_MINERALS: 
            return action.payload || false;
        default:
            return state;
    }
}