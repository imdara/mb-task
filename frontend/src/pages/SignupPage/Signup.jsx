import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import cssClasses from "./Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [user, setUser] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/signup",
        user
      );
      alert(data);
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };

  return (
    <div className={cssClasses.signupSection}>
      <h2>Signup</h2>
      <form className={cssClasses.signupForm} onSubmit={submitHandler}>
        <div className={cssClasses.signupFormItem}>
          <label className={cssClasses.signupFormLabel} htmlFor="userName">
            Username:
          </label>
          <br />
          <input
            id="userName"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className={cssClasses.signupFormInput}
            type="text"
          />
        </div>
        <div className={cssClasses.signupFormItem}>
          <label className={cssClasses.signupFormLabel} htmlFor="password">
            Password:
          </label>
          <br />
          <input
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className={cssClasses.signupFormInput}
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
        <Button type="submit" btnText="Signup" />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
