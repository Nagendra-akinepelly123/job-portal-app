import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Inputform from "../components/Inputform";
import Submitbutton from "../components/Submitbutton";

const Registerpage = () => {
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("successfully submitted ");
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
            htmlFor={"lastName"}
            labeltext={"LastName"}
            type={"text"}
            name={"lastName"}
            value={lastName}
            handleChange={(e) => setlastName(e.target.value)}
          />

          <Inputform
            htmlFor={"email"}
            labeltext={"Email"}
            type={"email"}
            name={"email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
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
            paraTagText={"Already Register"}
            linkTagText={"Login"}
            buttonTagText={"Register"}
            destinationPath={"/login"}
          />
        </form>
      </div>
    </>
  );
};

export default Registerpage;
