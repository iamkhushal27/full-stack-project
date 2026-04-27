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
  Select,
} from "@mantine/core";
import { Radio, Group } from "@mantine/core";
import img from "../assets/Group 53.png";
import { useForm, isNotEmpty } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { todoCreate, updateTodo } from "../service/todo.service";
import { useFileUpload } from "../service/file.service";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../store/auth";
import { getCategories } from "../service/category.service";
import { getStatuses } from "../service/status.service";
import { getPriorities } from "../service/priority.service";

function TodoModal({ opened, close, open, isEdit = false, editData = null }) {
  const user = useAuth((state) => state.user);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { mutate: updateMutate } = updateTodo();
  const { mutate } = todoCreate();
  const [preview, setPreview] = useState(null);
  const { mutate: fileUpload } = useFileUpload();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["categories"], // include id in key
    queryFn: getCategories, // pass id to function
  });

  const { data: priorityData } = useQuery({
    queryKey: ["priorities", selectedCategoryId],
    queryFn: () => getPriorities(selectedCategoryId),
    enabled: !!selectedCategoryId, // only runs when category is selected
  });

  const { data: statusData } = useQuery({
    queryKey: ["statuses", selectedCategoryId], // ✅ id in key
    queryFn: () => getStatuses(selectedCategoryId), // ✅ id in function
    enabled: !!selectedCategoryId, // ✅ only runs when id exists
  });

  const form = useForm({
    initialValues: {
      title: "", // ✅ just empty defaults
      date: new Date(),
      category: null,
      priority: null,
      status: null,
      description: "",
      uploadImage: null,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      date: isNotEmpty("Date is required"),
      priority: isNotEmpty("Priority is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  // ✅ update form when editData changes
  useEffect(() => {
    if (editData?.id && isEdit) {
      // ✅ useEffect handles edit data
      form.setValues({
        title: editData.title,
        date: new Date(editData.date),
        category: String(editData.category_id),
        priority: String(editData.priority_id),
        status: String(editData.status_id),
        description: editData.description,
        uploadImage: editData.task_image,
      });
      setSelectedCategoryId(String(editData.category_id));
    } else {
      form.reset(); // ✅ clears form for add mode
    }
  }, [editData, isEdit]);

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
            if (isEdit) {
              const normalizedEditData = {
                title: editData.title,
                date: new Date(editData.date),
                category: String(editData.category_id),
                priority: String(editData.priority_id),
                status: String(editData.status_id),
                description: editData.description,
                uploadImage: editData.task_image,
              };

              const changedValues = Object.keys(values).reduce((acc, key) => {
                if (key === "date") return acc;

                if (values[key] !== normalizedEditData[key]) {
                  acc[key] = values[key];
                }

                return acc;
              }, {});

              if (Object.keys(changedValues).length === 0 && !preview) {
                close();
                return;
              }
              console.log(changedValues);
              // ✅ Map fields for backend
              let payload = {
                id: editData.id,
                ...changedValues,
                category_id: changedValues.category,
                priority_id: changedValues.priority,
                status_id: changedValues.status,
              };

              delete payload.category;
              delete payload.priority;
              delete payload.status;

              // ✅ IMAGE HANDLING
              if (preview) {
                const formData = new FormData();
                console.log("1");

                formData.append("images", values.uploadImage); // ✅ correct
                console.log("2");

                fileUpload(formData, {
                  onSuccess: (data) => {
                    updateMutate({
                      ...payload,
                      uploadImage: data.data.url, // ✅ correct key
                    });

                    close();
                    form.reset();
                    setPreview(null);
                  },
                });
              } else {
                // ❌ Remove uploadImage if it's just old URL
                delete payload.uploadImage;
                console.log(payload, "payload");

                updateMutate(payload, {
                  onSuccess: () => {
                    close();
                    form.reset();
                  },
                });
              }
            } else {
              if (preview) {
                const formData = new FormData();
                formData.append("images", values.uploadImage);
                fileUpload(formData, {
                  onSuccess: (data) => {
                    mutate({
                      title: values.title,
                      date: values.date,
                      category: values.category,
                      priority: values.priority,
                      status: values.status,
                      description: values.description,
                      uploadImage: data.data.url, // ✅ cloudinary URL
                    });

                    close();
                    form.reset();
                    setPreview(null);
                  },
                });
              }
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
                  disabled={isEdit ? true : false}
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
                <Select
                  label="Category"
                  placeholder={isLoading ? "Loading..." : "Pick category"}
                  disabled={isLoading}
                  {...form.getInputProps("category")}
                  data={
                    data?.data.map((category) => ({
                      value: String(category.id), // ✅ convert number to string
                      label: category.name,
                    })) || []
                  }
                  onChange={(value) => {
                    if (isEdit) {
                      form.setValues({ priority: null, status: null });
                    }
                    setSelectedCategoryId(value); // ✅ triggers priority/status fetch
                    form.setFieldValue("category", value); // ✅ saves to form
                  }}
                />

                {selectedCategoryId ? (
                  <Select
                    label="priority"
                    placeholder={isLoading ? "Loading..." : "Pick Priority"}
                    disabled={isLoading}
                    {...form.getInputProps("priority")}
                    data={
                      priorityData?.data?.map((priority) => ({
                        value: String(priority.id), // ✅ convert number to string
                        label: priority.priority_name,
                      })) || []
                    }
                  />
                ) : null}

                {selectedCategoryId ? (
                  <Select
                    label="Status"
                    placeholder={isLoading ? "Loading..." : "Pick Status"}
                    disabled={isLoading}
                    {...form.getInputProps("status")}
                    data={
                      statusData?.data?.map((status) => ({
                        value: String(status.id), // ✅ convert number to string
                        label: status.status_name,
                      })) || []
                    }
                  />
                ) : null}

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
                          {...form.getInputProps("uploadImage")}
                          onChange={(file) => {
                            console.log("inEdit");
                            form.setFieldValue("uploadImage", file); // ✅ update form
                            setPreview(file ? URL.createObjectURL(file) : null); // ✅ set preview
                          }}
                          styles={{
                            input: { borderRadius: "6px" },
                          }}
                        />
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
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
export default TodoModal;
