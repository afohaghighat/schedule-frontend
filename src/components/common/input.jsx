import React from "react";

const Input = ({ name, label, error, renderError = true, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && renderError && (
        <div className="alert alert-danger">{error}</div>
      )}
    </div>
  );
};

export default Input;
