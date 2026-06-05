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
import { useAuth } from "../store/auth";

function MyAccount() {
  const [imageFile, setImageFile] = useState("");
  const [preview, setPreview] = useState("");
  const [img, setImg] = useState("");
  const { mutate: uploadFile } = useFileUpload();
  const { mutate } = userUpdate();
  const queryClient = useQueryClient();
  const setUser = useAuth((state) => state.updateUser);

  const { data, refetch } = useQuery({
    queryKey: ["user"],
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

  // ✅ Sync form values once data loads
  useEffect(() => {
    if (data?.data) {
      form.setValues({
        name: data.data.name,
        email: data.data.email,
        profile_image: data.data.profile_image,
      });
      setPreview(data.data.profile_image);
    }
  }, [data]);

  const handleFileChange = (file) => {
    console.log(file);
    // Mantine FileInput gives you file directly, not e.target.files[0]
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // ✅ instant preview
      form.setValues({
        profile_image: file,
      });
    } else {
      setImageFile("");
      form.setValues({
        profile_image: "",
      });
    }
  };
  function handleSubmit(values) {
    const originalData = data?.data;
    console.log(originalData);

    // ✅ only keep changed fields
    const changedFields = {};
    if (values.name !== originalData?.name) changedFields.name = values.name;
    if (values.email !== originalData?.email)
      changedFields.email = values.email;

    if (imageFile) {
      const formData = new FormData();
      formData.append("images", imageFile);
      uploadFile(formData, {
        onSuccess: (response) => {
          mutate({
            ...changedFields,
            profile_image: response.data.url,
          });
          setUser({ profile_image: response.data.url });
        },
        onError: (err) => {
          console.log(err);
        },
      });
    } else {
      mutate(
        { ...changedFields },
        {
          onSuccess: (data) => {
            setUser(data.data);
          },
        },
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
              <Avatar size="120" src={data?.data.profile_image}></Avatar>
              <Stack gap={4}>
                <Title order={3}>{data?.data.name}</Title>
                <Text fz={15}>{data?.data?.email}</Text>
              </Stack>
            </Flex>

            <Box
              h="75%"
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
                <Stack mt="sm" mx="lg" w="50%">
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
                    {...form.getInputProps("profile_image")}
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

                  <Flex gap={4} mt="sm">
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
