import "./Userprofile.css";

import { useAtom } from "jotai";
import { fetchdata } from "../store/Atomstore";
import { GoOrganization } from "react-icons/go";
import { MdMarkEmailRead } from "react-icons/md";
import { SlUserFollowing } from "react-icons/sl";
import { MdOutlineVerified } from "react-icons/md";
import { IoHome, IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Userprofile() {
  const navigate = useNavigate();
  const [data] = useAtom(fetchdata);

  return (
    <div className="userprofile data-scroll">
      <div className="userprofile-header">
        <IoHome
          style={{
            scale: "1.5",
            margin: "8px 0",
            cursor: "pointer",
            margin: "0 30px",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
        <IoArrowBackSharp
          style={{ scale: "1.5", margin: "8px 0", cursor: "pointer" }}
          onClick={() => {
            navigate("/repos");
          }}
        />
      </div>
      <img src={data.avatar_url} alt="User Avatar" />

      <h1>{data.name}</h1>
      <MdOutlineVerified
        style={{ scale: "1.6", color: "green", margin: "20px 0" }}
      />
      <h5>{data.login}</h5>
      {data.bio ? <p>{data.bio}</p> : null}
      {data.company ? <p>{data.company}</p> : null}
      {data.location ? (
        <>
          <GoOrganization />
          <p>{data.location}</p>
        </>
      ) : null}

      {data.email ? (
        <>
          <MdMarkEmailRead />
          <p>{data.email}</p>
        </>
      ) : null}

      <div className="followers">
        <h5 style={{ display: "flex", alignItems: "center" }}>
          <SlUserFollowing style={{ margin: "10px", color: "red" }} />{" "}
          Followers:{data.followers}
        </h5>
        <h5 style={{ display: "flex", alignItems: "center" }}>
          <SlUserFollowing style={{ margin: "10px", color: "green" }} />{" "}
          Following:{data.following}
        </h5>
      </div>
    </div>
  );
}
