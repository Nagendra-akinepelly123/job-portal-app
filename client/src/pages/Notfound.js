import React from "react";
import { Link } from "react-router-dom";
import Homepage from "./Homepage";

const Notfound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link className="btn btn-success" to="/">
        Go Back
      </Link>
    </div>
  );
};

export default Notfound;
