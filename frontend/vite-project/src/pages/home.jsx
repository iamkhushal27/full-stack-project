import { Avatar, Box, Divider, Flex, Paper, Stack, Text } from "@mantine/core";
import { GoFileZip } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import TodoChip from "../components/todochip";
import { DonutChart } from "@mantine/charts";

function Dashboard() {
  const data = [
    { name: "USA", value: 400, color: "indigo.6" },
    { name: "India", value: 300, color: "yellow.6" },
    { name: "Japan", value: 100, color: "teal.6" },
    { name: "Other", value: 200, color: "gray.6" },
  ];
  return (
    <>
      <Flex h="95%" bd="0.5 solid #A1A3AB" gap="lg">
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
            <Text>Add task</Text>
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
            <TodoChip />
            <TodoChip />

            <Divider mt="sm" mb="xl" />
            <TodoChip />
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
            <Flex h="100%" w="100%" justify="space-evenly">
              <DonutChart
                h="80%"
                w="30%"
                miw="150"
                thickness={20}
                data={data}
                withTooltip={false}
              />
              <DonutChart
                h="80%"
                w="30%"
                miw="150"
                thickness={20}
                data={data}
                withTooltip={false}
              />
              <DonutChart
                h="80%"
                w="30%"
                miw="150"
                thickness={20}
                data={data}
                withTooltip={false}
              />
            </Flex>
          </Box>
          <Box
            h="65%"
            w="100%"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            bdrs="md"
            p="lg"
          >
            <Stack gap="md" h="100%" w="100%">
              <Text>Task comleted</Text>
              <TodoChip />
              <TodoChip />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
export default Dashboard;
