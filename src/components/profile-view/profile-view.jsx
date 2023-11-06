import { Button, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
export const ProfileView = ({ user, clickUpdate, movies, token, clickDeleteFM }) => {
    const formattedBirthday = new Date(user.Birthday).toLocaleDateString();
    console.log(user.FavoriteMovies);
    console.log(movies);
    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete your Profile?");
        if (confirmed) {
            onDeleteUser();
        }
    };

    const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));
    console.log(user._id);
    const onDeleteUser = () => {
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
    const onDeleteFavoriteMovie = (movieTitle) => {
        const encodedMovieTitle = encodeURIComponent(movieTitle);

        fetch(
            `https://historic-movies-a728a807961d.herokuapp.com/user/${user._id}/${encodedMovieTitle}`,
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
                    // Fetch the updated user data to get the new list of favorite movies
                    fetch(`https://historic-movies-a728a807961d.herokuapp.com/user/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((updatedUserData) => {
                            console.log(updatedUserData);
                            clickDeleteFM({
                                ...user,
                                FavoriteMovies: updatedUserData.FavoriteMovies,
                            });
                            console.log("Movie removed from favorites.");
                        })
                        .catch((error) => {
                            console.error("Error fetching updated user data:", error);
                        });
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
                        <strong>Favorite Movies:</strong>
                        {favoriteMovies.map((movie) => {
                            return (
                                <React.Fragment key={movie.title}>
                                    <Card.Text>{movie.title}</Card.Text>
                                    <Button onClick={() => onDeleteFavoriteMovie(movie.id)}>
                                        Delete
                                    </Button>
                                </React.Fragment>
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
