import "./App.css";
import Home from "./Components/Pages/Home";
import Weather from "./Components/Pages/Weather";
import Error from "./Components/Pages/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/weather/:lat/:lon" element={<Weather />} />
          <Route
            path="*"
            element={<Error error="PAGE NOT FOUND" status={200} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
