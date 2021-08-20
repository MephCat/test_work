import {combineReducers} from "redux";
import {dirReducer} from "./dirReducer";


export const rootReducer = combineReducers({
    dirs: dirReducer
})