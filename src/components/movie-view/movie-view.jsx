import "./movie-view.scss";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, token, user, updatedUser }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    const similarMovies = movies.filter(
        (m) => m.genre.Name === movie.genre.Name && m.id !== movieId
    );
    const handleAddToFavorites = () => {
        const data = {
            userId: user._id,
            movieId: movieId,
        };
        fetch("https://historic-movies-a728a807961d.herokuapp.com/user/addfavorite", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Movie added to favorites:", data);
                updatedUser(movieId);
            })
            .catch((error) => {
                console.error("Error adding movie to favorites:", error);
            });
    };

    return (
        <Card>
            <Card.Body className="d-flex flex-column">
                <Card.Header as="h5">{movie.title}</Card.Header>

                <Card.Text>{movie.description}</Card.Text>
                <Card.Text>
                    <strong>Director:</strong> {movie.director.Name}
                    <br />
                    {movie.director.Bio}
                </Card.Text>

                <Card.Text>
                    <strong>Actors:</strong>
                </Card.Text>
                <ul className="list-unstyled">
                    <div className="row">
                        {movie.actor.map((actor, index) => (
                            <div className="col-md-4 my-2" key={index}>
                                <li>{actor}</li>
                            </div>
                        ))}
                    </div>
                </ul>

                <Card.Text>
                    <strong>Genre:</strong> {movie.genre.Name}
                </Card.Text>

                <Card.Text>
                    <strong>Featured:</strong> {movie.featured ? "Yes" : "No"}
                </Card.Text>

                <Card.Text className="list-unstyled">
                    <strong>Similar Movies:</strong>
                </Card.Text>
                <Card.Text className="row list-unstyled">
                    {similarMovies.map((movie) => (
                        <div className="col-md-4 my-2" key={movie.id}>
                            <li>{movie.title}</li>
                        </div>
                    ))}
                </Card.Text>

                <Card.Text className="d-flex justify-content-between">
                    <Link to={`/`}>
                        <Button variant="primary" style={{ cursor: "pointer" }}>
                            Close
                        </Button>
                    </Link>
                    <Button
                        onClick={handleAddToFavorites}
                        variant="dark"
                        style={{ cursor: "pointer" }}>
                        Add To Favorite
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
