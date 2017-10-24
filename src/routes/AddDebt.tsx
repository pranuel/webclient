import * as React from "react";
import { DataService } from "../services/DataService";
import { InjectedRouter } from "react-router";


export class AddDebt extends React.Component<RouteProps & { router: InjectedRouter }, AddDebtState> {

    private dataService = new DataService();

    constructor(props) {
        super(props);
        this.state = {
            debt: {
                amount: 0,
                creditor: null,
                creditorId: null,
                debtor: null,
                debtorId: null,
                id: null,
                reason: "",
                timestamp: null
            },
            me: {
                id: null,
                name: null,
                photoUrl: null
            },
            partner: {
                id: null,
                name: null,
                photoUrl: null
            }
        };
    }

    async componentDidMount() {
        let me = await this.dataService.getMe();
        this.setState({ me: me });
        this.setState({
            debt: { ...this.state.debt, ...{ creditor: me } }
        });

        let partner = await this.dataService.getUserById(this.props.params.id);
        this.setState({ partner: partner });
        this.setState({
            debt: { ...this.state.debt, ...{ debtor: partner } }
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

        this.props.router.push("/debts-summaries");
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

    swapDebtorCreditor(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let temp = this.state.debt.debtor;
        this.setState({
            debt: { ...this.state.debt, ...{ debtor: this.state.debt.creditor } }
        });
        this.setState({
            debt: { ...this.state.debt, ...{ creditor: temp } }
        });
    }

    render() {
        const { debt, me, partner } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Amount:
                        <input value={debt.amount} type="number" autoFocus={true} onChange={this.handleAmountChange.bind(this)} />
                    </label>
                    <label>
                        Reason:
                        <input value={debt.reason} onChange={this.handleReasonChange.bind(this)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <label>
                    Debtor:
                    <p>{debt.debtor ? debt.debtor.name : ""}</p>
                </label>
                <button onClick={this.swapDebtorCreditor.bind(this)}>Swap</button>
                <label>
                    Creditor:
                    <p>{debt.creditor ? debt.creditor.name : ""}</p>
                </label>
            </div>
        );
    }

}