import { useState,useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
export const MainView = () => {

	const [movies, setMovie] = useState([]);
	useEffect(() => {
		fetch("https://historic-movies-a728a807961d.herokuapp.com/Movies")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				const historyMovieApi = data.map((data)=>{
					return{
						id: data._id,
						title: data.Title,
						description: data.Description,
						director: data.Director,
						actor: data.Actors,
						genre: data.Genre,
						featured:data.Featured


					}
				})
				console.log(historyMovieApi)
				setMovie(historyMovieApi)
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);
	
	
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
console.log(movies)
	if(movies.length === 0){
		return <div>The list is empty!</div>
	}
  return (
    <div>{updatedMovie}</div>
  );
}