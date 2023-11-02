import React from "react";

function LeftColumn() {
  return (
    <div className="col-sm-12 col-md-3 h-100 p-4 rounded-4 bg-light">
      <h2>class_id</h2>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Class 1
        </label>
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Class 2
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked2"
        />
        <label className="form-check-label" htmlFor="flexCheckChecked2">
          Tom Byrne
        </label>
      </div>
    </div>
  );
}

export default LeftColumn;
