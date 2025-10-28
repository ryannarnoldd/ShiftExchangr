import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_SHIFTS } from "../utils/queries";
import FilterBar from "../components/FilterBar";
import type { Filter } from "../context/Filter";
import { ShiftList } from "../components/ShiftList";

export default function Home() {
  const { data, loading, error } = useQuery(ALL_SHIFTS);

  const [filters, setFilters] = useState<Filter>({
    location: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  if (loading) return <p>Loading shifts...</p>;
  if (error) return <p>Error loading shifts: {error.message}</p>;

  return (
    <section className="home">
      <FilterBar filters={filters} setFilters={setFilters} />
      <ShiftList shifts={data.all_shifts} filters={filters} />
    </section>
  );
}