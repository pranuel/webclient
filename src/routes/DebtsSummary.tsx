import { FormattedRelative } from "react-intl";
import * as React from "react";
import { DataService } from "../services/DataService";
import { DebtsListItem } from "../components/DebtsListItem";
import { Link } from "react-router";

export class DebtsSummary extends React.Component<RouteProps, DebtsListState> {

    constructor(props) {
        super(props);
        this.state = {
            debtsSummary: null,
            debts: null
        };
    }

    async componentDidMount() {
        let ds = new DataService();

        let debtsSummary = await ds.getDebtsSummaryById(this.props.params.id);
        this.setState({ debtsSummary: debtsSummary });

        let debts = await ds.getDebtsForPartner(debtsSummary.partnerId);
        this.setState({ debts: debts });
    }

    render() {
        const { debts, debtsSummary } = this.state;

        return (
            <div>
                {!!debtsSummary &&
                    <div>
                        <div>{debtsSummary.partner.name}</div>
                        <div>{debtsSummary.debtDifference}</div>
                        <div>
                            <FormattedRelative value={debtsSummary.lastDebtTimestamp} />
                        </div>
                    </div>
                }
                {!!debts &&
                    <ul>
                        {debts.map(debt => (
                            <DebtsListItem key={debt.id} debt={debt} />
                        ))}
                    </ul>
                }
                {!!debtsSummary &&
                    <Link to={`/add-debt/${debtsSummary.partnerId}`}>Add Debt</Link>
                }
            </div>
        );
    }
}