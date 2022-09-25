import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Signup from "./pages/SignupPage/Signup";
import Login from "./pages/LoginPage/Login";
import { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {
  const [token, setToken] = useState(cookies.get("token"));
  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            token ? (
              <Home setToken={setToken} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={token ? <Navigate replace to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={
            token ? <Navigate replace to="/" /> : <Login setToken={setToken} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
