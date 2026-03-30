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
} from "@mantine/core";
import { HiDotsHorizontal } from "react-icons/hi";
import { useForm } from "@mantine/form";
import { getUserData, userUpdate } from "../service/user.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFileUpload } from "../service/file.service";

function Category() {
  const [imageFile, setImageFile] = useState("");
  const [preview, setPreview] = useState("");
  const [img, setImg] = useState("");
  const { mutate: uploadFile } = useFileUpload();
  const { mutate } = userUpdate();
  const queryClient = useQueryClient();
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
          <Flex m="lg">
            <Grid>
              {heading.map((data) => {
                return (
                  <Grid.Col span={4}>
                    <Card shadow="lg" padding="xl">
                      <Card.Section p="lg">
                        <Flex justify="center">
                          <Title>{data}</Title>
                        </Flex>
                      </Card.Section>

                      <Button bg="#F24E1E" radius="6">
                        Explore about {data} category
                      </Button>
                    </Card>{" "}
                  </Grid.Col>
                );
              })}
            </Grid>{" "}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
export default Category;
