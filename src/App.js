import "./App.css";
import Home from "./Components/Pages/Home";
import Weather from "./Components/Pages/Weather";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/weather/:lat/:lon" element={<Weather />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
