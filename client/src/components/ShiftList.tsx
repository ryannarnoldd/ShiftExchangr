// src/components/ShiftList.tsx
import React from 'react';
import { Shift } from '../context/Shift';
import ShiftCard  from './ShiftCard';

type Props = {
  shifts: Shift[];
  onPickUp: (id: string) => void;
  onRequestTrade: (id: string) => void;
  onDelete: (id: string) => void;
};

export const ShiftList: React.FC<Props> = ({ shifts }) => {
  if (!shifts.length) return <p className="text-center text-gray-500">No shifts found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shifts.map((shift) => (
            <ShiftCard {...shift} />
        ))}
    </div>
  );
};
