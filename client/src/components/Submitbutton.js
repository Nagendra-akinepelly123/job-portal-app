import React from "react";
import { Link } from "react-router-dom";

const Submitbutton = ({
  paraTagText,
  linkTagText,
  buttonTagText,
  destinationPath,
}) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <p>
          {paraTagText} <Link to={destinationPath}>{linkTagText}</Link>
        </p>
        <button type="submit" className="btn btn-primary">
          {buttonTagText}
        </button>
      </div>
    </>
  );
};

export default Submitbutton;
