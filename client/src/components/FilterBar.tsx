// src/components/FilterBar.tsx

export const FilterBar = ({ onChange }: { onChange: (f: any) => void }) => {
  return (
    <div className="flex gap-2 items-center p-2 bg-white rounded-md">
      <input placeholder="Search location or name" onChange={(e) => onChange({ query: e.target.value })} className="p-2 border rounded-md flex-1" />
      <select onChange={(e) => onChange({ status: e.target.value })} className="p-2 border rounded-md">
        <option value="">All</option>
        <option value="giveaway">Giveaway</option>
        <option value="trade">Trade</option>
        <option value="pickup">Pickup</option>
      </select>
    </div>
  );
};
