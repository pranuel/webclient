interface Entity {
    id: string
}

interface User extends Entity {
    name: string,
    photoUrl: string
}

interface Debt extends Entity {
    debtorId: string,
    debtor: User,
    creditorId: string,
    creditor: User,
    amount: number,
    timestamp: number,
    reason: string
}

interface DebtsSummary extends Entity {
    userId: string,
    user: User,
    debtDifference: number,
    lastDebtTimestamp: number
}

interface DebtsSummariesListState {
    me: User,
    debtsSummariesList: DebtsSummary[]
}

interface AppState {
    me: User
}

interface CreateUserState {
    user: User
}