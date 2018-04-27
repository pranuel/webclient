import * as React from 'react';
import { DataService } from '../services/DataService';
import { History } from 'history';

interface AddDebtState {
    debt: Debt;
    me?: User;
    partnerId?: number;
    users: User[];
    debtor: User;
}

export class AddDebt extends React.Component<{ history: History }, AddDebtState> {

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
            users: [],
            debtor: null
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
        debt.debtorId = this.state.debtor.id;
        debt.debtor = this.state.debtor;
        // set creation timestamp:
        debt.timestamp = Date.now();

        await this.dataService.addDebt(debt);

        this.props.history.push('/debts-list');
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

    selectDebtor(debtor: User) {
        let bla = this.state.debtor;
        this.setState({ debtor });
        let foo = this.state.debtor;
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
        const { debt, me, partnerId, users, debtor } = this.state;

        return (

            <form className='ui form' onSubmit={this.handleSubmit.bind(this)}>
                <div className='fields'>
                    <div className='field'>
                        <label>Amount</label>
                        <input type='number' placeholder='Amount' autoFocus value={debt.amount} onChange={this.handleAmountChange.bind(this)} />
                    </div>
                    <div className='field'>
                        <label>Reason</label>
                        <input type='text' placeholder='Reason' value={debt.reason} onChange={this.handleReasonChange.bind(this)} />
                    </div>
                    <div className='field'>
                        <label>Debtor</label>
                        <div className='ui simple selection dropdown'>
                            <i className='dropdown icon'></i>
                            {!!debtor ?
                                <div className='text'>
                                    <img className='ui avatar image' src={debtor.photoUrl} />
                                    <span>{debtor.name}</span>
                                </div>
                                :
                                <div className='default text'>Debtor</div>
                            }
                            <div className='menu'>
                                {users.map(user => (
                                    <div key={user.id} className='item' onClick={() => this.selectDebtor(user)}>
                                        <img className='ui avatar image' src={user.photoUrl} />
                                        <span>{user.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <button className='ui button' type='submit'>Submit</button>
            </form>
        );
    }

}