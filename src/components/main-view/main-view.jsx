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
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import { getMovies } from "../../actions/movieActions";
export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const storedToken = localStorage.getItem("token");
    // const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [userEdit, setUserEdit] = useState(null);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const movies = useSelector((state) => state.movies);
    // console.log(movies, "movies");
    console.log(user, "main-view user");
    // console.log(storedUser, "main-view storedUser");
    // console.log(storedToken);
    // console.log(token);
    useEffect(() => {
        dispatch(getMovies());
    }, []);
    const updatedMovie = movies.map((movie) => {
        return (
            <Col key={movie.id} md={3} className="mb-4">
                <MovieCard movie={movie} />
            </Col>
        );
    });

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                loggedOut={() => {
                    dispatch(logout());
                    window.location.reload();
                }}
            />
            <Row>
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {storedUser ? (
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
                                {storedUser ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={4}>
                                        <LoginView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <>
                                {!storedUser ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={12} className="d-flex justify-content-center">
                                        {!userEdit ? (
                                            <ProfileView
                                                user={user}
                                                movies={movies}
                                                token={token}
                                                clickUpdate={(num) => {
                                                    setUserEdit(num);
                                                }}
                                            />
                                        ) : (
                                            <ProfileEditView
                                                user={user}
                                                newUser={storedUser}
                                                token={storedToken}
                                                clickUpdate={(num) => {
                                                    setUserEdit(num);
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
                                {!storedUser ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={12}>
                                        <MovieView movies={movies} token={token} user={user} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!storedUser ? (
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
