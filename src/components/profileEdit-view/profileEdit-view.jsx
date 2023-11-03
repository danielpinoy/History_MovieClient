import React, { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

export const ProfileEditView = ({ user, onUpdateUser, clickUpdate }) => {
    const [userData, setUserData] = useState(user);
    console.log(user.Birthday, "DDDDDDDDDDDDDDDD");
    const formattedBirthday = new Date(user.Birthday).toLocaleDateString();
    console.log(user.Birthday);
    const handleSubmit = (event) => {
        event.preventDefault();
        // onUpdateUser(userData);
        clickUpdate(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
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
                                type="password"
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
                                value={formattedBirthday}
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
