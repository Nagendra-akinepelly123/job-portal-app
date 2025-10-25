import React from "react";

const Inputform = ({ htmlFor, labeltext, type, name, value, handleChange }) => {
  return (
    <>
      <div className="mb-2">
        <label htmlFor={htmlFor} className="form-label">
          {labeltext}
        </label>
        <input
          type={type}
          className="form-control"
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Inputform;
