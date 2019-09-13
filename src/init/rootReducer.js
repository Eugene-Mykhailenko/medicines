import { combineReducers } from "redux";

import {addFormReducer} from "../bus/AddForm/reducer";

export const rootReducer = combineReducers({
    addForm: addFormReducer,
});