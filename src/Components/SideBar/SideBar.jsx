import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../AuthProvider/AuthProvider";
import { getUserById } from "../../Redux/actions";
import {
  TfiPowerOff,
  TfiUser,
  TfiPencilAlt,
  TfiWrite,
  TfiIdBadge,
} from "react-icons/tfi";
import styles from "./SideBar.module.css";

const SideBar = ({ handleOption }) => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const id = localStorage.getItem("userId");
  const storedName = localStorage.getItem("userName") || "";
  const storedSurname = localStorage.getItem("userSurname") || "";

  const user = useSelector((state) => state.user);

  const [activeOption, setActiveOption] = useState("dashboard");

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id, dispatch]);

  const userName = user?.name || storedName || "Usuario";
  const userSurname = user?.surname || storedSurname || "";

  const fullName = `${userName} ${userSurname}`.trim();

  const userRole =
    user?.RoleId === 1
      ? "Administrador"
      : user?.RoleId === 2
        ? "Profesional"
        : "Usuario";

  const initials = `${userName?.charAt(0) || ""}${
    userSurname?.charAt(0) || ""
  }`.toUpperCase();

  const selectOption = (option) => {
    setActiveOption(option);
    handleOption(option);
  };

  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandContainer}>
        <div className={styles.brandIcon}>
          <TfiWrite />
        </div>

        <div className={styles.brandInformation}>
          <strong>MediApp</strong>
          <span>Gestión profesional de mediaciones</span>
        </div>
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.profileImage}>
          {initials || <TfiUser />}
        </div>

        <div className={styles.profileInformation}>
          <strong>{fullName}</strong>
          <span>{userRole}</span>

          <div className={styles.onlineStatus}>
            <span className={styles.onlineDot}></span>
            En línea
          </div>
        </div>
      </div>

      <nav className={styles.linkContainer}>
        <div className={styles.navigationSection}>
          <span className={styles.sectionTitle}>Principal</span>

          <Link
            onClick={() => selectOption("dashboard")}
            className={`${styles.link} ${
              activeOption === "dashboard"
                ? styles.activeLink
                : ""
            }`}
          >
            <TfiPencilAlt />

            <span>Dashboard</span>
          </Link>

          {(user?.RoleId === 1 || user?.RoleId === 2) && (
            <Link
              onClick={() => selectOption("contracts")}
              className={`${styles.link} ${
                activeOption === "contracts"
                  ? styles.activeLink
                  : ""
              }`}
            >
              <TfiWrite />

              <span>Crear contratos</span>
            </Link>
          )}
        </div>

        <div className={styles.navigationDivider}></div>

        <div className={styles.navigationSection}>
          <span className={styles.sectionTitle}>
            Administración
          </span>

          <Link
            onClick={() => selectOption("edituser")}
            className={`${styles.link} ${
              activeOption === "edituser"
                ? styles.activeLink
                : ""
            }`}
          >
            <TfiIdBadge />

            <span>Editar usuario</span>
          </Link>

          {user?.RoleId === 1 && (
            <Link
              onClick={() => selectOption("users")}
              className={`${styles.link} ${
                activeOption === "users"
                  ? styles.activeLink
                  : ""
              }`}
            >
              <TfiUser />

              <span>Usuarios</span>
            </Link>
          )}
        </div>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.planCard}>
          <div className={styles.planHeader}>
            <div className={styles.planIcon}>
              <TfiPencilAlt />
            </div>

            <div className={styles.planInformation}>
              <strong>Plan Profesional</strong>
              <span>Funciones habilitadas</span>
            </div>
          </div>

          <button
            type="button"
            className={styles.planButton}
          >
            Ver mi plan
            <span aria-hidden="true">›</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className={`${styles.link} ${styles.logoutLink}`}
        >
          <TfiPowerOff />

          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
