import { Button, Card } from "react-bootstrap";
import { Spinner, Alert } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, unFavoriteMovie } from "../../actions/userActions";

export const ProfileView = ({ clickUpdate, movies, token, users }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const { user, loading, error } = useSelector((state) => state.user);
    const formattedBirthday = new Date(user.Birthday).toLocaleDateString();
    const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));
    const dispatch = useDispatch();

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
                    <ListGroup>
                        <ListGroup.Item>
                            <Card.Title>Profile</Card.Title>
                            <h4>
                                {user.Username.charAt(0).toUpperCase() + user.Username.slice(1)}
                            </h4>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            <strong>Birthday:</strong> {formattedBirthday}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Email:</strong>: {user.Email}
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex flex-column">
                            <h4>Favorite Movies:</h4>
                            {/* {error && (
                                        <Alert variant="danger">{errorFavoriteMovieDelete}</Alert>
                                    )}
                                    {loading ? (
                                        <Spinner animation="border" variant="primary" grow />
                                    ) : ( */}
                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="grow" variant="dark" />
                                    <Card.Text>Loading...</Card.Text>
                                </div>
                            ) : (
                                favoriteMovies.map((movie) => {
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
                                })
                            )}
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
                </Card.Body>
            </Card>
        </>
    );
};
