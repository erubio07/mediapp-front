import { Routes, Route } from "react-router";
import Home from "../src/Views/Home/Home";
import Dashboard from "./Views/Dashboard/Dashboard";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Subscription from "./Components/Subscription/Subscription";
import { AuthProvider } from "./Components/AuthProvider/AuthProvider";
import { ProtectedRoutes } from "./Components/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/subs" element={<Subscription/>} />
          <Route
            exact
            path="/dashboard"
            element={<ProtectedRoutes element={<Dashboard />} />}
          />
        </Routes>
        {/* <Footer /> */}
      </AuthProvider>
    </div>
  );
}

export default App;
