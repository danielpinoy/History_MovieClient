import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProfileEditView } from "../profileEdit-view/profileEdit-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [userEdit, setUserEdit] = useState(null);
    useEffect(() => {
        // Fetch movies from your API
        fetch("https://historic-movies-a728a807961d.herokuapp.com/Movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const historyMovieApi = data.map((data) => {
                    return {
                        id: data._id,
                        title: data.Title,
                        description: data.Description,
                        image: data.Image,
                        director: data.Director,
                        actor: data.Actors,
                        genre: data.Genre,
                        featured: data.Featured,
                    };
                });
                setMovies(historyMovieApi);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, [token]);

    const updatedMovie = movies.map((movie) => {
        return (
            <Col key={movie.id} md={3} className="mb-4">
                <MovieCard movie={movie} />
            </Col>
        );
    });
    console.log(movies);
    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                }}
            />
            <Row>
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={4}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={12} className="d-flex justify-content-center">
                                        {!userEdit ? (
                                            <ProfileView
                                                user={user}
                                                clickUpdate={(num) => setUserEdit(num)}
                                            />
                                        ) : (
                                            <ProfileEditView
                                                user={user}
                                                token={token}
                                                clickUpdate={(num) => {
                                                    setUserEdit(num);
                                                }}
                                                onUpdateUser={(updatedUser) => {
                                                    setUser(updatedUser);
                                                    localStorage.setItem(
                                                        "user",
                                                        JSON.stringify(updatedUser)
                                                    );
                                                }}
                                            />
                                        )}
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/Movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={12}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    updatedMovie
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
