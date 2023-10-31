import React from "react";

function TasksTabs({ selectedTab, onSelectTab }) {
  return (
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${selectedTab === "All" ? "active" : ""}`}
          id="home-tab"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected={selectedTab === "All"}
          onClick={() => onSelectTab("All")}
        >
          All
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${
            selectedTab === "In Progress" ? "active" : ""
          }`}
          id="profile-tab"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected={selectedTab === "In Progress"}
          onClick={() => onSelectTab("In Progress")}
        >
          In Progress
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${selectedTab === "Completed" ? "active" : ""}`}
          id="contact-tab"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected={selectedTab === "Completed"}
          onClick={() => onSelectTab("Completed")}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TasksTabs;
