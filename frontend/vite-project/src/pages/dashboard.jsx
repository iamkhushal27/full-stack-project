import { Avatar, Box, Divider, Flex, Paper, Stack, Text } from "@mantine/core";
import { GoFileZip } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import TodoChip from "../components/todochip";
import { DonutChart } from "@mantine/charts";
import TodoShow from "../components/todoShow";

function Settings() {
  const data = [
    { name: "USA", value: 400, color: "indigo.6" },
    { name: "India", value: 300, color: "yellow.6" },
    { name: "Japan", value: 100, color: "teal.6" },
    { name: "Other", value: 200, color: "gray.6" },
  ];
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
            <TodoChip />
            <TodoChip />
            <TodoChip />
            <TodoChip />
            <TodoChip />
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
            <TodoShow />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
export default Settings;
