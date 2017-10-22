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
    partnerId: string,
    partner: User,
    debtDifference: number,
    lastDebtTimestamp: number
}

interface DebtsList extends Entity {
    partnerId: string,
    partner: User,
    debts: Debt[]
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

interface AddDebtState {
    debt: Debt,
    me: User,
    partner: User
}

interface AddDebtProps {
    params: {
        partnerId: string
    }
}

interface SelectDebtPartnerState {
    partner: User,
    nameQuery: string
}