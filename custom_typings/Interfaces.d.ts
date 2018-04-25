interface Entity {
    id: number
}

interface User extends Entity {
    name: string,
    photoUrl: string
}

interface Debt extends Entity {
    debtorId: number;
    debtor: User;
    creditorId: number;
    creditor: User;
    amount: number;
    timestamp: number;
    reason: string;
    isRepaid: boolean;
    // debtsGroupId: number;
    // debtsGroup: DebtsGroup;
}

interface DebtsGroup extends Entity {
    user1Id: number;
    user1: User;
    user2Id: number;
    user2: User;
    debts: Debt[];
    debtDifference: number;
    lastDebtTimestamp: number;
}

interface DebtsGroupsListState {
    me: User,
    debtsGroupsList: DebtsGroup[]
}

interface AppState {
    me: User
}

interface CreateUserState {
    user: User
}

interface RouteProps {
    params: {
        id: string
    }
}

interface DebtsListState {
    debtsGroup: DebtsGroup,
    debts: Debt[],
    partner: User
}

interface SelectDebtPartnerState {
    partner: User,
    nameQuery: string
}