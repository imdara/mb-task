import { useState } from "react";

const Button = ({ type, onClick, btnText }) => {
  const [hover, setHover] = useState(false);
  const btnStyle = {
    cursor: "pointer",
    margin: "1rem 0",
    backgroundColor: hover ? "#dcdcdc" : "#ebebeb",
    padding: "0.5rem 1rem",
    border: "1px solid #dfdfdf",
    borderRadius: "5px",
  };
  return (
    <button
      style={btnStyle}
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {btnText}
    </button>
  );
};

export default Button;
