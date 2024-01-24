import React from "react";
import { FaGithub } from "react-icons/fa";
import { useAtom } from "jotai";
import { usernameAtom } from "../store/Atomstore";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const [username, setUsername] = useAtom(usernameAtom);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter a username.");
      return;
    }

    try {
      const userExists = await checkUserExists(username);

      if (userExists) {
        navigate("/repos");
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      navigate("/error");
    }
  };

  const checkUserExists = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      return response.ok;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  return (
    <div className="homepage data-scroll">
      <FaGithub className="icon" />

      <input
        type="text"
        name="username"
        placeholder="Search Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="submit" onClick={handleSearch} type="submit">
        Submit
      </button>
    </div>
  );
}
