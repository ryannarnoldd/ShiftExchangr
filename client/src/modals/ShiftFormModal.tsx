// src/components/ShiftFormModal.tsx
import { useState } from "react";
import { BaseModal } from "./BaseModal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type ShiftFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (shift: {
    location: string;
    day: string;
    startTime: string;
    endTime: string;
  }) => void;
};

export const ShiftFormModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ShiftFormModalProps) => {
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location || !day || !startTime || !endTime) {
      alert("Please fill out all fields.");
      return;
    }

    if (startTime >= endTime) {
      alert("Start time must be before end time.");
      return;
    }

    onSubmit({ location, day, startTime, endTime });
    onClose();
  };

  const handleClear = () => {
    setLocation("");
    setDay("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <BaseModal title="Post a Shift" isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="location" className="mb-3">
          <Form.Label>Location</Form.Label>
            <Form.Control
                as="select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="GOTG">GOTG</option>
              <option value="SSE">SSE</option>
              <option value="MS">Mission Space</option>
              <option value="TT">Test Track</option>
            </Form.Control>


        </Form.Group>

        <Form.Group controlId="day" className="mb-3">
          <Form.Label>Day</Form.Label>
          <Form.Control
            type="date"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Form.Group controlId="startTime" className="flex-fill mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="endTime" className="flex-fill mb-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="outline-dark" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit Shift
          </Button>
        </div>
      </Form>
    </BaseModal>
  );
};
