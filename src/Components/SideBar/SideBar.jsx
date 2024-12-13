import { React, useEffect, useState } from "react";
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
  // console.log(id);
  const user = useSelector((state) => state.user);
  // console.log(user);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id, dispatch]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.profileContainer}>
        <TfiUser className={styles.profileImage} />
        {/* <img
          src={<FcReddit/>}
          alt="Imagen de perfil"
          
        /> */}
      </div>
      <div className={styles.linkContainer}></div>
      {(user.RoleId === 1 || user.RoleId === 2) && (
        <>
          <Link
            onClick={() => handleOption("contracts")}
            className={styles.link}
          >
            <TfiWrite /> Crear Contratos
          </Link>
        </>
      )}
      {user.RoleId === 1 && (
        <>
          <h6>Opciones Admin</h6>
        </>
      )}

      <Link onClick={() => handleOption("edituser")} className={styles.link}>
        <TfiIdBadge /> Editar Usuario
      </Link>
      <Link onClick={() => auth.logOut()} className={styles.link}>
        <TfiPowerOff /> Logout
      </Link>
    </div>
  );
};

export default SideBar;
