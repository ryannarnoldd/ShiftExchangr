import { useMutation } from "@apollo/client";
import { DELETE_SHIFT } from "../utils/mutations";
import { Shift } from "../context/Shift";

interface ShiftCardProps {
  shift: Shift;
}

const locationsMap: Record<string, string> = {
  GOTG: "Guardians of the Galaxy: Cosmic Rewind",
  SSE: "Spaceship Earth",
  MS: "Mission Space",
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

  const statusClass =
    shift.status?.toLowerCase() === "open" ? "status-open" : "status-closed";

  return (
    <div className={`shift-card ${statusClass}`}>
      {/* Delete Button */}
      <button className="delete-btn" onClick={handleDeleteShift}>
        ×
      </button>

      {/* Header: Day & Time */}
      <div className="shift-header">
        <h3>{shift.day}</h3>
        <p className="shift-time">
          {shift.startTime
            ? `${shift.startTime} - ${shift.endTime ?? ""}`
            : "TBD"}
        </p>
      </div>

      {/* Body: Labels + Info */}
      <div className="shift-body">
        <p>
          <strong>Location:</strong>{" "}
          <span className="shift-location">
            {locationsMap[shift.location] ?? shift.location}
          </span>
        </p>

        <p>
          <strong>Employee:</strong>{" "}
          <span className="shift-employee">{shift.employee ?? "Unknown"}</span>
        </p>

        {shift.notes && (
          <p>
            <strong>Notes:</strong>{" "}
            <span className="shift-notes">{shift.notes}</span>
          </p>
        )}
      </div>
    </div>
  );
};
