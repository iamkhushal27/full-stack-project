import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { GoFileZip } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import TodoChip from "../components/todochip";
import { DonutChart } from "@mantine/charts";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "../store/filter";
import { getTodos } from "../service/todo.service";
import TodoModal from "../components/todoModal";

function Dashboard() {
  const [opened, { open, close }] = useDisclosure(false);
  const selectedDate = useFilter((state) => state.selectedDate);

  const { data: todoData } = useQuery({
    queryKey: ["todos", selectedDate ?? "all"],
    queryFn: () => getTodos(selectedDate),
  });

  const data = [
    {
      name: "Completed",
      value: todoData?.data?.filter((data) => data.completed).length,
      color: "indigo.6",
    },
    {
      name: "Not Completed",
      value: todoData?.data?.filter((data) => !data.completed).length,
      color: "yellow.6",
    },
  ];
  return (
    <>
      <Flex
        mt="xl"
        h="94%"
        justify="center"
        align="center"
        w="95%"
        bd="1px solid #A1A3AB"
        gap="lg"
      >
        <Box
          h="95%"
          w="45%"
          ml="lg"
          shadow="xl"
          m="sm"
          bdrs="md"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Flex justify="space-between" m="md">
            <Text>TO-DO</Text>
            <Text onClick={open}>Add task</Text>
          </Flex>
          <Flex ml="md" gap="md">
            <Text>20 june</Text>
            <Text>. today</Text>
          </Flex>
          <Flex
            direction="column"
            gap="sm"
            w="100%"
            h="87%"
            py="lg"
            style={{ overflowY: "auto" }}
          >
            {todoData?.data?.filter(data => !data.completed).length === 0 ? (
              <Center>
                <Text>No pending tasks to show</Text>
              </Center>
            ) : (
              todoData?.data
                ?.filter(data => !data.completed)
                .map(data => <TodoChip key={data.id} data={data} />)
            )}
          </Flex>
        </Box>
        <Stack h="95%" w="45%" m="sm" mr="xl">
          <Box
            h="35%"
            w="100%"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            bdrs="md"
          >
            {" "}
            <Flex h="100%" w="100%" justify="space-evenly">{
              todoData?.data?.length > 0 ? (
                <DonutChart
                  h="70%"
                  w="40%"
                  miw="150"
                  thickness={20}
                  data={data}
                  withLabelsLine
                  labelsType="percent"
                />
              ) : (
                <Center>
                  <Text>No Task is created yet</Text>
                </Center>
              )}


            </Flex>
          </Box>
          <Box
            h="65%"
            w="100%"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            bdrs="md"
            p="lg"
          >

            <Stack style={{ overflowY: "auto" }} gap="md" h="100%" w="100%">
              {todoData?.data?.filter(data => data.completed).length === 0 ? (
                <Center>
                  <Text>No completed tasks to show</Text>
                </Center>
              ) : (
                todoData?.data
                  ?.filter(data => data.completed)
                  .map(data => <TodoChip key={data.id} data={data} />)
              )}
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <TodoModal opened={opened} close={close} open={open} />
    </>
  );
}
export default Dashboard;
