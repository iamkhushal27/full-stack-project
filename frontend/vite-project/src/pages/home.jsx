import { Avatar, Box, Divider, Flex, Paper, Stack, Text } from "@mantine/core";
import { GoFileZip } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import TodoChip from "../components/todochip";

function Home() {
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

            <Divider mt="sm" />
            <Box bd="1px solid #A1A3AB" bdrs="lg" mx="xl" w="88%">
              <Flex w="100%" justify="end" pr="sm">
                <HiDotsHorizontal />
              </Flex>
              <Box w="100%">
                <Stack w="100%" gap={4}>
                  <Flex gap={6} ml="sm">
                    <HiDotsHorizontal />
                    <Text size="xl" fw="bold">
                      Landing Page Design for travel days
                    </Text>
                  </Flex>
                  <Flex w="90%" ml="xl" justify="space-between" align="center">
                    <Text w="70%" fz="md">
                      there is only my and myself whihc was oe of the greatest
                      things which i ever seen
                    </Text>

                    <Avatar
                      bdrs="sm"
                      size="xl"
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
                    ></Avatar>
                  </Flex>
                  <Flex w="90%" ml="xl" justify="space-between" align="center">
                    <Flex justify="space-between" w="40%">
                      {" "}
                      <Text fz="md">hloda</Text>
                      <Text fz="md">hola</Text>
                    </Flex>
                    <Text fz="md">hloda</Text>
                  </Flex>
                </Stack>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Box
          h="95%"
          w="45%"
          m="sm"
          mr="xl"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          bdrs="md"
        >
          2
        </Box>
      </Flex>
    </>
  );
}
export default Home;
