import "./DocumentModal.css";

import React from "react";

const DocumentModal = () => {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="document-container">
      <img
        style={{ margin: "auto" }}
        src={pf + window.localStorage.image}
        alt=""
      />
      <button className="print-btn" onClick={() => window.print()}>
        print
      </button>
    </div>
  );
};

export default DocumentModal;
