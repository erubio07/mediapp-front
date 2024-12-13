import { Routes, Route } from "react-router";
import Home from "../src/Views/Home/Home";
import Dashboard from "./Views/Dashboard/Dashboard";
import { AuthProvider } from "./Components/AuthProvider/AuthProvider";
import { ProtectedRoutes } from "./Components/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/dashboard"
            element={<ProtectedRoutes element={<Dashboard />} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
