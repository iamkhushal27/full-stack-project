import {
  Avatar,
  Box,
  Divider,
  Flex,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { GoFileZip } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import IconBox from "./iconBox";
import { MdDelete } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import { useState } from "react";
import DeleteModal from "./deleteModal";
import { useDisclosure } from "@mantine/hooks";
import { deleteTodo } from "../service/todo.service";

function TodoShow({ data = null, setData = () => {} }) {
  const [editable, setEditable] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteMutate } = deleteTodo();

  function edit() {
    if (editable) {
      console.log(editable);
    } else {
      console.log("false", editable);
    }

    setEditable((value) => !value);
  }
  function deleteFunction(params) {
    setDeleteData(data);
    console.log(data);
    open();
  }

  return (
    <>
      <Flex h="100%" w="94%" ml="md" mr="md" gap="md" direction="column">
        {data ? (
          <>
            <Flex h="35%" w="100%" gap="md">
              <img
                height="100%"
                width="30%"
                src={data.task_image}
                alt=""
                style={{ borderRadius: "14px" }}
              />
              <Flex direction="column" gap="sm" justify="end" h="100%">
                <Title fz={16}> Submit Documents</Title>
                <Text fz={12}> Priority: {data?.priority.priority_name}</Text>
                <Text fz={12}> Status: {data?.status?.status_name}</Text>
                <Text c="#A1A3AB" fz={10}>
                  {" "}
                  Created on: {data.date}
                </Text>
              </Flex>
            </Flex>
            <Flex h="65%" w="100%" direction="column" justify="space-between">
              <Stack gap={4}>
                <Flex align="Start">
                  <Text fw="bold" fz={16} c="#747474">
                    {" "}
                    Task Title:
                  </Text>
                  <Text fz={16} c="#747474">
                    {" "}
                    {data.title}
                  </Text>
                </Flex>
                <Flex align="Start">
                  <Text fz={16} fw="bold" c="#747474">
                    {" "}
                    Completed:
                  </Text>
                  <Text fz={16} c="#747474">
                    {" "}
                    {data.completed ? "Yes" : "No"}
                  </Text>
                </Flex>

                <Box w="95%">
                  <Text span={true} fz={16} fw="bold" c="#747474">
                    Task Description:
                  </Text>
                  <Text span fz={16} c="#747474">
                    {" "}
                    {data.description}
                  </Text>
                </Box>
              </Stack>
              <Flex justify="end" gap="md">
                <IconBox
                  MyIcon={MdDelete}
                  myFunction={deleteFunction}
                  backgroundColor={"red"}
                  size={40}
                />
                <IconBox
                  MyIcon={RiEditBoxFill}
                  myFunction={edit}
                  backgroundColor={"red"}
                  size={40}
                />
              </Flex>
            </Flex>
          </>
        ) : (
          <>Todo is not selected</>
        )}
      </Flex>
      <DeleteModal
        opened={opened}
        open={open}
        close={close}
        mutateFunction={deleteMutate}
        selectedCategory={deleteData}
        title={"Delete Todo"}
        setData={setData}
      />
    </>
  );
}
export default TodoShow;
