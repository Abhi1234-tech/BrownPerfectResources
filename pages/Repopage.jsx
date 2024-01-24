import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { usernameAtom, fetchdata, repodata } from "../store/Atomstore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGithub, FaHome } from "react-icons/fa";
import "./Repopage.css";
import { MdVerified } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";

export default function Repopage() {
  const [data, setData] = useAtom(fetchdata);
  const [username] = useAtom(usernameAtom);
  const navigate = useNavigate();
  const [repo, setRepo] = useAtom(repodata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://api.github.com/users/${username}`,
        );
        setData(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/error");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const result = await axios.get(
          `https://api.github.com/users/${username}/repos`,
        );
        setRepo(result.data);
      } catch (error) {
        console.error("Error fetching repo data:", error);
      }
    };

    fetchRepo();
  }, []);

  return (
    <div className="repomain data-scroll">
      <div className="repopage">
        <div className="navbarrepo">
          <div className="left-content">
            <FaGithub href="https://github.com/" className="repoicon" />
            <p>{username.charAt(0).toUpperCase() + username.slice(1)}</p>
          </div>
          <div className="right-content">
            <FaHome className="home" onClick={() => navigate("/")} />
            <div className="profile">
              <img
                onClick={() => {
                  navigate("/userprofile");
                }}
                src={data.avatar_url}
                alt={data.name}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="showrepo">
        <div className="showrepo-content">
          {repo.length > 0 ? (
            repo.map((repoItem) => (
              <div className="card" key={repoItem.id}>
                <div className="repo-title">
                  <div style={{ display: "flex", alignItems: "centre" }}>
                    <img
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        transform: "translateY(12px)",
                        margin: "0 7px",
                        mixBlendMode: "multiply",
                      }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNiR2Bg4nGIvuGnFSPKTX18BixoiDNmodcrA&usqp=CAU"
                      alt={repoItem.owner.login}
                    />
                    <h3
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => (window.location.href = repoItem.html_url)}
                    >
                      {repoItem.name.charAt(0).toUpperCase() +
                        repoItem.name.slice(1)}
                    </h3>
                  </div>
                  <MdVerified style={{ color: "green" }} className="verified" />
                </div>
                <div className="card-content">
                  {repoItem.description ? (
                    <p>{repoItem.description}</p>
                  ) : (
                    <p>{repoItem.html_url}</p>
                  )}
                  <div className="footer">
                    <div className="footer-language">
                      <p className="lang">
                        {repoItem.language && (
                          <>
                            <FaCode />
                            {repoItem.language}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="footer-star">
                      <FaRegStar />
                      <p className="star">{repoItem.stargazers_count}</p>
                    </div>
                    <div className="footer">
                      <FaCodeFork />
                      <p className="fork">{repoItem.forks_count}</p>
                    </div>
                    <div className="footer">
                      <button>{repoItem.visibility}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No repositories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
