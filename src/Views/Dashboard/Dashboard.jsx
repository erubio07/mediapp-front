import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../Components/SideBar/SideBar";
import { getUserById } from "../../Redux/actions";
import CreateDocuments from "../../Components/CreateDocuments/CreateDocuments";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [option, setOption] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const id = localStorage.getItem("userId");

  const handleOption = (option) => {
    setOption(option);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SideBar handleOption={handleOption} />
        {(user.RoleId === 1 || user.RoleId === 2) && (
          <div>
            {option === "" && (
              <h2>Bienvenido al Panel de Usuario {user.name}</h2>
            )}
            {option === "contracts" && <CreateDocuments />}
          </div>
        )}
        {option === "edituser" && <EditUser />}
      </div>
    </div>
  );
};

export default Dashboard;
