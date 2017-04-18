import {
    FETCH_DEBTS, FETCH_DEBTS_FULFILLED
} from "../actions/Actions";

export const debts = (state: Debt[] = [], action: ActionWithPayload<Debt[]>): Debt[] => {
    switch (action.type) {
        case FETCH_DEBTS:
            return [];

        case FETCH_DEBTS_FULFILLED:
            return action.payload;

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