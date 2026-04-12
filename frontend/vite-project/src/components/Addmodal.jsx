import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  TextInput,
  Flex,
  Title,
  Text,
  Box,
} from "@mantine/core";

function AddModal({
  opened,
  open,
  close,
  title,
  inputName,
  inputLabel,
  form,
}) {
  return (
    <>
      <Modal
        opened={opened}
        withCloseButton={false}
        size="xl"
        styles={{
          body: {
            height: "80vh", // 👈 set height here

            padding: "80px",
          },
        }}
        centered
      >
        <Flex direction="column" h="100%" w="100%" justify="space-between">
          <Flex justify="space-between" align="center">
            <Title order={2}>{title}</Title>
            <Text
              td="underline"
              style={{ cursor: "pointer" }}
              onClick={() => {
                close();
              }}
              fw="inherit"
            >
              Go back
            </Text>
          </Flex>
          <Box h="90%" w="100%" bdrs="md" p="md" bd="1px solid #A1A3AB">
            <form
              onSubmit={form.onSubmit((values) => {
                console.log(values);
                close();
                form.reset();
              })}
            >
              <Flex gap="lg" direction="column">
                <TextInput
                  label={inputLabel}
                  w="80%"
                  {...form.getInputProps(inputName)}
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
                <Flex gap="sm">
                  <Button bg="#F24E1E" radius="6" w="25%" type="submit">
                    Create
                  </Button>
                  <Button
                    bg="#F24E1E"
                    radius="6"
                    w="25%"
                    onClick={() => {
                      close();
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Modal>
    </>
  );
}
export default AddModal;
