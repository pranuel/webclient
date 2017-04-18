import { debts, isFetchingDebts } from './Reducers';
import { combineReducers } from "redux";

// create root reducer for redux:
export const rootReducer = combineReducers({
    debts,
    isFetchingDebts
});