// src/components/ShiftList.tsx
import React from "react";
import { Shift } from "../context/Shift";
import { ShiftCard } from "./ShiftCard";

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
    console.log('Applying filters:', filters);
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
      <p className="text-center text-gray-500 mt-4">
        No shifts match your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {filteredShifts.map((shift) => (
        <ShiftCard shift={shift} />
      ))}
    </div>
  );
};
