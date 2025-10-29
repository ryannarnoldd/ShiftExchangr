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

  const statusClass =
    shift.status?.toLowerCase() === "open" ? "status-open" : "status-closed";

  const handleDeleteShift = async () => {
    try {
      const enteredPerner = prompt("Please enter your perner.");

      if (enteredPerner === null) return; // User canceled the prompt

      if (enteredPerner !== shift.perner) {
        alert("Perner does not match. Deletion cancelled.");
        return;
      }

      console.log("Deleting Shift with ID:", shift._id);
      await delShift({ variables: { shiftId: shift._id } });
      alert("Shift successfully deleted.");
    } catch (err) {
      console.error("Error deleting Shift:", err);
      alert("An error occurred while deleting the shift.");
    }
  };

  return (
    <div className="shift-card">
      <h3>GIVING</h3>
      <p>
        <strong>When:</strong>{" "}
        {shift.startTime
          ? `${shift.startTime} - ${shift.endTime ?? ""}`
          : "TBD"}
      </p>
      <p>
        <strong>Day:</strong> {shift.day}
      </p>
      <p>
        <strong>Location:</strong> {locationsMap[shift.location] ?? shift.location}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={`shift-status ${statusClass}`}>{shift.status}</span>
      </p>
      <p>
        <strong>Posted by:</strong> {shift.employee ?? "Unknown"}
      </p>
      {shift.notes && (
        <p>
          <strong>Notes:</strong> {shift.notes}
        </p>
      )}

      <button className="request-shift-button" onClick={handleDeleteShift}>
        X
      </button>
    </div>
  );
};
