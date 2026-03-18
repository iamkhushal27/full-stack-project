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

function AddTodoModal({ opened, close, open }) {
  return (
    <>
      <Modal
        size="70%"
        opened={opened}
        closeButtonProps={false}
        onClose={close}
        centered
        styles={{ content: { height: "80vh" }, body: { height: "90%" } }}
      >
        <Stack gap="xl" h="100%" p="xl" w="100%">
          <Text>Add new Task</Text>
          <Box bd="1px solid #A1A3AB" p="lg" w="100%" h="80%">
            <Stack
              w="100%"
              h="100%"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <TextInput
                label="Title"
                w="65%"
                styles={{
                  input: {
                    border: "1px solid #A1A3AB",
                    padding: "10px",
                  },
                  label: {
                    marginBottom: "10px",
                  },
                }}
              ></TextInput>
              <TextInput
                label="Date"
                w="65%"
                styles={{
                  input: {
                    border: "1px solid #A1A3AB",
                    padding: "10px",
                  },
                  label: {
                    marginBottom: "10px",
                  },
                }}
              ></TextInput>

              <Group>
                <Radio checked disabled label="React" value="react" />
                <Radio disabled label="Angular" value="nu" />
                <Radio disabled label="Svelte" value="sv" />
              </Group>
              <Text>Task descriobtion</Text>
              <Flex w="100%" style={{ flex: 1 }} gap="md" align="stretch">
                <Textarea
                  style={{ flex: 2 }} // ✅ takes 2/3 of space (60%)
                  placeholder="Input placeholder"
                  styles={{
                    root: { flex: 1, display: "flex", flexDirection: "column" },
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
                  style={{ flex: 1, cursor: "pointer" }}
                  bd="1px solid #A1A3AB"
                  bdrs={6}
                  styles={{
                    root: { flex: 1, display: "flex", flexDirection: "column" },
                  }}
                  onClick={() => document.getElementById("fileInput").click()} // ✅ trigger hidden input
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

                      {/* hidden input */}
                      <FileInput
                        id="fileInput"
                        clearable
                        placeholder="Browse" // ✅ replaces "Choose File"Ç
                        type="file"
                        accept="image/*"
                        styles={{
                          input: {
                            borderRadius: "6px",
                          },
                        }}
                      />
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Stack>
          </Box>
          <Text>3</Text>
        </Stack>
      </Modal>
    </>
  );
}
export default AddTodoModal;
