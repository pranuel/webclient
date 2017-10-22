import * as React from "react";
import { FormattedRelative } from "react-intl";

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
                <a href={`debts-list/${debtsSummary.partnerId}`}>
                    <div>{debtsSummary.partner.name}</div>
                    <div>{debtsSummary.debtDifference}</div>
                    <div>
                        <FormattedRelative value={debtsSummary.lastDebtTimestamp} />
                    </div>
                </a>
            </li>
        );
    }
}