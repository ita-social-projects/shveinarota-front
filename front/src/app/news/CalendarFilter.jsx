import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { uk } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import "./CalendarFilter.css"

export default function CalendarFilter({ onDateChange }) {
  const [selected, setSelected] = useState();

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={(day) => {
        setSelected(day);
        onDateChange(day);
      }}
      locale={uk}
      className=""
    />
  );
}
