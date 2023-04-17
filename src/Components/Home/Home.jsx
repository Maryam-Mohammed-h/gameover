import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  let navigate = useNavigate();

  function handleClick() {
    // history.push("/home");
    navigate("/login");
  }

  return (
    <>
      <button className="btn btn-danger" type="button" onClick={handleClick}>
        Go home
      </button>
      <h2>Home</h2>
    </>
  );
}
