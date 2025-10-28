import { useState, useEffect } from "react";
import { ShiftFormModal } from "../modals/ShiftFormModal";
import type { Filter } from "../context/Filter";

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
    <div className="flex flex-wrap gap-3 items-end bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      {/* Location */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Location</label>
        <select
          value={localFilters.location || ""}
          onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Locations</option>
          <option value="GOTG">GOTG</option>
          <option value="SSE">SSE</option>
          <option value="MS">Mission Space</option>
          <option value="TT">Test Track</option>
        </select>
      </div>

      {/* Day */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Day</label>
        <input
          type="date"
          value={localFilters.day || ""}
          onChange={(e) => setLocalFilters({ ...localFilters, day: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Start Time */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Start Time</label>
        <input
          type="time"
          value={localFilters.startTime || ""}
          onChange={(e) => setLocalFilters({ ...localFilters, startTime: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* End Time */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">End Time</label>
        <input
          type="time"
          value={localFilters.endTime || ""}
          onChange={(e) => setLocalFilters({ ...localFilters, endTime: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-1">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
        >
          Clear
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
        >
          Not there? Post
        </button>
      </div>

      <ShiftFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={() => {}}
      />
    </div>
  );
}
