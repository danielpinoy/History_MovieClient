import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
export const MainView = () => {

	const [movies, setMovie] = useState([
    {
      id: 1,
      title: "The Patriot",
      image:
        "https://upload.wikimedia.org/wikipedia/en/6/68/Patriot_promo_poster.jpg",
      director: "Roland Emmerich"
    },
    {
      id: 2,
      title: "Ferrari 312B: Where the Revolution Begins",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/R%C3%A9tromobile_2017_-_Ferrari_312_B2_-_1972_-_002.jpg/1280px-R%C3%A9tromobile_2017_-_Ferrari_312_B2_-_1972_-_002.jpg",
				director: "Andrea Marini"
    },
    {
      id: 3,
      title: "All Quiet on the Western Front",
      image:
        "https://m.media-amazon.com/images/I/71JWTmpIQuL._SL1500_.jpg",
				director: "Edward Berger"
    },
   
  ]);
	const [selectedMovie, setSelectedMovie] = useState(null);

	if(selectedMovie){
		return <MovieView movie={selectedMovie} onBackClick={()=>setSelectedMovie(null)}/>
	}
	const updatedMovie = movies.map((movie)=>{
		return    <MovieCard key={movie.id} movie={movie}
		onMovieClick={(newSelectedMovie) => {
			setSelectedMovie(newSelectedMovie);
		}}
	/>
	})

	if(movies.length === 0){
		return <div>The list is empty!</div>
	}
  return (
    <div>{updatedMovie}</div>
  );
}