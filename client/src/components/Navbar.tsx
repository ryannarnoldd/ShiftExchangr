import { useEffect, useState } from "react";

export default function Navbar() {
  const [is24Hour, setIs24Hour] = useState(true);
  

  useEffect(() => {
    const saved = localStorage.getItem("timeFormat");
    if (saved === "12") setIs24Hour(false);
  }, []);

  const toggleTimeFormat = () => {
    setIs24Hour(prev => {
      const next = !prev;
      localStorage.setItem("timeFormat", next ? "24" : "12");
      return next;
    });
    window.location.reload();
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
            onClick={toggleTimeFormat}
            aria-label="Toggle time format"
          >
            {is24Hour ? "24 hr" : "12 hr"}
          </button>
      </div>
    </nav>
  );
}
