import * as React from 'react';
import { DataService } from '../services/DataService';
import { InjectedRouter } from 'react-router';

interface AddDebtState {
    debt: Debt;
    me?: User;
    partnerId?: number;
    users: User[];
}

export class AddDebt extends React.Component<{ router: InjectedRouter }, AddDebtState> {

    private dataService = new DataService();

    constructor(props) {
        super(props);
        this.state = {
            debt: {
                amount: 0,
                creditor: null,
                creditorId: 0,
                debtor: null,
                debtorId: 0,
                id: 0,
                reason: '',
                timestamp: null,
                isRepaid: false
            },
            users: []
        };
    }

    async componentDidMount() {
        let me = await this.dataService.getMe();
        this.setState({ me: me });
        this.setState({
            debt: { ...this.state.debt, ...{ creditor: me } }
        });

        let users = await this.dataService.getUsers();
        let usersWithoutMe = users.filter(user => user.id !== me.id);
        this.setState({ users: usersWithoutMe });
        this.setState({
            debt: { ...this.state.debt, ...{ debtor: usersWithoutMe[0], debtorId: usersWithoutMe[0].id } }
        });
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let debt = this.state.debt;
        debt.creditorId = debt.creditor.id;
        debt.debtorId = debt.debtor.id;
        // set creation timestamp:
        debt.timestamp = Date.now();

        await this.dataService.addDebt(debt);

        this.props.router.push('/debts-list');
    }

    handleReasonChange(event: React.ChangeEvent<HTMLInputElement>) {
        let reason = event.target.value;
        this.setState({
            debt: { ...this.state.debt, ...{ reason: reason } }
        });
    }

    handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
        let amount = Number(event.target.value);
        this.setState({
            debt: { ...this.state.debt, ...{ amount: amount } }
        });
    }

    handlePartnerIdChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let partnerId = Number(event.target.value);
        this.setState({ partnerId });
        let partner = this.state.users.find(user => user.id === partnerId);
        if (!!partner) {
            this.setState({
                debt: { ...this.state.debt, ...{ debtorId: partner.id, debtor: partner } }
            });
        }
    }

    render() {
        const { debt, me, partnerId, users } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Amount:
                        <input value={debt.amount} type='number' autoFocus={true} onChange={this.handleAmountChange.bind(this)} />
                    </label>
                    <label>
                        Reason:
                        <input value={debt.reason} onChange={this.handleReasonChange.bind(this)} />
                    </label>
                    <input type='submit' value='Submit' />
                </form>
                <label>
                    Debtor:
                    <p>{debt.debtor ? debt.debtor.name : ''}</p>
                    <select value={partnerId} onChange={this.handlePartnerIdChange.bind(this)}>
                        {users.map(user => (
                            <option value={user.id} key={user.id}>{user.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Creditor:
                    <p>{debt.creditor ? debt.creditor.name : ''}</p>
                </label>
            </div>
        );
    }

}