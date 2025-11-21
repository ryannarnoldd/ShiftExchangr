import { useEffect, useState } from "react";
import { BaseModal } from "./BaseModal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";
import { ADD_SHIFT } from "../utils/mutations";
import type { Filter } from "../context/Filter";
import { formatTime, generateTimeOptions } from "../utils/utils";
import { locationNames } from "../utils/utils";

const timeOptions = generateTimeOptions();

type ShiftFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filter: Filter;
};

export const ShiftFormModal = ({ isOpen, onClose, filter }: ShiftFormModalProps) => {
  const [addShift, { loading }] = useMutation(ADD_SHIFT);

  const [formData, setFormData] = useState({
    location: filter.location || "",
    day: filter.day || "",
    startTime: filter.startTime || "",
    endTime: filter.endTime || "",
    status: "giving",
    perner: "",
    employee: "",
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        location: filter.location || "",
        day: filter.day || "",
        startTime: filter.startTime || "",
        endTime: filter.endTime || "",
        status: "giving",
        perner: "",
        employee: "",
        notes: "",
      });
    }
  }, [isOpen]);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addShift({
        variables: {
          location: formData.location,
          day: formData.day,
          startTime: formData.startTime,
          endTime: formData.endTime,
          status: formData.status,
          perner: formData.perner,
          employee: formData.employee || "Anonymous",
          notes: formData.notes || null,
        },
      });

      console.log("Shift added:", formData);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Error adding shift:", err);
    }
  };

  return (
    <BaseModal title="Post a Shift" isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={handleFormSubmit} className="shift-form">
        <Form.Group controlId="status">
          <Form.Label>Shift Type</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="giving">Giving</option>
            <option value="looking">Picking Up</option>
          </Form.Select>
        </Form.Group>



        {/* Location */}
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>

            {/* Loop throug hte dict locationames.
            The key is the value. the value is going to be what the users sees. */}
            {Object.entries(locationNames).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Day */}
        <Form.Group controlId="day">
          <Form.Label>Day</Form.Label>
          <Form.Control
            type="date"
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Time Range */}
        <div className="time-range">
          <Form.Group controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Select
              name="startTime"
              value={formData.startTime}
              // Make required only if status in the form above is 'giving'.
              {  ...(formData.status === 'giving' ? { required: true } : {}) }
              


              onChange={handleChange}
            >
              <option value="">Select start</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {formatTime(t)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="endTime">
            <Form.Label>End Time</Form.Label>
            <Form.Select
              name="endTime"
              value={formData.endTime}
              {  ...(formData.status === 'giving' ? { required: true } : {}) }
              onChange={handleChange}
            >
              <option value="">Select end</option>
              {timeOptions
                .filter((t) => !formData.startTime || t > formData.startTime)
                .map((t) => (
                  <option key={t} value={t}>
                    {formatTime(t)}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </div>

        {/* Perner */}
        <Form.Group controlId="perner">
          <Form.Label>Perner</Form.Label>
          <Form.Control
            type="text"
            name="perner"
            placeholder="Your perner"
            value={formData.perner}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Employee */}
        <Form.Group controlId="employee">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="text"
            name="employee"
            placeholder="Optional"
            value={formData.employee}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Notes */}
        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="notes"
            placeholder="Optional notes..."
            value={formData.notes}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Buttons */}
        <div className="form-actions">
          <Button variant="outline-dark" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Shift"}
          </Button>
        </div>
      </Form>
    </BaseModal>
  );
};
