import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const [is24Hour, setIs24Hour] = useState(true);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("timeFormat");
    if (saved === "12") setIs24Hour(false);
  }, []);

  // Save preference whenever it changes
  useEffect(() => {
    localStorage.setItem("timeFormat", is24Hour ? "24" : "12");
  }, [is24Hour]);

  const handleToggle = () => {
    setIs24Hour((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Shift Exchangr</h1>
      <div className="timeFormat">
          <label className="time-format-label">
            Time Format:
          </label> 
          <button
            className="time-toggle-btn"
            onClick={handleToggle}
            aria-label="Toggle time format"
          >
            {is24Hour ? "24 hr" : "12 hr"}
          </button>
      </div>
    </nav>
  );
}
