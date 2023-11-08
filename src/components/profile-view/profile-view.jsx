import { Button, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ user, clickUpdate, movies, token, clickDeleteFM }) => {
    const formattedBirthday = new Date(user.Birthday).toLocaleDateString();
    const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete your Profile?");
        if (confirmed) {
            console.log(user._id);
            deleteUser();
        }
    };

    const deleteUser = () => {
        fetch(`https://historic-movies-a728a807961d.herokuapp.com/user/${user._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    localStorage.clear();
                    window.location.reload();
                    console.log("Successfully deleted the user.");
                    navigate("/login");
                } else {
                    console.error("Failed to delete the user.");
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    };

    const onDeleteFavoriteMovie = (movieId) => {
        const encodedMovieId = encodeURIComponent(movieId);
        console.log(encodedMovieId);
        fetch(
            `https://historic-movies-a728a807961d.herokuapp.com/user/${user._id}/${encodedMovieId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    const updatedUser = {
                        ...user,
                        FavoriteMovies: user.FavoriteMovies.filter((title) => title !== movieId),
                    };
                    clickDeleteFM(updatedUser);

                    localStorage.setItem("user", JSON.stringify(updatedUser));
                }
            })
            .catch((error) => {
                console.error("Error removing movie from favorites:", error);
            });
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
