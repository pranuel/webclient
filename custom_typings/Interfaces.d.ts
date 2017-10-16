interface User {
    id: string,
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

interface DebtsList {
    id: string,
    user: User,
    debtDifference: number,
    lastDebtTimestamp: number
}

declare namespace Store {

    export type DebtsListsProps = {
        debtsLists: DebtsList[],
        isFetchingDebtsLists: boolean
    }

    export type DebtsProps = {
        debts: Debt[],
        isFetchingDebts: boolean
    }

    export type DebtProps = {
        debt: Debt,
        isFetchingDebt: boolean
    }

    export type All = DebtsListsProps & DebtsProps & DebtProps;
}