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

function DeleteModal({
  opened,
  open,
  close,
  title,
  mutateFunction,
  selectedCategory,
  setData,
}) {
  console.log(selectedCategory);
  return (
    <>
      <Modal
        opened={opened}
        withCloseButton={false}
        size="md"
        styles={{
          body: {
            height: "10vh", // ✅ set height here
          },
        }}
        p={"xl"}
        title={title}
        centered
      >
        <Flex h="90%" direction="column" justify="space-between">
          <Text>Are you sure you want to delete this</Text>
          <Flex justify="space-between">
            <Button
              bg="#F24E1E"
              radius="6"
              w="48%"
              onClick={() => {
                if (selectedCategory.parentId) {
                  mutateFunction(selectedCategory, {
                    onSuccess: () => {
                      close();
                    },
                  });
                } else {
                  console.log(selectedCategory);
                  mutateFunction(selectedCategory.id, {
                    onSuccess: () => {
                      setData(null);
                      close();
                    },
                  });
                }
              }}
            >
              Delete
            </Button>
            <Button bg="#F24E1E" radius="6" w="48%" onClick={() => close()}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
export default DeleteModal;
