import { debts, isFetchingDebts, debtsLists, isFetchingDebtsLists } from './Reducers';
import { combineReducers } from "redux";

// create root reducer for redux:
export const rootReducer = combineReducers({
    debts,
    isFetchingDebts,
    debtsLists,
    isFetchingDebtsLists
});