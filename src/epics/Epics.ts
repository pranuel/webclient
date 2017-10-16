import { DataService } from './../services/DataService';
import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";
import {
    FETCH_DEBTS, fetchDebtsFulfilled, FETCH_DEBTS_LISTS, fetchDebtsListsFulfilled
} from "../actions/Actions";

const dataService = new DataService();

export const fetchDebtsEpic = (action$: ActionsObservable<Action>): Observable<Action> =>
    action$.ofType(FETCH_DEBTS)
        .mergeMap(action =>
            dataService.fetchDebts()
                .map(fetchDebtsFulfilled)
        );

export const fetchDebtsListsEpic = (action$: ActionsObservable<Action>): Observable<Action> =>
    action$.ofType(FETCH_DEBTS_LISTS)
        .mergeMap(action =>
            dataService.fetchDebtsLists()
                .map(fetchDebtsListsFulfilled)
        );