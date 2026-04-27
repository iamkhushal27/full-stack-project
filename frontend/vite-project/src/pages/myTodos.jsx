import { Avatar, Box, Divider, Flex, Paper, Stack, Text } from "@mantine/core";
import { GoFileZip } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import TodoChip from "../components/todochip";
import { DonutChart } from "@mantine/charts";
import TodoShow from "../components/todoShow";
import { useFilter } from "../store/filter";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../service/todo.service";
import { useEffect, useState } from "react";

function MyTodos() {
  const selectedDate = useFilter((state) => state.selectedDate);
  if (selectedDate) {
  }
  const [data, setData] = useState(null);

  const { data: todoData } = useQuery({
    queryKey: ["todos", selectedDate ?? "all"],
    queryFn: () => getTodos(selectedDate),
    keepPreviousData: false,
  });
  useEffect(() => {
    setData(null);
  }, [selectedDate]);

  useEffect(() => {
    if (!data || !todoData?.data) return;

    const updated = todoData.data.find((item) => item.id === data.id);

    if (updated) {
      setData(updated); // ✅ replace old object with fresh one
    }
  }, [todoData]);

  return (
    <>
      <Flex h="95%" ml="xl" gap="lg">
        <Box
          h="100%"
          w="40%"
          shadow="xl"
          bdrs="md"
          bd="1px solid #A1A3AB"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Flex
            direction="column"
            gap="sm"
            w="100%"
            h="100%"
            py="lg"
            style={{ overflowY: "auto" }}
          >
            {todoData?.data?.map((data) => {
              return <TodoChip setData={setData} data={data} />;
            })}
          </Flex>
        </Box>
        <Box
          h="100%"
          w="55%"
          shadow="xl"
          bdrs="md"
          bd="1px solid #A1A3AB"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Flex
            direction="column"
            gap="sm"
            w="100%"
            h="100%"
            py="lg"
            style={{ overflowY: "auto" }}
          >
            <TodoShow setData={setData} data={data} />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
export default MyTodos;
