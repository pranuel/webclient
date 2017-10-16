import * as React from "React";
import { Card, Feed } from "semantic-ui-react";
import { FormattedRelative } from "react-intl";

type OwnProps = {
    debtsList: DebtsList
}

export class DebtsListItem extends React.Component<OwnProps, {}> {

    render() {

        const { debtsList } = this.props;

        return (
            <Card href={`debtsList/${debtsList.id}`}>
                <Card.Content>
                    <Card.Header>{debtsList.debtDifference}€</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event key={debtsList.user.id}>
                            <Feed.Label image={debtsList.user.photoUrl} />
                            <Feed.Content content={`${debtsList.user.firstName} ${debtsList.user.lastName}`} />
                        </Feed.Event>
                    </Feed>
                </Card.Content>
                <Card.Content extra>
                    <FormattedRelative value={debtsList.lastDebtTimestamp} />
                </Card.Content>
            </Card>
        );
    }
}