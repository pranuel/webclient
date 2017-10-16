export const FETCH_DEBTS = 'FETCH_DEBTS';
export const FETCH_DEBTS_FULFILLED = 'FETCH_DEBTS_FULFILLED';

export const fetchDebts = () => ({
    type: FETCH_DEBTS
});

export const fetchDebtsFulfilled = (payload: Debt[]) => ({
    type: FETCH_DEBTS_FULFILLED, payload
});

export const FETCH_DEBTS_LISTS = 'FETCH_DEBTS_LISTS';
export const FETCH_DEBTS_LISTS_FULFILLED = 'FETCH_DEBTS_LISTS_FULFILLED';

export const fetchDebtsLists = () => ({
    type: FETCH_DEBTS_LISTS
});

export const fetchDebtsListsFulfilled = (payload: DebtsList[]) => ({
    type: FETCH_DEBTS_LISTS_FULFILLED, payload
});