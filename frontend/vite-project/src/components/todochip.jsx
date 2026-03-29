import { Avatar, Box, Divider, Flex, Paper, Stack, Text } from "@mantine/core";
import { GoFileZip } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
function TodoChip() {
  return (
    <>
      {" "}
      <Box bd="1px solid #A1A3AB" bdrs="lg" mx="xl" w="88%">
        <Flex w="100%" justify="end" pr="sm">
          <HiDotsHorizontal />
        </Flex>
        <Box w="100%">
          <Stack w="100%" gap={2}>
            <Flex gap="md" ml="sm">
              <Box
                w="1vw"
                h="1vw"
                style={{
                  border: "2px solid black",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>

                
              <Text fz={16} fw="bold">
                Landing Page Design for travel days
              </Text>
            </Flex>
            <Flex w="90%" ml="xl" justify="space-between" align="center">
              <Text w="70%" fz={14}>
                Landing Page Design for travel daysLanding Page Design for
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
    </>
  );
}
export default TodoChip;
