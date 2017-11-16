import { FormattedRelative } from "react-intl";
import * as React from "react";
import { DataService } from "../services/DataService";
import { DebtsListItem } from "../components/DebtsListItem";
import { Link } from "react-router";

export class DebtsGroup extends React.Component<RouteProps, DebtsListState> {

    constructor(props) {
        super(props);
        this.state = {
            debtsGroup: null,
            debts: null,
            partner: null
        };
    }

    async componentDidMount() {
        let ds = new DataService();

        let debtsGroup = await ds.getDebtsGroupById(this.props.params.id);
        this.setState({ debtsGroup: debtsGroup });

        let debts = debtsGroup.debts;
        this.setState({ debts: debts });

        let me = await ds.getMe();
        let partner = debtsGroup.user1Id === me.id ? debtsGroup.user1 : debtsGroup.user2;
        this.setState({ partner: partner });
    }

    render() {
        const { debts, debtsGroup, partner } = this.state;

        return (
            <div>
                {!!debtsGroup && !!partner &&
                    <div>
                        <div>{partner.name}</div>
                        <div>{debtsGroup.debtDifference}</div>
                        <div>
                            <FormattedRelative value={debtsGroup.lastDebtTimestamp} />
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
                {!!partner &&
                    <Link to={`/add-debt/${partner.id}`}>Add Debt</Link>
                }
            </div>
        );
    }
}