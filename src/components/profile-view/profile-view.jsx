import { Button, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser, unFavoriteMovie } from "../../actions/userActions";

export const ProfileView = ({ user, clickUpdate, movies, token }) => {
    const formattedBirthday = new Date(user.Birthday).toLocaleDateString();
    const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));
    const dispatch = useDispatch();
    console.log(user);
    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete your Profile?");
        if (confirmed) {
            dispatch(deleteUser(user, token));
        }
    };

    const onDeleteFavoriteMovie = (movieId) => {
        console.log("inside onDeleteFavoriteMovie");
        dispatch(unFavoriteMovie(user, movieId));
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
                        <h4>Favorite Movies:</h4>
                        {favoriteMovies.map((movie) => {
                            return (
                                <div key={movie.title} className="d-flex">
                                    <h5>{movie.title}</h5>
                                    <Button
                                        size="sm"
                                        onClick={() => onDeleteFavoriteMovie(movie.id)}>
                                        Delete
                                    </Button>
                                </div>
                            );
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
