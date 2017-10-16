import {
    FETCH_DEBTS, FETCH_DEBTS_FULFILLED, FETCH_DEBTS_LISTS_FULFILLED, FETCH_DEBTS_LISTS
} from "../actions/Actions";

export const debts = (state: Debt[] = [], action: ActionWithPayload<any>): Debt[] => {
    switch (action.type) {
        case FETCH_DEBTS_FULFILLED:
            return action.payload.data.debts;

        default:
            return state;
    }
};

export const isFetchingDebts = (state = false, action: Action): boolean => {
    switch (action.type) {
        case FETCH_DEBTS:
            return true;

        case FETCH_DEBTS_FULFILLED:
            return false;

        default:
            return state;
    }
};

export const debtsLists = (state: DebtsList[] = [], action: ActionWithPayload<any>): DebtsList[] => {
    switch (action.type) {
        case FETCH_DEBTS_LISTS_FULFILLED:
            return action.payload.data.debtsLists;

        default:
            return state;
    }
};

export const isFetchingDebtsLists = (state = false, action: Action): boolean => {
    switch (action.type) {
        case FETCH_DEBTS_LISTS:
            return true;

        case FETCH_DEBTS_LISTS_FULFILLED:
            return false;

        default:
            return state;
    }
};