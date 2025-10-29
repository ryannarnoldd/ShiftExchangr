import React from "react";
import { Shift } from "../context/Shift";
import { ShiftCard } from "./ShiftCard";
import { Container, Row, Col } from "react-bootstrap";

type ShiftListProps = {
  shifts: Shift[];
  filters: {
    location?: string;
    day?: string;
    startTime?: string;
    endTime?: string;
  };
};

export const ShiftList: React.FC<ShiftListProps> = ({ shifts, filters }: ShiftListProps) => {
  console.log('Received shifts:', shifts);

  // ✅ Apply filters if provided
  const filteredShifts = shifts.filter((shift) => {
    const matchesLocation =
      !filters?.location ||
      shift.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesDay =
      !filters?.day ||
      shift.day.toLowerCase() === filters.day.toLowerCase();

    const matchesStart =
      !filters?.startTime || shift.startTime >= filters.startTime;

    const matchesEnd =
      !filters?.endTime || shift.endTime <= filters.endTime;

    return matchesLocation && matchesDay && matchesStart && matchesEnd;
  });

  if (!filteredShifts.length) {
    return (
      <p className="text-center text-muted mt-4">
        No shifts match your filters.
      </p>
    );
  }

  return (
    <Container fluid className="mt-3">
      <Row className="g-4">
        {filteredShifts.map((shift) => (
          <Col key={shift._id} xs={12} sm={6} lg={4}>
            <ShiftCard shift={shift} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
