import axios from "axios";
import { useState } from "react";
import cssClasses from "./Home.module.css";
import Button from "../../components/Button";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Home = ({ setToken }) => {
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(
        "http://localhost:4000/api/upload",
        formData,
        config
      );
      alert(data);
    } catch (err) {
      console.error(err);
    }
  };

  const logoutHandler = () => {
    cookies.remove("token");
    setToken(null);
  };

  return (
    <div className={cssClasses.Home}>
      <h2>Welcome to my app</h2>
      <div>
        <div>
          <input
            style={{ display: "none" }}
            id="fileInput"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
          />
          <Button
            btnText="Add File"
            onClick={() => document.getElementById("fileInput").click()}
          />
        </div>
        <form onSubmit={submitHandler}>
          <p>{file?.name}</p>
          <p>{file?.type}</p>
          <Button type="submit" btnText="Upload" />
        </form>
      </div>
      <Button onClick={logoutHandler} btnText="Logout" />
    </div>
  );
};

export default Home;
