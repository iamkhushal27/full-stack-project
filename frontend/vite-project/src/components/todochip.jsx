import { Avatar, Box, Divider, Flex, Paper, Stack, Text } from "@mantine/core";
import { GoFileZip } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
function TodoChip({ data = {}, setData = () => {} }) {
  return (
    <>
      {" "}
      <Box
        bd="1px solid #A1A3AB"
        bdrs="lg"
        onClick={() => {
          console.log(data);
          setData(data);
        }}
        mx="xl"
        w="88%"
      >
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
                {data?.title}
              </Text>
            </Flex>
            <Flex w="90%" ml="xl" justify="space-between" align="center">
              <Text w="70%" fz={14}>
                {data?.description}
              </Text>

              <Avatar bdrs="sm" size="xl" src={data?.task_image}></Avatar>
            </Flex>
            <Flex w="90%" ml="xl" justify="space-between" align="center">
              <Flex justify="space-between" w="50%">
                <Flex gap={3}>
                  <Text fz="xs" c="blue">
                    Priority:
                  </Text>
                  <Text fz="xs">{data?.priority?.priority_name}</Text>
                </Flex>

                <Flex gap={3}>
                  <Text fz="xs" c="red">
                    Status:
                  </Text>
                  <Text fz="xs">{data?.status?.status_name}</Text>
                </Flex>
              </Flex>
              <Flex gap={3} c="#A1A3AB" align="center">
                <Text fz="xs">Created at:</Text>
                <Text fz="xs">{data?.date}</Text>
              </Flex>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
export default TodoChip;
