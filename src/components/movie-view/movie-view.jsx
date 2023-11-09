import "./movie-view.scss";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { addFavoriteMovieToUser } from "../../actions/userActions";
import { useDispatch } from "react-redux";
export const MovieView = ({ movies, user }) => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const movie = movies.find((m) => m.id === movieId);
    const isMovieInFavorites = user.FavoriteMovies.includes(String(movieId));

    const similarMovies = movies.filter(
        (m) => m.genre.Name === movie.genre.Name && m.id !== movieId
    );

    console.log(isMovieInFavorites, "favorite movie added");

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
                <div className="row list-unstyled">
                    {similarMovies.map((movie) => (
                        <div className="col-md-4 my-2" key={movie.id}>
                            <li>{movie.title}</li>
                        </div>
                    ))}
                </div>

                <Card.Text className="d-flex justify-content-between">
                    <Link to={`/`}>
                        <Button variant="primary" style={{ cursor: "pointer" }}>
                            Close
                        </Button>
                    </Link>

                    {isMovieInFavorites ? (
                        <Button variant="secondary">Already Your Favorite</Button>
                    ) : (
                        <Button
                            onClick={() => {
                                dispatch(addFavoriteMovieToUser(user._id, movieId));
                            }}
                            variant="dark"
                            style={{ cursor: "pointer" }}>
                            Add To Favorite
                        </Button>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
