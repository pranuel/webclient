import * as React from "react";
import { FormattedRelative } from "react-intl";

type OwnProps = {
    debt: Debt
}

export class DebtsListItem extends React.Component<OwnProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const { debt } = this.props;

        return (
            <li>
                <p>Creditor: {debt.creditor.name}</p>
                <p>Debtor: {debt.debtor.name}</p>
                <p>Amount: {debt.amount}</p>
                <p>Reason: {debt.reason}</p>
                <div>
                    <FormattedRelative value={debt.timestamp} />
                </div>
            </li>
        );
    }
}