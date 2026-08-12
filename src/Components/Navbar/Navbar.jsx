import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/actions";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router";
import styles from "./Navbar.module.css";

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

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="m3 11 9-8 9 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 10v10h14V10M9 20v-6h6v6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

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

const LoginIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M10 4H5v16h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m14 8 4 4-4 4M8 12h10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M10 4H5v16h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 8l4 4-4 4M8 12h9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`${styles.chevron} ${
      open ? styles.chevronOpen : ""
    }`}
  >
    <path
      d="m7 9 5 5 5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  const reduxUser = useSelector((state) => state.user);

  const [profileOpen, setProfileOpen] = useState(false);

  const storedUserId = localStorage.getItem("userId");
  const storedUserName = localStorage.getItem("userName");
  const storedUserSurname = localStorage.getItem("userSurname");

  useEffect(() => {
    if (storedUserId) {
      dispatch(getUserById(storedUserId));
    }
  }, [dispatch, storedUserId]);

  const currentUser = useMemo(() => {
    const hasReduxUser =
      reduxUser &&
      typeof reduxUser === "object" &&
      (reduxUser.id || reduxUser.name);

    if (hasReduxUser) {
      return {
        id: reduxUser.id || storedUserId,
        name: reduxUser.name || storedUserName || "",
        surname: reduxUser.surname || storedUserSurname || "",
      };
    }

    if (storedUserId || storedUserName) {
      return {
        id: storedUserId,
        name: storedUserName || "Usuario",
        surname: storedUserSurname || "",
      };
    }

    return null;
  }, [
    reduxUser,
    storedUserId,
    storedUserName,
    storedUserSurname,
  ]);

  const isLoggedIn = Boolean(currentUser?.id || currentUser?.name);

  const handleLogout = () => {
    auth.logOut();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSurname");

    setProfileOpen(false);
    navigate("/");
  };

  const handleSignIn = () => {
    setProfileOpen(false);
    navigate("/");
  };

  const getInitials = () => {
    if (!currentUser) {
      return "";
    }

    const nameInitial = currentUser.name?.charAt(0) || "";
    const surnameInitial = currentUser.surname?.charAt(0) || "";

    return `${nameInitial}${surnameInitial}`.toUpperCase() || "U";
  };

  const fullName = currentUser
    ? `${currentUser.name || ""} ${
        currentUser.surname || ""
      }`.trim()
    : "";

  return (
    <div className={styles.navbarBackground}>
      <header className={styles.header}>
        <nav
          className={styles.navbar}
          aria-label="Navegación principal"
        >
          <div className={styles.navbarInner}>
            <Link
              to={isLoggedIn ? "/dashboard" : "/"}
              className={styles.brand}
              onClick={() => setProfileOpen(false)}
              aria-label="Ir al inicio de MediApp"
            >
              <span className={styles.brandIcon}>
                <DocumentIcon />
              </span>

              <span className={styles.brandText}>
                <strong>MediApp</strong>
                <small>
                  Gestión profesional de mediaciones
                </small>
              </span>
            </Link>

            {isLoggedIn && (
              <div className={styles.navigationLinks}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${styles.navLink} ${
                      isActive ? styles.navLinkActive : ""
                    }`
                  }
                >
                  <span className={styles.navIcon}>
                    <HomeIcon />
                  </span>

                  <span>Home</span>
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${styles.navLink} ${
                      isActive ? styles.navLinkActive : ""
                    }`
                  }
                >
                  <span className={styles.navIcon}>
                    <DashboardIcon />
                  </span>

                  <span>Dashboard</span>
                </NavLink>
              </div>
            )}

            <div className={styles.userArea}>
              <button
                type="button"
                className={styles.profileButton}
                onClick={() =>
                  setProfileOpen((current) => !current)
                }
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                <span className={styles.avatar}>
                  {isLoggedIn ? getInitials() : <UserIcon />}
                </span>

                <span className={styles.userInformation}>
                  {isLoggedIn ? (
                    <>
                      <small>Hola,</small>
                      <strong>{fullName}</strong>
                    </>
                  ) : (
                    <strong className={styles.signInLabel}>
                      Sign In
                    </strong>
                  )}
                </span>

                <ChevronIcon open={profileOpen} />
              </button>

              <div
                className={`${styles.profileMenu} ${
                  profileOpen ? styles.profileMenuOpen : ""
                }`}
                role="menu"
              >
                {isLoggedIn ? (
                  <>
                    <div className={styles.profileMenuHeader}>
                      <span className={styles.profileMenuAvatar}>
                        {getInitials()}
                      </span>

                      <div>
                        <strong>{fullName}</strong>
                        <small>Usuario autenticado</small>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className={styles.profileMenuLink}
                      onClick={() => setProfileOpen(false)}
                      role="menuitem"
                    >
                      <span>
                        <UserIcon />
                      </span>

                      Mi perfil
                    </Link>

                    <button
                      type="button"
                      className={styles.logoutButton}
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      <span>
                        <LogoutIcon />
                      </span>

                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className={styles.signInButton}
                    onClick={handleSignIn}
                    role="menuitem"
                  >
                    <span>
                      <LoginIcon />
                    </span>

                    Iniciar sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;