import { Button, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

export const ProfileView = ({ user, clickUpdate, movies }) => {
    const formattedBirthday = new Date(user.Birthday).toLocaleDateString();
    console.log(movies);
    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this Profile?");
        if (confirmed) {
            onDelete();
        }
    };

    const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));
    console.log(favoriteMovies);
    const onDelete = () => {
        // fetch(`/user/${user._id}`, {
        //     method: "DELETE",
        //     headers: { Authorization: `Bearer ${token}` },
        // })
        //     .then((response) => {
        //         if (response.ok) {
        //             localStorage.clear();

        //             console.log("Successfully deleted the user.");
        //         } else {
        //             console.error("Failed to delete the user.");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error deleting user:", error);
        //     });
        console.log("Deleted");
    };

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
                    <ListGroup.Item>
                        <strong>Birthday:</strong> {formattedBirthday}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Email:</strong>: {user.Email}
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex flex-column">
                        <strong>Favorite Movies:</strong>
                        {favoriteMovies.map((movie) => {
                            return <Card.Text>{movie.title}</Card.Text>;
                        })}
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                        <Button onClick={handleDeleteClick} className="btn btn-danger">
                            Delete
                        </Button>
                        <Button
                            onClick={() => {
                                console.log("e");
                                clickUpdate(1);
                            }}>
                            Edit
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    );
};
