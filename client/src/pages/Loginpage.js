import React from "react";
import { useState } from "react";
import Inputform from "../components/Inputform";
import { Link } from "react-router-dom";
import Submitbutton from "../components/Submitbutton";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("successfully Logged in ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form className="card p-3" onSubmit={handleSubmit}>
          <img
            src="/assets/images/job.png"
            alt="logo"
            width={300}
            height={250}
          />

          <Inputform
            htmlFor={"name"}
            labeltext={"Name"}
            type={"text"}
            name={"name"}
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />

          <Inputform
            htmlFor={"password"}
            labeltext={"Password"}
            type={"password"}
            name={"password"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Submitbutton
            paraTagText={"Not a user"}
            linkTagText={"Register Here!"}
            buttonTagText={"Login"}
            destinationPath={"/register"}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
