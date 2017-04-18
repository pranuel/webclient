interface User {
    name: string,
    id: string
}

interface Debt {
    amount: number,
    reason: string,
    id: string
}

declare namespace Store {

    export type UserProps = {
        users: User[],
        isFetchingUsers: boolean,
        me: User
    }

    export type DebtProps = {
        debts: Debt[],
        isFetchingDebts: boolean
    }

    export type All = UserProps & DebtProps;
}