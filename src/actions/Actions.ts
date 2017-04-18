export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_FULFILLED = 'FETCH_USERS_FULFILLED';

export const fetchUsers = () => ({
    type: FETCH_USERS
});

export const fetchUsersFulfilled = (payload: User[]) => ({
    type: FETCH_USERS_FULFILLED, payload
});

export const FETCH_DEBTS = 'FETCH_DEBTS';
export const FETCH_DEBTS_FULFILLED = 'FETCH_DEBTS_FULFILLED';

export const fetchDebts = () => ({
    type: FETCH_DEBTS
});

export const fetchDebtsFulfilled = (payload: Debt[]) => ({
    type: FETCH_DEBTS_FULFILLED, payload
});