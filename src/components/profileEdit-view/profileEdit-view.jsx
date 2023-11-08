import React, { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

export const ProfileEditView = ({ user, onUpdateUser, clickUpdate, token }) => {
    const [userData, setUserData] = useState(user);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = () => {
        fetch(`https://historic-movies-a728a807961d.herokuapp.com/user/${user.Username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Add the Authorization header
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((updatedUser) => {
                onUpdateUser(updatedUser);
                clickUpdate(null);
            })
            .catch((error) => {
                console.error("Error updating user:", error);
            });
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>Edit Profile</Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            Username:
                            <input
                                type="text"
                                name="Username"
                                value={userData.Username}
                                onChange={handleChange}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Password:
                            <input
                                type="text"
                                name="Password"
                                value={userData.Password}
                                onChange={handleChange}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Date of Birth:
                            <input
                                type="date"
                                name="Birthday"
                                value={userData.Birthday}
                                onChange={handleChange}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Email:
                            <input
                                type="email"
                                name="Email"
                                value={userData.Email}
                                onChange={handleChange}
                            />
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            <Button onClick={handleSubmit}>Update</Button>
        </>
    );
};
