import { Routes, Route } from "react-router";
import Home from "../src/Views/Home";
import CreateDocuments from "./Components/CreateDocuments";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/document" element={<CreateDocuments />} />
      </Routes>
    </div>
  );
}

export default App;
