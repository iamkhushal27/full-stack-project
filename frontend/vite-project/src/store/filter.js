import { create } from "zustand";
import { formatDateOnly } from "../utils/date";

export const useFilter = create((set) => ({
  selectedDate: formatDateOnly(),
  setSelectedDate: (date) =>
    set({
      selectedDate: formatDateOnly(date || new Date()),
    }),
}));
