import { useState, useEffect } from "react";
import { ShiftFormModal } from "../modals/ShiftFormModal";
import type { Filter } from "../context/Filter";
import { Form, Row, Col, Button } from "react-bootstrap";
import { generateTimeOptions } from "../utils/utils";

interface FilterBarProps {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [localFilters, setLocalFilters] = useState<Filter>(filters);
  const [showModal, setShowModal] = useState(false);

  // useEffect to set localFilters when filters prop changes.
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const allTimes = generateTimeOptions();

  // Dynamic filtering logic:
  // - If startTime exists → only show end times after it
  // - If endTime exists → only show start times before it
  const filteredStartTimes = localFilters.endTime
    ? allTimes.filter((time) => time < (localFilters.endTime || '00:00'))
    : allTimes;

  const filteredEndTimes = localFilters.startTime
    ? allTimes.filter((time) => time > (localFilters.startTime || '23:45'))
    : allTimes;

  // Keep parent filters synced
  useEffect(() => {
    setFilters(localFilters);
  }, [localFilters, setFilters]);

  // Clear all filters
  const handleClear = () => {
    const cleared = { location: "", day: "", startTime: "", endTime: "" };
    setLocalFilters(cleared);
    setFilters(cleared);
  };

  return (
    <div className="p-3 mb-4 bg-white rounded-xl shadow-sm border">
      <Form>
        <Row className="align-items-end g-3">

          {/* Location */}
          <Col xs={12} sm={6} md={3}>
            <Form.Group controlId="filterLocation">
              <Form.Label>Location</Form.Label>
              <Form.Select
                value={localFilters.location || ""}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, location: e.target.value })
                }
              >
                <option value="">All Locations</option>
                <option value="GOTG">Guardians of the Galaxy: Cosmic Rewind</option>
                <option value="SSE">Spaceship Earth</option>
                <option value="MS">Mission: Space</option>
                <option value="TT">Test Track</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Day */}
          <Col xs={12} sm={6} md={3}>
            <Form.Group controlId="filterDay">
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="date"
                value={localFilters.day || ""}
                min={new Date().toISOString().split("T")[0]}
                max={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, day: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          {/* Start Time */}
          <Col xs={12} sm={6} md={3}>
            <Form.Group controlId="filterStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Select
                value={localFilters.startTime || ""}
                onChange={(e) => {
                  const newStart = e.target.value;
                  setLocalFilters((prev) => ({
                    ...prev,
                    startTime: newStart,
                    endTime:
                      prev.endTime && prev.endTime <= newStart
                        ? ""
                        : prev.endTime,
                  }));
                }}
              >
                <option value="">Select Start Time</option>
                {filteredStartTimes.map((time: string) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* End Time */}
          <Col xs={12} sm={6} md={3}>
            <Form.Group controlId="filterEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Select
                value={localFilters.endTime || ""}
                onChange={(e) => {
                  const newEnd = e.target.value;
                  setLocalFilters((prev) => ({
                    ...prev,
                    endTime: newEnd,
                    startTime:
                      prev.startTime && prev.startTime >= newEnd
                        ? ""
                        : prev.startTime,
                  }));
                }}
              >
                <option value="">Select End Time</option>
                {filteredEndTimes.map((time: string) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <Row className="mt-3">
          <Col xs="auto">
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="success" onClick={() => setShowModal(true)}>
              Not there? Post
            </Button>
          </Col>
        </Row>
      </Form>

      <ShiftFormModal isOpen={showModal} onClose={() => setShowModal(false)} filter={filters} />
    </div>
  );
}
