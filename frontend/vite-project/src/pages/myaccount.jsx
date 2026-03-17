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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { getUserData, userUpdate } from "../service/user.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFileUpload } from "../service/file.service";

function MyAccount() {
  const [imageFile, setImageFile] = useState("");
  const [preview, setPreview] = useState("");
  const [img, setImg] = useState("");
  const { mutate: uploadFile } = useFileUpload();
  const { mutate } = userUpdate();
  const queryClient = useQueryClient();

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

  useEffect(() => {
    console.log(data, "done");
    if (data?.data) {
      form.setValues({
        name: data?.data.name,
        email: data?.data.email,
        profile_image: data?.data.profile_image,
      });
      setImg(data?.data.profile_image);
    }
  }, [data?.data]);

  const handleFileChange = (file) => {
    // Mantine FileInput gives you file directly, not e.target.files[0]
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // ✅ instant preview
      form.setValues({
        profile_image: file,
      });
    }
  };
  function handleSubmit(values) {
    const originalData = data?.data;

    // ✅ only keep changed fields
    const changedFields = {};
    if (values.name !== originalData?.name) changedFields.name = values.name;
    if (values.email !== originalData?.email)
      changedFields.email = values.email;

    if (imageFile) {
      const formData = new FormData();
      formData.append("profile_image", imageFile);
      uploadFile(formData, {
        onSuccess: (response) => {
          mutate(
            {
              ...changedFields,
              profile_image: response.data.url,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["todos"] });
              },
            }
          );
        },
      });
    } else {
      mutate(
        { ...changedFields },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
          },
        }
      );
    }
  }

  return (
    <>
      <Flex h="95%" w="95%" ml="xl" gap="lg">
        <Box
          h="100%"
          w="95%"
          shadow="xl"
          bdrs="md"
          bd="1px solid #A1A3AB"
          style={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {" "}
          <Stack gap="md" h="100%" w="98%" m="md">
            <Flex justify="space-between">
              <Title order={4}>Account Information</Title>
              Go Back
            </Flex>
            <Flex align="center" gap="md">
              <Avatar size="120" src={img}></Avatar>
              <Stack gap={4}>
                <Title order={3}>Sundar Gurung</Title>
                <Text fz={15}>sundargurung360@gmail.com</Text>
              </Stack>
            </Flex>

            <Box
              h="65%"
              w="98%"
              p="lg"
              shadow="xl"
              bdrs="lg"
              bd="1px solid #A1A3AB"
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              {" "}
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack mt="xl" mx="lg" w="50%">
                  <TextInput
                    label="Name"
                    placeholder="Enter name"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                    styles={{
                      input: {
                        backgroundColor: "#F5F8FF",
                        border: "1px solid #A1A3AB",
                        borderRadius: "8px",
                      },
                      label: {
                        marginBottom: "10px",
                      },
                    }}
                  />
                  <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                    styles={{
                      input: {
                        backgroundColor: "#F5F8FF",
                        border: "1px solid #A1A3AB",
                        borderRadius: "8px",
                      },
                      label: {
                        marginBottom: "10px",
                      },
                    }}
                  />
                  {preview && <img src={preview} width={100} height={100} />}

                  <FileInput
                    clearable
                    label="Upload files"
                    placeholder="Upload files"
                    accept="image/*"
                    onChange={handleFileChange} // ✅ Mantine passes file directly
                    styles={{
                      input: {
                        backgroundColor: "#F5F8FF",
                        border: "1px solid #A1A3AB",
                        borderRadius: "8px",
                      },
                      label: {
                        marginBottom: "10px",
                      },
                    }}
                  />

                  <Flex gap={4} mt="lg">
                    <Button bg="#F24E1E" w="40%" radius="6" type="submit">
                      Save changes
                    </Button>
                    <Button bg="#F24E1E" w="20%" radius="6" type="submit">
                      Cancel
                    </Button>
                  </Flex>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}
export default MyAccount;
