import React from "react";
import loading from "../../icons/loading.svg";

function Loading() {
  return (
    <div className="loading text-center">
      <div className="loading-icon">
        <img src={loading} alt="" width={250} />
      </div>
    </div>
  );
}

export default Loading;
