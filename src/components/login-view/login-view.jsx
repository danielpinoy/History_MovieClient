import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
export const LoginView = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loginUser = (event) => {
        event.preventDefault();
        console.log(username, password);
        dispatch(login(username, password));
        setUsername("");
        setPassword("");
    };

    return (
        <Form onSubmit={loginUser}>
            <Form.Group className="mt-3">
                <Form.Label>
                    <h3>Log In</h3>
                </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Button type="submit">Submit</Button>
        </Form>
    );
};
