import React from "react";
import { Shift } from "../context/Shift";
import { ShiftCard } from "./ShiftCard";
import { Container, Row, Col } from "react-bootstrap";

type ShiftListProps = {
  shifts: Shift[];
  filters: {
    status?: string;
    location?: string;
    day?: string;
    startTime?: string;
    endTime?: string;
  };
};

export const ShiftList: React.FC<ShiftListProps> = ({ shifts, filters }) => {
  const filteredAndSorted = shifts
    // ✅ Filter all at once
    .filter(({ status, location, day, startTime, endTime }) =>
      (!filters.status || status.toLowerCase() === filters.status.toLowerCase()) &&
      (!filters.location || location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.day || day.toLowerCase() === filters.day.toLowerCase()) &&
      (!filters.startTime || startTime >= filters.startTime) &&
      (!filters.endTime || endTime <= filters.endTime)
    )
    // ✅ Sort by date then start time
    .sort((a, b) => {
      const dateDiff = new Date(a.day).getTime() - new Date(b.day).getTime();
      if (dateDiff !== 0) return dateDiff;
      return a.startTime.localeCompare(b.startTime);
    });

  if (filteredAndSorted.length === 0) {
    return <p className="text-center text-muted mt-4">No shifts match your filters.</p>;
  }

  return (
    <Container fluid className="mt-3">
      <Row className="g-4">
        {filteredAndSorted.map((shift) => (
          <Col key={shift._id} xs={12} sm={6} lg={4}>
            <ShiftCard shift={shift} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};