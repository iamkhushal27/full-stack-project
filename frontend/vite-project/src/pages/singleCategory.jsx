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
import AddCategoryModal from "../components/addCategoryModal";
import { Link } from "react-router-dom";
import MyTable from "../components/table";

function SingleCategory() {
  const [imageFile, setImageFile] = useState("");
  const [preview, setPreview] = useState("");
  const [img, setImg] = useState("");
  const { mutate: uploadFile } = useFileUpload();
  const { mutate } = userUpdate();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const heading = [
    "circket",
    "work",
    "football",
    "show",
    "circket",
    "work",
    "football",
    "show",
    "circket",
    "work",
    "football",
    "show",
    "circket",
    "work",
    "football",
    "show",
    "circket",
    "work",
    "football",
    "show",
    "circket",
    "work",
    "football",
    "show",
  ];

  const { data, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getUserData,
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      profile_image: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

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
                    onClick={open}
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

                <MyTable h="80%" />
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
                    onClick={open}
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
                <MyTable h="80%" />
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
      <AddCategoryModal opened={opened} open={open} close={close} />
    </>
  );
}
export default SingleCategory;
