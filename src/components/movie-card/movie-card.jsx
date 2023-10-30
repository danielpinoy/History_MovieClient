export const MovieCard = ({ movie, onMovieClick }) => {
    console.log(movie, "movie");
    console.log(onMovieClick, "movie");

    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}>
            {movie.title}
        </div>
    );
};
