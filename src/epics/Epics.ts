import { fetchDebtsFulfilled, FETCH_USERS } from './../actions/Actions';
import { DataService } from './../services/DataService';
import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";

const dataService = new DataService();

export const fetchDebtsEpic = (action$: ActionsObservable<Action>): Observable<Action> =>
    action$.ofType(FETCH_USERS)
        .mergeMap(action =>
            dataService.fetchDebts()
                .map(fetchDebtsFulfilled)
        );