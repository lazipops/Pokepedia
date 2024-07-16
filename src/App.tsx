import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  Navigate,
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Pokemon from "./components/Pokemon.tsx";
import About from "./components/About.tsx";
import Layout from "./Layout.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Pokemon />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route> //catch all for any garbage url typed in
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
