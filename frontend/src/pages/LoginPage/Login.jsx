import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import cssClasses from "./Login.module.css";
import { useState } from "react";
import Button from "../../components/Button";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [user, setUser] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        user
      );
      alert(data?.message);
      if (data?.token) {
        const token = "Bearer " + data.token;
        cookies.set("token", token, { path: "/", maxAge: 1000 * 60 * 60 * 24 });
        setToken(token);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={cssClasses.loginSection}>
      <h2>Login</h2>
      <form className={cssClasses.loginForm} onSubmit={submitHandler}>
        <div className={cssClasses.loginFormItem}>
          <label className={cssClasses.loginFormLabel} htmlFor="userName">
            Username:
          </label>
          <br />
          <input
            id="userName"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className={cssClasses.loginFormInput}
            type="text"
          />
        </div>
        <div className={cssClasses.loginFormItem}>
          <label className={cssClasses.loginFormLabel} htmlFor="password">
            Password:
          </label>
          <br />
          <input
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className={cssClasses.loginFormInput}
            type={passwordVisibility ? "text" : "password"}
          />
        </div>
        <br />
        <input
          onClick={() => setPasswordVisibility(!passwordVisibility)}
          type="checkbox"
          name="showPassword"
          id="showPassword"
        />
        <label htmlFor="showPassword">Show Password</label>
        <br />
        <Button type="submit" btnText="Login" />
        <p>
          Dont have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
