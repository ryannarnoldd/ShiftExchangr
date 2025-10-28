import { useState, useEffect } from "react";
import { ShiftFormModal } from "../modals/ShiftFormModal";
import type { Filter } from "../context/Filter";
import { Form, Row, Col, Button } from "react-bootstrap";

interface FilterBarProps {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [localFilters, setLocalFilters] = useState<Filter>(filters);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFilters(localFilters);
  }, [localFilters]);

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
                onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
              >
                <option value="">All Locations</option>
                <option value="GOTG">GOTG</option>
                <option value="SSE">SSE</option>
                <option value="MS">Mission Space</option>
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
                onChange={(e) => setLocalFilters({ ...localFilters, day: e.target.value })}
              />
            </Form.Group>
          </Col>

          {/* Start Time */}
          <Col xs={12} sm={6} md={3}>
            <Form.Group controlId="filterStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={localFilters.startTime || ""}
                onChange={(e) => setLocalFilters({ ...localFilters, startTime: e.target.value })}
              />
            </Form.Group>
          </Col>

          {/* End Time */}
          <Col xs={12} sm={6} md={3}>
            <Form.Group controlId="filterEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={localFilters.endTime || ""}
                onChange={(e) => setLocalFilters({ ...localFilters, endTime: e.target.value })}
              />
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

      <ShiftFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        filter={filters}
      />
    </div>
  );
}
