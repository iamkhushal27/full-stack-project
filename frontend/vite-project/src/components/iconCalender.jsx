import { Box, ThemeIcon, Popover } from "@mantine/core";
import { useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import { useFilter } from "../store/filter";
import { DatePicker } from "@mantine/dates";
import { parseDateOnlyToLocalDate } from "../utils/date";

function IconCalender() {
  const [opened, setOpened] = useState(false);

  const setSelectedDate = useFilter((state) => state.setSelectedDate);
  const selectedDate = useFilter((state) => state.selectedDate);
  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <ThemeIcon size={38} bdrs="md" bg={"red"}>
          <IoMdCalendar
            size={30}
            style={{ cursor: "pointer" }}
            onClick={() => setOpened((o) => !o)} // ✅ toggle calendar
          />
        </ThemeIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <DatePicker
          value={parseDateOnlyToLocalDate(selectedDate)}
          onChange={(date) => {
            setSelectedDate(date);
            setOpened(false);
          }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}

export default IconCalender;
