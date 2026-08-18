import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../Components/AuthProvider/AuthProvider";
import { getUserById } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Home.module.css";

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inputIcon}>
    <circle
      cx="12"
      cy="8"
      r="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M4.5 21c.7-4.7 3.2-7 7.5-7s6.8 2.3 7.5 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inputIcon}>
    <rect
      x="5"
      y="10"
      width="14"
      height="11"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M8 10V7a4 4 0 0 1 8 0v3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 2h8l4 4v16H6V2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M14 2v5h4M9 12h6M9 16h6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2 20 5v6c0 5.1-3.2 8.8-8 11-4.8-2.2-8-5.9-8-11V5l8-3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />

    <path
      d="m8.7 12 2.1 2.1 4.7-4.7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        Swal.fire({
          icon: "error",
          title: "Datos incompletos",
          text: "Debe ingresar un usuario y una contraseña.",
          confirmButtonColor: "#173e5d",
        });

        return;
      }

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

      const data = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      const userData = data.data;

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
    } catch (error) {
      console.log("ERROR COMPLETO:", error);
      console.log("RESPUESTA BACKEND:", error.response?.data);

      if (error.response?.data?.error) {
        Swal.fire({
          icon: "error",
          title: "No fue posible iniciar sesión",
          text: error.response.data.error,
          confirmButtonColor: "#173e5d",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "No fue posible iniciar sesión",
          text: "Verifique los datos ingresados e intente nuevamente.",
          confirmButtonColor: "#173e5d",
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
    <main className={styles.container}>
      <div className={styles.backgroundDecorationOne} />
      <div className={styles.backgroundDecorationTwo} />

      <section className={styles.loginLayout}>
        <div className={styles.institutionalPanel}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}>
              <DocumentIcon />
            </div>

            <span className={styles.brandName}>MediApp</span>
          </div>

          <div className={styles.institutionalContent}>
            <span className={styles.eyebrow}>
              Gestión profesional de mediaciones
            </span>

            <h1 className={styles.institutionalTitle}>
              Documentación organizada, segura y accesible.
            </h1>

            <p className={styles.institutionalDescription}>
              Centralice la información de cada expediente y genere documentos
              de mediación de forma ágil y ordenada.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <DocumentIcon />
                </span>

                <div>
                  <strong>Gestión documental</strong>

                  <p>Complete y genere documentación desde un único entorno.</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <ShieldIcon />
                </span>

                <div>
                  <strong>Acceso protegido</strong>

                  <p>
                    La información se encuentra disponible únicamente para
                    usuarios autorizados.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className={styles.institutionalFooter}>
            Sistema de gestión para profesionales de la mediación.
          </p>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.home}>
            <div className={styles.formHeader}>
              <span className={styles.formEyebrow}>Acceso al sistema</span>

              <h2 className={styles.title}>Iniciar sesión</h2>

              <p className={styles.formDescription}>
                Ingrese sus credenciales para acceder a MediApp.
              </p>
            </div>

            <Form onSubmit={handleLogin} className={styles.form} noValidate>
              <Form.Group
                className={styles.formGroup}
                controlId="formBasicEmail"
              >
                <Form.Label className={styles.label}>Usuario</Form.Label>

                <div className={styles.inputWrapper}>
                  <UserIcon />

                  <Form.Control
                    type="text"
                    placeholder="Ingrese su usuario"
                    value={username}
                    onChange={handleUsername}
                    className={styles.input}
                    autoComplete="username"
                  />
                </div>
              </Form.Group>

              <Form.Group
                className={styles.formGroup}
                controlId="formBasicPassword"
              >
                <div className={styles.labelRow}>
                  <Form.Label className={styles.label}>Contraseña</Form.Label>
                </div>

                <div className={styles.inputWrapper}>
                  <LockIcon />

                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={handlePassword}
                    className={styles.input}
                    autoComplete="current-password"
                  />
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" className={styles.button}>
                Iniciar sesión
                <span className={styles.buttonArrow} aria-hidden="true">
                  →
                </span>
              </Button>

              <div className={styles.divider}>
                <span />
                <p>¿Todavía no tiene una cuenta?</p>
                <span />
              </div>

              <Link to="/subs" className={styles.link}>
                Solicitar suscripción
              </Link>
            </Form>

            <div className={styles.securityMessage}>
              <span className={styles.securityIcon}>
                <ShieldIcon />
              </span>

              <p>Acceso reservado para usuarios autorizados.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
