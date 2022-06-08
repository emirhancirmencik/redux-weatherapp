import React from "react";
import { Link } from "react-router-dom";

function Error({ error }) {
  return (
    <div className="error">
      <div className="error-text text-center ">
        <span className="bg-info">
          {error} <hr />
        </span>{" "}
        <Link to={`/`} className="city bg-danger">
          HOME
        </Link>
      </div>
    </div>
  );
}

export default Error;
