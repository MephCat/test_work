import {INITIAL_DIR} from "./types";

const initialState = {
    dirs: null,
    fetchedDirs: []
}

export const dirReducer = (state = initialState , action) => {
    switch (action.type){
        case INITIAL_DIR:
            return {...state, dirs: action.payload}

    default: return state
    }
}