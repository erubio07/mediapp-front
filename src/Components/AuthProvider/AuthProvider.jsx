import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Redux/actions";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logOut: () => {},
});

// 60 minutos de inactividad
const INACTIVITY_TIME = 60 * 60 * 1000;

// Nombre de la clave que vamos a guardar en localStorage
const LAST_ACTIVITY_KEY = "lastActivity";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

  /*
   * ==========================================
   * LIMPIAR SESIÓN
   * ==========================================
   */

  const clearSession = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem(LAST_ACTIVITY_KEY);

    dispatch(clearUser());

    setUserId(null);
    setIsAuthenticated(false);
  }, [dispatch]);

  /*
   * ==========================================
   * GUARDAR ESTADO DE AUTENTICACIÓN
   * ==========================================
   */

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);

  /*
   * ==========================================
   * COMPROBAR SESIÓN AL INICIAR LA APP
   * ==========================================
   */

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const storedUserId = localStorage.getItem("userId");
    const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);

    /*
     * Si existe una sesión previa, comprobamos
     * primero cuánto tiempo pasó desde la última
     * actividad.
     */

    if (lastActivity) {
      const elapsedTime = Date.now() - Number(lastActivity);

      if (elapsedTime >= INACTIVITY_TIME) {
        console.log("Sesión cerrada por tiempo de inactividad");

        clearSession();
        return;
      }
    }

    if (storedUserId) {
      setUserId(storedUserId);
    }

    /*
     * No existe ningún token.
     */

    if (!accessToken && !refreshToken) {
      clearSession();
      return;
    }

    /*
     * Si existe sesión pero todavía no tenemos
     * registrada actividad, guardamos este momento.
     */

    if (!lastActivity) {
      localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
    }

    /*
     * Comprobamos el access token.
     */

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);

        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          setUserId(decodedToken.id);
          setIsAuthenticated(true);
          return;
        }
      } catch (error) {
        console.error("Error decodificando access token:", error);
      }
    }

    /*
     * Si el access token venció pero existe
     * refresh token, mantenemos la sesión.
     *
     * api.js renovará el access token cuando
     * sea necesario.
     */

    if (refreshToken) {
      setIsAuthenticated(true);
      return;
    }

    clearSession();
  }, [clearSession]);

  /*
   * ==========================================
   * LOGOUT
   * ==========================================
   */

  const logOut = useCallback(() => {
    clearSession();
  }, [clearSession]);

  /*
   * ==========================================
   * CONTROL DE INACTIVIDAD
   * ==========================================
   */

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let inactivityTimer;

    /*
     * Programa el logout teniendo en cuenta
     * cuándo fue la última actividad real.
     */

    const scheduleLogout = () => {
      clearTimeout(inactivityTimer);

      const lastActivity =
        Number(localStorage.getItem(LAST_ACTIVITY_KEY)) || Date.now();

      const elapsedTime = Date.now() - lastActivity;

      const remainingTime = INACTIVITY_TIME - elapsedTime;

      /*
       * Ya pasó el tiempo máximo.
       */

      if (remainingTime <= 0) {
        console.log("Sesión cerrada por inactividad");

        logOut();
        return;
      }

      /*
       * Todavía queda tiempo.
       */

      inactivityTimer = setTimeout(() => {
        console.log("Sesión cerrada por inactividad");

        logOut();
      }, remainingTime);
    };

    /*
     * Cada interacción real actualiza
     * la última actividad.
     */

    const registerActivity = () => {
      localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());

      scheduleLogout();
    };

    /*
     * Cuando el usuario vuelve a la pestaña,
     * comprobamos si mientras estuvo fuera
     * se cumplió el tiempo de inactividad.
     */

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleLogout();
      }
    };

    const activityEvents = ["mousedown", "keydown", "scroll", "touchstart"];

    activityEvents.forEach((event) => {
      window.addEventListener(event, registerActivity);
    });

    window.addEventListener("focus", scheduleLogout);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    /*
     * Al montar el componente NO reiniciamos
     * artificialmente los 60 minutos.
     *
     * Calculamos cuánto tiempo queda desde
     * la última actividad guardada.
     */

    scheduleLogout();

    return () => {
      clearTimeout(inactivityTimer);

      activityEvents.forEach((event) => {
        window.removeEventListener(event, registerActivity);
      });

      window.removeEventListener("focus", scheduleLogout);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated, logOut]);

  /*
   * ==========================================
   * PROVIDER
   * ==========================================
   */

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
