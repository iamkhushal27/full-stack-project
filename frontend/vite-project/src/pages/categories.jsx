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
  Menu,
  Center,
} from "@mantine/core";
import { HiDotsHorizontal } from "react-icons/hi";
import { useForm } from "@mantine/form";
import { getUserData, userUpdate } from "../service/user.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFileUpload } from "../service/file.service";
import { useDisclosure } from "@mantine/hooks";
import Addmodal from "../components/Addmodal";
import { Link } from "react-router-dom";
import {
  categoryCreate,
  deleteCategory,
  EditCategroy,
  getCategories,
} from "../service/category.service";
import DeleteModal from "../components/deleteModal";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";
import { getJoiFormErrors } from "../utils/joiValidate";

function Category() {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const { mutate: categoryMutate } = categoryCreate();
  const { mutate: editCategoryMutate } = EditCategroy();
  const { mutate: deleteCategoryMutate } = deleteCategory();

  const categoryForm = useForm({
    initialValues: {
      name: "",
    },
    validate: (values) => {
      const schema = selectedCategory?.id
        ? updateCategorySchema
        : createCategorySchema;
      return getJoiFormErrors(schema, values);
    },
  });

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // ✅ cache for 5 minutes, no refetch on re-render
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
          <Flex m="lg" direction="column" gap="sm">
            <Flex justify="end">
              <Button
                w="15%"
                bg="#F24E1E"
                radius="6"
                onClick={() => {
                  setSelectedCategory(null);
                  categoryForm.reset();
                  open();
                }}
              >
                Add Category
              </Button>
            </Flex>
            <Grid>

              {categoryData?.data?.length === 0 ? <Center><Text>No category is created yet</Text></Center> : categoryData?.data?.map((data) => {
                return (
                  <Grid.Col span={4}>
                    <Card shadow="lg" padding="lg">
                      <Flex justify="end">
                        {" "}
                        <Menu>
                          <Menu.Target>
                            <HiDotsHorizontal />
                          </Menu.Target>

                          <Menu.Dropdown>
                            <Menu.Item
                              onClick={() => {
                                console.log(data)
                                setSelectedCategory(data);
                                categoryForm.setValues({ name: data.name }); // ✅ pre-fills the form
                                open(); // ✅ opens the modal
                              }}
                            >
                              Edit
                            </Menu.Item>
                            <Menu.Item
                              color="red"
                              onClick={() => {
                                setSelectedCategory(data);
                                deleteModalOpen(); // ✅ opens the modal
                              }}
                            >
                              Delete
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Flex>
                      <Card.Section p="lg">
                        <Flex justify="center">
                          <Title>{data.name}</Title>
                        </Flex>
                      </Card.Section>

                      <Button
                        bg="#F24E1E"
                        radius="6"
                        component={Link}
                        to={`/categories/${data.id}`}
                      >
                        Explore about {data.name} category
                      </Button>
                    </Card>{" "}
                  </Grid.Col>
                );
              })}
            </Grid>
          </Flex>
        </Box>
      </Box>

      <Addmodal
        opened={opened}
        open={open}
        close={close}
        inputLabel={"Name"}
        form={categoryForm}
        selectedCategory={selectedCategory}
        mutateFunction={selectedCategory ? editCategoryMutate : categoryMutate}
        inputName={"name"}
      />

      <DeleteModal
        opened={deleteModalOpened}
        open={deleteModalOpen}
        close={deleteModalClose}
        mutateFunction={deleteCategoryMutate}
        selectedCategory={selectedCategory}
        title={"Delete Categroy"}
      />
    </>
  );
}
export default Category;
