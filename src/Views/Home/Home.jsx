import { useState } from "react";
import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../../Components/AuthProvider/AuthProvider";
import { getUserById } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Home.module.css";

const Home = () => {
  const [username, setUsername] = useState("");
  // console.log(username)
  const [password, setPassword] = useState("");
  // console.log(password)
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Debe ingresar un usuario y/o password!",
          // footer: '<a href="#">Why do I have this issue?</a>',
        });
        return;
      }
      if (username && password) {
        const data = await axios.post(
          "https://molecular-ferdinande-ezequielrubio-c5ad57aa.koyeb.app/login",
          {
            username,
            password,
          }
        );
        const userData = data.data;
        // console.log(userData);
        if (data.status === 200) {
          const { accessToken, refreshToken } = userData;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("userName", userData.user.name);
          localStorage.setItem("userId", userData.user.id);
          auth.setIsAuthenticated(true);
          dispatch(getUserById(userData.user.id));
          navigate("/dashboard");
        }
      }
    } catch (error) {
      // console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Verificar los datos ingresados",
        });
      }
    }
  };


  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <h1 className={styles.title}>MediApp</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter Username"
              value={username}
              onChange={handleUsername}
              className={styles.input}
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
              className={styles.input}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
          <Button variant="primary" type="submit" className={styles.button}>
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Home;
