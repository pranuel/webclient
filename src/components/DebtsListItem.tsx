import * as React from "React";
import { Card, Feed } from "semantic-ui-react";

type OwnProps = {
    debt: Debt
}

export class DebtsListItem extends React.Component<OwnProps, {}> {

    render() {

        const { debt } = this.props;

        return (
            <Card href={`#/debt/${debt._id}`}>
                <Card.Content>
                    <Card.Header>{debt.amount}€</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label image={debt.debtor.photoUrl} />
                            <Feed.Content>
                                <Feed.Date content={debt.timestamp} />
                                <Feed.Summary content={`${debt.debtor.firstName} owes ${debt.creditor.firstName} ${debt.amount}€`} />
                                <Feed.Extra text content={debt.reason} />
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        );
    }
}