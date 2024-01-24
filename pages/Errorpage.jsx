import React, { useEffect } from "react";
import { MdError } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Errorpage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);
  //above thing used to redirect to homepage automatically after 2 seconds

  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <FaHome
        onClick={() => navigate("/")}
        style={{ margin: "0 auto", padding: "20px", scale: "2" }}
      />
      <h1 style={{ fontSize: "50px", margin: "0 auto" }}>404 Not Found :(</h1>
      <MdError style={{ height: "200px", width: "200px", margin: "0 auto" }} />
      <h6 style={{ fontSize: "20px", margin: "0 auto" }}>
        Please try with another username.
      </h6>
    </div>
  );
}
