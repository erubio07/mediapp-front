import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../Components/SideBar/SideBar";
import { getUserById } from "../../Redux/actions";
import CreateDocuments from "../../Components/CreateDocuments/CreateDocuments";
// Importá EditUser desde la ubicación real de tu proyecto.
// import EditUser from "../../Components/EditUser/EditUser";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [option, setOption] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const id = localStorage.getItem("userId");
  const storedName = localStorage.getItem("userName") || "";

  const handleOption = (selectedOption) => {
    setOption(selectedOption);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id, dispatch]);

  const userName = user?.name || storedName || "Usuario";

  const canCreateContracts =
    user?.RoleId === 1 || user?.RoleId === 2;

  const renderContent = () => {
    if (option === "contracts" && canCreateContracts) {
      return (
        <div className={styles.componentContainer}>
          <CreateDocuments />
        </div>
      );
    }

    if (option === "edituser") {
      return (
        <div className={styles.componentContainer}>
          {/*
            Reemplazá este bloque por:

            <EditUser />

            cuando tengas importado el componente.
          */}
          <div className={styles.placeholderCard}>
            <span className={styles.placeholderEyebrow}>
              Configuración de cuenta
            </span>

            <h2>Editar usuario</h2>

            <p>
              En este sector se mostrará el formulario para modificar
              los datos personales y de acceso del usuario.
            </p>
          </div>
        </div>
      );
    }

    if (option === "users" && user?.RoleId === 1) {
      return (
        <div className={styles.componentContainer}>
          <div className={styles.placeholderCard}>
            <span className={styles.placeholderEyebrow}>
              Administración
            </span>

            <h2>Gestión de usuarios</h2>

            <p>
              Desde aquí el administrador podrá consultar y gestionar
              los usuarios registrados en MediApp.
            </p>
          </div>
        </div>
      );
    }

    return (
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <span className={styles.eyebrow}>Dashboard</span>

          <h1 className={styles.welcomeTitle}>
            Bienvenido al Panel de Usuario, {userName}
            <span
              className={styles.welcomeEmoji}
              aria-hidden="true"
            >
              👋
            </span>
          </h1>

          <p className={styles.welcomeDescription}>
            Seleccioná una opción del menú lateral para comenzar a
            gestionar tus mediaciones y documentos.
          </p>
        </div>

        <div
          className={styles.welcomeDecoration}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundCircleOne} />
      <div className={styles.backgroundCircleTwo} />
      <div className={styles.backgroundDots} />

      <SideBar handleOption={handleOption} />

      <main className={styles.content}>
        <div className={styles.contentInner}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
