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

    if (storedUserId) {
      setUserId(storedUserId);
    }

    /*
     * No existe ningún token.
     * No hay sesión posible.
     */

    if (!accessToken && !refreshToken) {
      clearSession();
      return;
    }

    /*
     * Tenemos Access Token.
     * Comprobamos si todavía está vigente.
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
     * Llegamos acá si:
     *
     * - el access token venció
     * - o el access token no es válido
     *
     * PERO todavía tenemos refresh token.
     *
     * NO cerramos la sesión.
     *
     * api.js será el encargado de solicitar
     * un nuevo access token cuando se haga
     * la próxima petición protegida.
     */

    if (refreshToken) {
      setIsAuthenticated(true);
      return;
    }

    /*
     * No tenemos forma de recuperar
     * la sesión.
     */

    clearSession();
  }, [clearSession]);

  /*
   * ==========================================
   * LOGOUT
   * ==========================================
   */

  const logOut = () => {
    clearSession();
  };

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
