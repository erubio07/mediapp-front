import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Subscription.module.css";

const Subscription = () => {
  const [input, setInput] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
  });
  // console.log(input);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.sub}>
        <h4 className={styles.title}>Suscribirse</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre: </Form.Label>
            <Form.Control
              type="string"
              name="name"
              placeholder="Nombre"
              className={styles.input}
              value={input.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido: </Form.Label>
            <Form.Control
              type="string"
              name="surname"
              placeholder="Apellido"
              className={styles.input}
              value={input.surname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mail: </Form.Label>
            <Form.Control
              type="mail"
              name="email"
              placeholder="Email"
              className={styles.input}
              value={input.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="string"
              name="username"
              placeholder="Username"
              className={styles.input}
              value={input.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={input.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Plan Standard --> U$S 5/Month" />
          </Form.Group>
          <Button variant="primary" type="submit" className={styles.button}>
            Siguiente
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Subscription;
