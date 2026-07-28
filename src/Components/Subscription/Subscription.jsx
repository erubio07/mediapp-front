import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router";
import styles from "./Subscription.module.css";

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
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

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="m4 7 8 6 8-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
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

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle
      cx="9"
      cy="8"
      r="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle
      cx="17"
      cy="9"
      r="2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M14 15c3.5-.3 5.7 1.4 6.5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const Subscription = () => {
  const [input, setInput] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /*
      Acá podés agregar más adelante la petición al backend.
      Por ahora se mantiene solamente la carga del formulario.
    */

    console.log(input);
  };

  return (
    <main className={styles.container}>
      <div className={styles.backgroundDecorationOne} />
      <div className={styles.backgroundDecorationTwo} />

      <section className={styles.subscriptionLayout}>
        <aside className={styles.institutionalPanel}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>
              <DocumentIcon />
            </span>

            <div>
              <span className={styles.brandName}>MediApp</span>
              <span className={styles.brandDescription}>
                Gestión profesional de mediaciones
              </span>
            </div>
          </div>

          <div className={styles.institutionalContent}>
            <span className={styles.eyebrow}>
              Registro de usuarios
            </span>

            <h1 className={styles.institutionalTitle}>
              Comience a utilizar MediApp
            </h1>

            <p className={styles.institutionalDescription}>
              Complete sus datos para crear una cuenta y acceder a
              las herramientas destinadas a profesionales de la
              mediación.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <DocumentIcon />
                </span>

                <div>
                  <strong>Documentación ágil</strong>
                  <p>
                    Genere documentos de manera rápida, clara y
                    organizada.
                  </p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <ShieldIcon />
                </span>

                <div>
                  <strong>Información segura</strong>
                  <p>
                    Mantenga sus datos y expedientes dentro de un
                    entorno protegido.
                  </p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <UsersIcon />
                </span>

                <div>
                  <strong>Acceso profesional</strong>
                  <p>
                    Herramientas pensadas para mediadores y
                    profesionales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.securityCard}>
            <span className={styles.securityCardIcon}>
              <ShieldIcon />
            </span>

            <div>
              <strong>Sus datos están protegidos</strong>
              <p>
                La información ingresada se utilizará únicamente para
                gestionar su cuenta.
              </p>
            </div>
          </div>
        </aside>

        <div className={styles.formPanel}>
          <div className={styles.sub}>
            <header className={styles.formHeader}>
              <span className={styles.formEyebrow}>
                Crear cuenta
              </span>

              <h2 className={styles.title}>Suscribirse</h2>

              <p className={styles.formDescription}>
                Complete el formulario para comenzar.
              </p>
            </header>

            <Form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.row}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.label}>
                    Nombre
                  </Form.Label>

                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                      <UserIcon />
                    </span>

                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Ingrese su nombre"
                      className={styles.input}
                      value={input.name}
                      onChange={handleChange}
                      autoComplete="given-name"
                    />
                  </div>
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.label}>
                    Apellido
                  </Form.Label>

                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                      <UserIcon />
                    </span>

                    <Form.Control
                      type="text"
                      name="surname"
                      placeholder="Ingrese su apellido"
                      className={styles.input}
                      value={input.surname}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </div>
                </Form.Group>
              </div>

              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.label}>
                  Correo electrónico
                </Form.Label>

                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <MailIcon />
                  </span>

                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    className={styles.input}
                    value={input.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>

                <Form.Text className={styles.helperText}>
                  Nunca compartiremos su correo electrónico con
                  terceros.
                </Form.Text>
              </Form.Group>

              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.label}>
                  Nombre de usuario
                </Form.Label>

                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <UserIcon />
                  </span>

                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Elija un nombre de usuario"
                    className={styles.input}
                    value={input.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </div>
              </Form.Group>

              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.label}>
                  Contraseña
                </Form.Label>

                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <LockIcon />
                  </span>

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Cree una contraseña segura"
                    className={styles.input}
                    value={input.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>

                <Form.Text className={styles.helperText}>
                  Utilice una contraseña de al menos 6 caracteres.
                </Form.Text>
              </Form.Group>

              <div className={styles.planSection}>
                <span className={styles.planLabel}>
                  Plan seleccionado
                </span>

                <label className={styles.planCard}>
                  <Form.Check
                    type="radio"
                    name="plan"
                    defaultChecked
                    className={styles.planRadio}
                    aria-label="Seleccionar plan standard"
                  />

                  <span className={styles.planIcon}>
                    <DocumentIcon />
                  </span>

                  <span className={styles.planInformation}>
                    <strong>Plan Standard</strong>
                    <small>
                      Acceso completo a todas las funcionalidades
                    </small>
                  </span>

                  <span className={styles.planPrice}>
                    U$S 5
                    <small>/ mes</small>
                  </span>
                </label>
              </div>

              <div className={styles.informationMessage}>
                <span className={styles.informationIcon}>i</span>

                <p>
                  Podrá cambiar de plan o cancelar su suscripción en
                  cualquier momento.
                </p>
              </div>

              <Button
                variant="primary"
                type="submit"
                className={styles.button}
              >
                Siguiente
                <span
                  className={styles.buttonArrow}
                  aria-hidden="true"
                >
                  →
                </span>
              </Button>

              <div className={styles.loginMessage}>
                <span>¿Ya tiene una cuenta?</span>

                <Link to="/" className={styles.link}>
                  Iniciar sesión
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Subscription;
