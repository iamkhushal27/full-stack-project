import { FaPlus } from "react-icons/fa6";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FileInput,
  Flex,
  Group,
  NavLink,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Card,
  Image,
  Grid,
  ScrollArea,
} from "@mantine/core";
import { HiDotsHorizontal } from "react-icons/hi";
import { useForm } from "@mantine/form";
import { getUserData, userUpdate } from "../service/user.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFileUpload } from "../service/file.service";
import { useDisclosure } from "@mantine/hooks";
import FormModal from "../components/addModal";
import { Link } from "react-router-dom";
import MyTable from "../components/table";
import { ActionIcon } from "@mantine/core";
import DeleteModal from "../components/deleteModal";
import {
  deletePriority,
  editPriority,
  getPriorities,
  priorityCreate,
} from "../service/priority.service";
import {
  deleteStatus,
  editStatus,
  getStatuses,
  statusCreate,
} from "../service/status.service";
import { useParams } from "react-router-dom";

function SingleCategory() {
  const { id } = useParams(); // ✅ gets the id from the URL

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteModalType, setDeleteModalType] = useState("");
  const [statusOpened, { open: statusOpen, close: statusClose }] =
    useDisclosure(false);
  const [priorityOpened, { open: priorityOpen, close: priorityClose }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const { mutate: statusMutate } = statusCreate();
  const { mutate: priorityMutate } = priorityCreate();
  const { mutate: editPriorityMutate } = editPriority();
  const { mutate: editStatusMutate } = editStatus();
  const { mutate: deletePriorityMutate } = deletePriority();
  const { mutate: deleteStatusMutate } = deleteStatus();

  const { data: priorityData } = useQuery({
    queryKey: ["priorities", id], // ✅ id in key
    queryFn: () => getPriorities(id), // ✅ id in function
    enabled: !!id, // ✅ only runs when id exists
  });

  const { data: statusData } = useQuery({
    queryKey: ["statuses", id], // ✅ id in key
    queryFn: () => getStatuses(id), // ✅ id in function
    enabled: !!id, // ✅ only runs when id exists
  });
  console.log(priorityData);
  console.log(statusData);

  const statusForm = useForm({
    initialValues: {
      statusName: "",
    },
  });
  const priorityForm = useForm({
    initialValues: {
      priorityName: "",
    },
  });

  const priorityColumns = [
    { key: "priority_name", label: "Priority Name", width: "55%" },
    {
      key: "actions",
      label: "Actions",
      width: "40%", // 👈 just add this one line
      render: (row) => (
        <Group justify="center" gap="xl">
          <Button
            w="22%"
            onClick={() => {
              priorityOpen();
              priorityForm.setValues({ priorityName: row.priority_name });
              setSelectedCategory({ id: row.id, parentId: row.category_id });
            }}
            bg="#F24E1E"
            radius="6"
          >
            Edit
          </Button>
          <Button
            bg="#F24E1E"
            radius="6"
            w="22%"
            onClick={() => {
              setDeleteModalType("priority");
              deleteModalOpen(); // ✅ one open
              setSelectedCategory({ id: row.id, parentId: row.category_id });
            }}
          >
            Delete
          </Button>
        </Group>
      ),
    },
  ];
  const statusColumns = [
    { key: "status_name", label: "Status Name", width: "55%" },
    {
      key: "actions",
      label: "Actions",
      width: "40%", // 👈 just add this one line
      render: (row) => (
        <Group justify="center" gap="xl">
          <Button
            w="22%"
            onClick={() => {
              console.log(row);
              statusOpen();
              statusForm.setValues({ statusName: row.status_name });
              setSelectedCategory({ id: row.id, parentId: row.category_id });
            }}
            bg="#F24E1E"
            radius="6"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setDeleteModalType("status");
              deleteModalOpen(); // ✅ same open
              setSelectedCategory({ id: row.id, parentId: row.category_id });
            }}
            bg="#F24E1E"
            radius="6"
            w="22%"
          >
            Delete
          </Button>
        </Group>
      ),
    },
  ];

  return (
    <>
      <Box h="95%" w="95%" ml="xl" gap="lg">
        <Box
          h="100%"
          w="95%"
          shadow="xl"
          bdrs="md"
          bd="1px solid #A1A3AB"
          style={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflowY: "auto",
          }}
        >
          <Box m="lg" h="93%" ju direction="column" gap="sm">
            <Box h="48%">
              <Flex gap={4} direction="column" h="100%">
                <Flex justify="space-between" align="center">
                  <Title order={2}>Task Categories</Title>
                  <Text
                    td="underline"
                    style={{ cursor: "pointer" }}
                    onClick={() => {}}
                    fw="inherit"
                  >
                    Go back
                  </Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text size="lg" fw="bold">
                    Task Status
                  </Text>
                  <Button
                    bg="transparent"
                    c="#A1A3AB"
                    p={0}
                    onClick={() => {
                      statusOpen();
                      setSelectedCategory({ parentId: id });
                    }}
                    leftSection={
                      <FaPlus
                        style={{
                          color: "#F24E1E",
                        }}
                      />
                    }
                  >
                    {" "}
                    Add Task Status
                  </Button>
                </Flex>

                <MyTable
                  data={statusData?.data}
                  columns={statusColumns}
                  h={300}
                />
              </Flex>
            </Box>
            <Divider my="sm" />

            <Box h="45%">
              <Flex gap="sm" direction="column" h="100%">
                <Flex justify="space-between" align="center">
                  <Text size="lg" fw="bold">
                    Task Priority
                  </Text>
                  <Button
                    bg="transparent"
                    c="#A1A3AB"
                    p={0}
                    onClick={() => {
                      priorityOpen();
                      setSelectedCategory({ parentId: id });
                    }}
                    leftSection={
                      <FaPlus
                        style={{
                          color: "#F24E1E",
                        }}
                      />
                    }
                  >
                    {" "}
                    Add Task Priority
                  </Button>
                </Flex>
                <MyTable
                  data={priorityData?.data}
                  columns={priorityColumns}
                  h={300}
                />
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
      <FormModal
        opened={statusOpened}
        open={statusOpen}
        close={statusClose}
        inputLabel={"Status"}
        form={statusForm}
        mutateFunction={selectedCategory?.id ? editStatusMutate : statusMutate}
        inputName={"statusName"}
        selectedCategory={selectedCategory}
      />
      <FormModal
        opened={priorityOpened}
        open={priorityOpen}
        close={priorityClose}
        inputLabel={"Priority"}
        form={priorityForm}
        mutateFunction={
          selectedCategory?.id ? editPriorityMutate : priorityMutate
        }
        inputName={"priorityName"}
        selectedCategory={selectedCategory}
      />
      <DeleteModal
        opened={deleteModalOpened}
        close={deleteModalClose}
        mutateFunction={
          deleteModalType === "priority"
            ? deletePriorityMutate
            : deleteStatusMutate
        }
        selectedCategory={selectedCategory}
        title={
          deleteModalType === "priority" ? "Delete Priority" : "Delete Status"
        }
      />
    </>
  );
}
export default SingleCategory;
