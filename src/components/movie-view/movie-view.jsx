import "./movie-view.scss";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    console.log(movies);
    const movie = movies.find((m) => m.id === movieId);
    return (
        <Card>
            <Card.Body>
                <Card.Title className="mb-3">{movie.title}</Card.Title>
                <Card.Text className="mb-3">{movie.description}</Card.Text>
                <Card.Text className="mb-3">
                    <strong>Director:</strong> {movie.director.Name}
                    <br />
                    {movie.director.Bio}
                </Card.Text>

                <Card.Text className="mb-3">
                    <strong>Actors:</strong>
                    <ul className="list-unstyled">
                        {movie.actor.map((actor) => (
                            <li key={actor}>{actor}</li>
                        ))}
                    </ul>
                </Card.Text>

                <Card.Text className="mb-3">
                    <strong>Genre:</strong> {movie.genre.Name}
                </Card.Text>

                <Card.Text className="mb-3">
                    <strong>Featured:</strong> {movie.featured ? "Yes" : "No"}
                </Card.Text>
                <Link to={`/`}>
                    <Button variant="primary" className="back-button" style={{ cursor: "pointer" }}>
                        Close
                    </Button>
                </Link>
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
