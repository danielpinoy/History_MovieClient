import React from "react";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";
export const MovieCard = ({ movie, onMovieClick }) => {
    console.log(movie.image);
    return (
        <Card
            className="hover h-100"
            onClick={() => {
                onMovieClick(movie);
            }}>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Img src={movie.image} alt={movie.title} />
            </Card.Body>
        </Card>
    );
};
