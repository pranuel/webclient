import * as React from 'react';
import { FormattedRelative } from 'react-intl';

type OwnProps = {
    debt: Debt
};

export class DebtsListItem extends React.Component<OwnProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const { debt } = this.props;

        return (
            <div className='event'>
                <div className='label'>
                    <img src={debt.creditor.photoUrl}></img>
                </div>
                <div className='content'>
                    <div className='date'>
                        <FormattedRelative value={debt.timestamp} />
                    </div>
                    <div className='summary'>
                        {debt.creditor.name}
                    </div>
                    <div className='extra text'>
                        {debt.reason}
                    </div>
                    <div className='meta'>
                        <a className='like'>
                            <i className='euro sign icon'></i> {debt.amount}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}