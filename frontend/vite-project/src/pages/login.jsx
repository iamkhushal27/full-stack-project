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

function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
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
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Flex gap="lg" direction="column">
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
                </Flex>

                <Group mt="md">
                  <Button type="submit" bg="#FF9090" radius="sm">
                    Login
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
export default Login;
