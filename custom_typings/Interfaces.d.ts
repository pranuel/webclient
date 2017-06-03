interface User {
    _id: string,
    firstName: string,
    lastName: string,
    photoUrl: string
}

interface Debt {
    _id: string,
    debtor: User,
    creditor: User,
    amount: number,
    timestamp: number,
    reason: string
}

declare namespace Store {

    export type DebtsProps = {
        debts: Debt[],
        isFetchingDebts: boolean
    }

    export type DebtProps = {
        debt: Debt,
        isFetchingDebt: boolean
    }

    export type All = DebtsProps & DebtProps;
}