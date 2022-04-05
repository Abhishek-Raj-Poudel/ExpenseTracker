import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

function App() {
  return (
    <Router>
      <>
        <Navbar></Navbar>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
