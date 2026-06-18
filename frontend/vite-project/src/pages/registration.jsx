import {
  Button,
  Checkbox,
  Group,
  TextInput,
  Box,
  Flex,
  PasswordInput,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import img from "../assets/R 2.png";
import background from "../assets/background.png";
import { userRegister } from "../service/user.service";
import { registerSchema } from "../schemas/user.schema";
import { getJoiFormErrors } from "../utils/joiValidate";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

function Registration() {
  const [idempotencyKey] = useState(() => uuidv4());

  const {
    mutate: registerUser,
    isPending,
    isSuccess,
    isError,
  } = userRegister();

  const handleRegister = (data) => {
    console.log(data);
    registerUser(
      { ...data, idempotencyKey },
      {
        onError: (error) => {
          const errors = error.response?.data?.errors || [];
          if (errors.length > 0) {
            // ✅ validation errors from Zod
            errors.forEach((err) => {
              form.setFieldError(err.field, err.message);
            });
          } else {
            // ✅ conflict errors like "Email already exists"
            const message =
              error.response?.data?.message || "Something went wrong";
            if (message.toLowerCase().includes("email")) {
              form.setFieldError("email", message);
            } else if (
              message.toLowerCase().includes("username") ||
              message.toLowerCase().includes("name")
            ) {
              form.setFieldError("name", message);
            } else {
              form.setFieldError("email", message); // fallback
            }
          }
        },
      },
    );
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: (values) => {
      console.log(values);
      const errors = getJoiFormErrors(registerSchema, values);
      return errors;
    },
  });

  return (
    <Box
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#FF6767",
      }}
    >
      <Flex align="center" h="100vh" justify="center">
        <Paper h="80vh" w="80vw">
          <Flex justify="space-between">
            <Box
              h="80vh"
              w="30vw"
              style={{
                display: "flex",
                justifyContent: "center", // horizontal alignment (optional)
                alignItems: "flex-end", // vertical alignment → pushes image to the bottom
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "85%",
                  objectFit: "fill", // stretches image to fully fill the container
                }}
                src={img}
              ></img>
            </Box>

            <Flex
              justify="center"
              h="80vh"
              w="35vw"
              align="center"
              direction="column"
              gap="xl"
            >
              <form
                onSubmit={form.onSubmit((values) => handleRegister(values))}
              >
                <Flex gap="lg" direction="column">
                  <TextInput
                    withAsterisk
                    placeholder="Enter your name"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                    w="30vw"
                    styles={{
                      input: {
                        border: "1px solid #565454",
                        padding: "20px",
                      },
                    }}
                  />
                  <TextInput
                    withAsterisk
                    placeholder="your@email.com"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                    w="30vw"
                    styles={{
                      input: {
                        border: "1px solid #565454",
                        padding: "20px",
                      },
                    }}
                  />
                  <PasswordInput
                    withAsterisk
                    placeholder="Password"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                    w="30vw"
                    styles={{
                      input: {
                        border: "1px solid #565454",
                        padding: "20px",
                      },
                    }}
                  />
                  <PasswordInput
                    withAsterisk
                    placeholder="Confirm Password"
                    {...form.getInputProps("confirmPassword")}
                    w="30vw"
                    styles={{
                      input: {
                        border: "1px solid #565454",
                        padding: "20px",
                      },
                    }}
                  />
                </Flex>

                <Group mt="md">
                  <Button type="submit" bg="#FF9090" radius="sm">
                    Register
                  </Button>
                </Group>
              </form>
            </Flex>
          </Flex>
        </Paper>
      </Flex>
    </Box>
  );
}
export default Registration;
