// src/components/ShiftFormModal.tsx
import { useEffect, useState } from "react";
import { BaseModal } from "./BaseModal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";
import { ADD_SHIFT } from "../utils/mutations";
import type { Filter } from "../context/Filter";
import { set } from "mongoose";


type ShiftFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    filter: Filter
};

const locationOptions = ["GOTG", "SSE", "MS", "TT"];

export const ShiftFormModal = ({ isOpen, onClose, filter }: ShiftFormModalProps) => {

    useEffect(() => {
        if (isOpen) {
            setFormData({
                location: filter.location || "",
                day: filter.day || "",
                startTime: filter.startTime || "",
                endTime: filter.endTime || "",
                employee: "",
                notes: "",
            });
        }
    }, [isOpen]);

    const [formData, setFormData] = useState({
        location: filter.location || "",
        day: filter.day || "",
        startTime: filter.startTime || "",
        endTime: filter.endTime || "",
        employee: "",
        notes: "",
    });

    const [addShift, { loading }] = useMutation(ADD_SHIFT);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                    status: "giving",
                    employee: formData.employee || "Unknown",
                    notes: formData.notes || null,
                },
            });

            console.log("Shift added:", formData);
            onClose(); // ✅ close modal on success
            setFormData({
                location: "",
                day: "",
                startTime: "",
                endTime: "",
                employee: "",
                notes: "",
            });
        } catch (err) {
            console.error("Error adding shift:", err);
        }
    };

    return (
        <BaseModal title="Post a Shift" isOpen={isOpen} onClose={onClose}>
            <Form onSubmit={handleFormSubmit}>
                {/* Location */}
                <Form.Group controlId="location" className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Location</option>
                        {locationOptions.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Day */}
                <Form.Group controlId="day" className="mb-3">
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
                <div className="d-flex gap-2">
                    <Form.Group controlId="startTime" className="flex-fill mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="endTime" className="flex-fill mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="endTime"
                            step="900"
                            value={formData.endTime}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                {/* Employee */}
                <Form.Group controlId="employee" className="mb-3">
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
                <Form.Group controlId="notes" className="mb-3">
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
                <div className="d-flex justify-content-end gap-2 mt-3">
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
