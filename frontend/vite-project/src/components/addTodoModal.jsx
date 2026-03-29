import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Text,
  Stack,
  TextInput,
  Box,
  Textarea,
  Flex,
  FileInput,
} from "@mantine/core";
import { Radio, Group } from "@mantine/core";
import img from "../assets/Group 53.png";
import { useForm, isNotEmpty } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { todoCreate } from "../service/todo.service";
import { useFileUpload } from "../service/file.service";

function AddTodoModal({ opened, close, open }) {
  const { mutate } = todoCreate();
  const [preview, setPreview] = useState(null);
  const { mutate: fileUpload } = useFileUpload();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      date: new Date(),
      priority: "low",
      description: "",
      uploadImage: null,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      date: isNotEmpty("Date is required"),
      priority: isNotEmpty("Priority is required"),
      description: isNotEmpty("Description is required"),
      uploadImage: isNotEmpty("Image is required"),
    },
  });
  return (
    <>
      <Modal
        size="70%"
        opened={opened}
        centered
        bg="#F9F9F9"
        withCloseButton={false}
        styles={{ content: { height: "75vh" }, body: { height: "90%" } }}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            console.log("inside");
            if (preview) {
              const formData = new FormData();
              formData.append("profile_image", values.uploadImage);
              fileUpload(formData, {
                onSuccess: (data) => {
                  mutate({
                    title: values.title,
                    date: values.date,
                    priority: values.priority,
                    description: values.description,
                    uploadImage: data.data.url, // ✅ cloudinary URL
                  });

                  close();
                  form.reset();
                  setPreview(null);
                },
              });
            }
          })}
        >
          <Stack gap="xl" h="100%" p="xl" w="100%">
            <Flex justify="space-between">
              <Text fw="bold">Add Task</Text>
              <Text
                td="underline"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  form.reset();
                  close();
                  setPreview(null);
                }}
                fw="inherit"
              >
                Go back
              </Text>
            </Flex>

            <Box
              bd="1px solid #A1A3AB"
              bg="#FFFFFF"
              p="lg"
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              w="100%"
              h="80%"
            >
              <Stack
                w="100%"
                h="100%"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TextInput
                  label="Title"
                  w="65%"
                  {...form.getInputProps("title")}
                  styles={{
                    input: {
                      border: "1px solid #A1A3AB",
                      padding: "10px",
                    },
                    label: {
                      marginBottom: "10px",
                    },
                  }}
                />
                <DateInput
                  label="Date"
                  w="65%"
                  maxDate={new Date()}
                  {...form.getInputProps("date")}
                  styles={{
                    input: {
                      border: "1px solid #A1A3AB",
                      padding: "10px",
                    },
                    label: {
                      marginBottom: "10px",
                    },
                  }}
                />
                <Text>Priority</Text>
                <Radio.Group {...form.getInputProps("priority")}>
                  <Group>
                    <Radio
                      radius="sm"
                      size="xs"
                      value="Extreme"
                      labelPosition="left"
                      color="red"
                      label={
                        <Flex align="center" gap={6}>
                          <Box
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: "red", // ✅ red dot
                            }}
                          />
                          <Text size="xs">Extreme</Text>
                        </Flex>
                      }
                      styles={{
                        radio: { cursor: "pointer" },
                        label: { cursor: "pointer", paddingLeft: 0 },
                      }}
                    />
                    <Radio
                      radius="sm"
                      size="xs"
                      value="Moderate"
                      labelPosition="left"
                      color="#3ABEFF"
                      label={
                        <Flex align="center" gap={6}>
                          <Box
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: "#3ABEFF", // ✅ blue dot
                            }}
                          />
                          <Text size="xs">Moderate</Text>
                        </Flex>
                      }
                      styles={{
                        radio: { cursor: "pointer" },
                        label: { cursor: "pointer", paddingLeft: 0 },
                      }}
                    />
                    <Radio
                      radius="sm"
                      size="xs"
                      value="low"
                      labelPosition="left"
                      color="#05A301"
                      label={
                        <Flex align="center" gap={6}>
                          <Box
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: "#05A301", // ✅ green dot
                            }}
                          />
                          <Text size="xs">Low</Text>
                        </Flex>
                      }
                      styles={{
                        radio: { cursor: "pointer" },
                        label: { cursor: "pointer", paddingLeft: 0 },
                      }}
                    />
                  </Group>
                </Radio.Group>

                <Text>Task descriobtion</Text>
                <Flex w="100%" style={{ flex: 1 }} gap="md" align="stretch">
                  <Textarea
                    style={{ flex: 2 }} // ✅ takes 2/3 of space (60%)
                    placeholder="Input placeholder"
                    {...form.getInputProps("description")}
                    styles={{
                      root: {
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      },
                      wrapper: {
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      },
                      input: {
                        flex: 1,
                        border: "1px solid #A1A3AB",
                        padding: "10px",
                        borderRadius: "6px",
                      },
                      label: { marginBottom: "10px" },
                    }}
                  />
                  <Box
                    style={{ flex: 1, cursor: "pointer", position: "relative" }}
                    bd="1px solid #A1A3AB"
                    bdrs={6}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    {preview ? (
                      // ✅ show preview when image selected
                      <img
                        src={preview}
                        alt="preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ) : (
                      <Flex
                        justify="center"
                        align="center"
                        h="100%"
                        direction="column"
                        gap="md"
                      >
                        <img
                          src={img}
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <Flex
                          direction="column"
                          justify="center"
                          align="center"
                          gap={4}
                        >
                          <Text c="#A1A3AB">Drag&Drop files here</Text>
                          <Text c="#A1A3AB">or</Text>
                          <FileInput
                            id="fileInput"
                            clearable
                            placeholder="Browse"
                            type="file"
                            accept="image/*"
                            onChange={(file) => {
                              form.setFieldValue("uploadImage", file); // ✅ update form
                              setPreview(
                                file ? URL.createObjectURL(file) : null
                              ); // ✅ set preview
                            }}
                            styles={{
                              input: { borderRadius: "6px" },
                            }}
                          />
                        </Flex>
                      </Flex>
                    )}
                  </Box>
                </Flex>
                <FileInput></FileInput>
              </Stack>
            </Box>
            <Group justify="start" ml="sm" mt="md">
              <Button bg="#F24E1E" radius="6" w="13%" type="submit">
                Done
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
export default AddTodoModal;
