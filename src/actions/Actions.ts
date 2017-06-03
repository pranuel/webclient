export const FETCH_DEBTS = 'FETCH_DEBTS';
export const FETCH_DEBTS_FULFILLED = 'FETCH_DEBTS_FULFILLED';

export const fetchDebts = () => ({
    type: FETCH_DEBTS
});

export const fetchDebtsFulfilled = (payload: Debt[]) => ({
    type: FETCH_DEBTS_FULFILLED, payload
});