import "./movie-view.scss";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);
    const similarMovies = movies.filter(
        (m) => m.genre.Name === movie.genre.Name && m.id !== movie.id
    );

    const handleAddToFavorites = () => {
        // Replace with the actual URL for your API endpoint to add a favorite movie

        // Replace with the user ID and movie ID as needed
        const userId = "123"; // User's ID
        const movieId = movie.id; // Movie's ID

        // Make a POST request to add the movie to the user's favorites
        fetch("https://historic-movies-a728a807961d.herokuapp.com/user/addfavorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, movieId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Handle the response, e.g., update state or show a success message
                console.log("Movie added to favorites:", data);
                onAddToFavorites(movieId); // Notify the parent component that the movie was added
            })
            .catch((error) => {
                console.error("Error adding movie to favorites:", error);
            });
    };

    return (
        <Card>
            <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Card.Text className="">
                    <strong>Director:</strong> {movie.director.Name}
                    <br />
                    {movie.director.Bio}
                </Card.Text>

                <Card.Text>
                    <strong>Actors:</strong>
                    <ul className="list-unstyled">
                        <div className="row">
                            {movie.actor.map((actor, index) => (
                                <div className="col-md-4 my-2" key={index}>
                                    <li>{actor}</li>
                                </div>
                            ))}
                        </div>
                    </ul>
                </Card.Text>

                <Card.Text>
                    <strong>Genre:</strong> {movie.genre.Name}
                </Card.Text>

                <Card.Text>
                    <strong>Featured:</strong> {movie.featured ? "Yes" : "No"}
                </Card.Text>

                <Card.Text className="list-unstyled">
                    <strong>Similar Movies</strong>
                    <div className="row">
                        {similarMovies.map((movie) => (
                            <div className="col-md-4 my-2" key={movie.id}>
                                <li>{movie.title}</li>
                            </div>
                        ))}
                    </div>
                </Card.Text>

                <Card.Text className="d-flex">
                    <Link to={`/`}>
                        <Button variant="primary" style={{ cursor: "pointer" }}>
                            Close
                        </Button>
                    </Link>
                    <Button onClick={[]} variant="dark" style={{ cursor: "pointer" }}>
                        Add To Favorite
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//         director: PropTypes.shape({
//             Name: PropTypes.string.isRequired,
//             Bio: PropTypes.string.isRequired,
//         }).isRequired,
//         actor: PropTypes.arrayOf(PropTypes.string).isRequired,
//         genre: PropTypes.shape({
//             Name: PropTypes.string.isRequired,
//             Description: PropTypes.string,
//         }).isRequired,
//         featured: PropTypes.bool,
//         image: PropTypes.string.isRequired,
//     }).isRequired,
// };
