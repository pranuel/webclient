import * as React from 'react';
import { FormattedRelative } from 'react-intl';
import { Link } from 'react-router';

type OwnProps = {
    debtsGroup: DebtsGroup
};

export class DebtsGroupsListItem extends React.Component<OwnProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const { debtsGroup } = this.props;

        return (
            <li>
                <Link to={`/debts-group/${debtsGroup.id}`}>
                    <div>{debtsGroup.debtDifference}</div>
                    <div>
                        <FormattedRelative value={debtsGroup.lastDebtTimestamp} />
                    </div>
                </Link>
            </li>
        );
    }
}