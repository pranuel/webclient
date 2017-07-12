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

interface DebtsList {
    _id: string,
    title: string,
    members: User[],
    debts: Debt[],
    totalAmount: number,
    lastTimestamp: number
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