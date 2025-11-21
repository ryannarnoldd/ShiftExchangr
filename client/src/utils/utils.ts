export const generateTimeOptions = () => {
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

export const formatTime = (time: string): string => {
  const is24Hour = localStorage.getItem("timeFormat") !== "12";

  if (is24Hour) return time;

  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export const locationNames : { [key: string]: string } = {
  "GOTG": "Guardians of the Galaxy",
  "SSE": "Spaceship Earth",
  "MS": "Mission: Space",
  "TT": "Test Track"
};