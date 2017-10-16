interface Entity {
    id: string
}

interface User extends Entity {
    firstName: string,
    lastName: string,
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
    debtsSummariesList: DebtsSummary[]
}

interface AppState {
    me: User
}