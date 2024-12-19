import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Subscription.module.css";

const Subscription = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sub}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre: </Form.Label>
            <Form.Control
              type="string"
              placeholder="Nombre"
              className={styles.input}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido: </Form.Label>
            <Form.Control
              type="string"
              placeholder="Apellido"
              className={styles.input}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mail: </Form.Label>
            <Form.Control
              type="mail"
              placeholder="Email"
              className={styles.input}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="string"
              placeholder="Username"
              className={styles.input}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className={styles.input}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Plan Standard" />
          </Form.Group>
          <Button variant="primary" type="submit" className={styles.button}>
            Siguiente
          </Button>
        </Form>
            </div>
      </div>
    );
}

export default Subscription;