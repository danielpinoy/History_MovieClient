import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie);
    return (
        <div>
            <div></div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>

            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.Name}</span>
                <br />
                <span>{movie.director.Bio}</span>
            </div>

            <div>
                <span>Actors: </span>
                <span>
                    {movie.actor.map((actor) => (
                        <div key={actor}>{actor}</div>
                    ))}
                </span>
                <br />
            </div>

            <div>
                <span>Genres: </span>
                <span>{movie.genre.Name}</span>
                <br />
            </div>

            <div>{movie.featured}</div>
            <button onClick={onBackClick}>Close</button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
        }).isRequired,
        actor: PropTypes.arrayOf(PropTypes.string),
        genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string,
        }).isRequired,
        featured: PropTypes.bool,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};
