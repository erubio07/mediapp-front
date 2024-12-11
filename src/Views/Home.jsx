import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Home = () => {
  const [username, setUsername] = useState("");
  //   console.log(username);
  const [password, setPassword] = useState("");
  //   console.log(password);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h1>MediApp</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter Username"
            value={username}
            onChange={handleUsername}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
    </div>
  );
};

export default Home;
