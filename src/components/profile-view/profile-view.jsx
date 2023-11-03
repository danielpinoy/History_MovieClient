import { Button, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

export const ProfileView = ({ user, clickUpdate }) => {
    console.log(user);
    const formattedBirthday = new Date(user.Birthday).toLocaleDateString();

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>Profile</Card.Title>
                    <Card.Text>
                        {user.Username.charAt(0).toUpperCase() + user.Username.slice(1)}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Birthday: {formattedBirthday}</ListGroup.Item>
                    <ListGroup.Item>Email: {user.Email}</ListGroup.Item>
                </ListGroup>
            </Card>
            <Button
                onClick={() => {
                    console.log("e");
                    clickUpdate(1);
                }}>
                Edit
            </Button>
        </>
    );
};
