import { useMutation } from "@apollo/client";
import { DELETE_SHIFT } from "../utils/mutations";
import { Shift } from "../context/Shift";
import { format } from "date-fns";

interface ShiftCardProps {
  shift: Shift;
}

const locationsMap: Record<string, string> = {
  GOTG: "Guardians of the Galaxy: Cosmic Rewind",
  SSE: "Spaceship Earth",
  MS: "Mission: Space",
  TT: "Test Track",
};

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift }) => {
  const [delShift] = useMutation(DELETE_SHIFT);

  const handleDeleteShift = async () => {
    try {
      const enteredPerner = prompt("Please enter your perner.");
      if (!enteredPerner) return;

      if (enteredPerner !== shift.perner) {
        alert("Perner does not match. Deletion cancelled.");
        return;
      }

      await delShift({ variables: { shiftId: shift._id } });
      alert("Shift successfully deleted.");
    } catch (err) {
      console.error("Error deleting Shift:", err);
      alert("An error occurred while deleting the shift.");
    }
  };

  // Format readable date
  const formattedDate = shift.day
    ? format(new Date(shift.day), "MMM d, yyyy")
    : "No date";

  const dayOfWeek = shift.day
    ? format(new Date(shift.day), "EEEE")
    : "";

  const startTime = shift.startTime || "";
  const endTime = shift.endTime || "";

  return (
    <div className="shift-card">
      {/* Delete Button */}
      <button className="delete-btn red" onClick={handleDeleteShift}>
        ×
      </button>

      {/* Top Row: Date and Day */}
      <div className="shift-card-header">
        <div>
          <div className="shift-date">{formattedDate}</div>
          <div className="shift-day">{dayOfWeek.toUpperCase()}</div>
        </div>
      </div>

      {/* Center Time Range */}
      <div className="shift-time-section">

        {/* shift status here. */}
        <h4>{shift.status === 'giving' ? 'Giving' : shift.status === 'looking' ? 'Picking Up' : 'Trading'}</h4>


        <div className="shift-time-range">
          {shift.status === "looking" ? (
            // Picking up
            <>
              {startTime === "00:00" && endTime === "23:45" ? (
                <span className="shift-tbd">Time TBD</span>
              ) : startTime === "00:00" ? (
                <span className="shift-end">Out before {endTime}</span>
              ) : endTime === "23:45" ? (
                <span className="shift-start">Start after {startTime}</span>
              ) : (
                <>
                  <span className="shift-start">{startTime}</span>
                  <span className="shift-separator">–</span>
                  <span className="shift-end">{endTime}</span>
                </>
              )}
            </>
          ) : (
            // Giving or trading
            <>
              {startTime === "00:00" && endTime === "23:45" ? (
                <span className="shift-tbd">Time TBD</span>
              ) : (
                <>
                  <span className="shift-start">{startTime}</span>
                  <span className="shift-separator">–</span>
                  <span className="shift-end">{endTime}</span>
                </>
              )}
            </>
          )}
        </div>

        {/* add the location to className */}
        <div className={`shift-location ${shift.location.toLowerCase()}`}>
          {locationsMap[shift.location] ?? shift.location}
        </div>
      </div>

      {/* Footer: Employee + Notes */}
      <div className="shift-footer">
        <p className="shift-employee">
          <strong>{shift.employee ?? "Unknown"}</strong>
        </p>
        <p className="shift-notes">
          <em>{shift.notes || "This Cast Member has no preferences."}</em>
        </p>
      </div>
    </div>
  );
};
