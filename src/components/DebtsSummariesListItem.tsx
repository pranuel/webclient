import * as React from "react";
import { FormattedRelative } from "react-intl";
import { Link } from "react-router";

type OwnProps = {
    debtsSummary: DebtsSummary
}

export class DebtsSummariesListItem extends React.Component<OwnProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const { debtsSummary } = this.props;

        return (
            <li>
                <Link to={`/debts-summary/${debtsSummary.id}`}>
                    <div>{debtsSummary.partner.name}</div>
                    <div>{debtsSummary.debtDifference}</div>
                    <div>
                        <FormattedRelative value={debtsSummary.lastDebtTimestamp} />
                    </div>
                </Link>
            </li>
        );
    }
}