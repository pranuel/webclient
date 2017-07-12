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
            <Card href={`debtsList/${debtsList._id}`}>
                <Card.Content>
                    <Card.Header>{debtsList.totalAmount}€</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {debtsList.members.map(member =>
                            <Feed.Event key={member._id}>
                                <Feed.Label image={member.photoUrl} />
                                <Feed.Content content={`${member.firstName} ${member.lastName}`} />
                            </Feed.Event>
                        )}
                    </Feed>
                </Card.Content>
                <Card.Content extra>
                    <FormattedRelative value={debtsList.lastTimestamp} />
                </Card.Content>
            </Card>
        );
    }
}