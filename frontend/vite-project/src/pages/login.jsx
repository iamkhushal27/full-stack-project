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
      Name: "",
      email: "",
      password: "",
      termsOfService: false,
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
              h="100%"
              align="center"
              direction="column"
              gap="xl"
            >
              <Title order={1} c="white">
                Welcome to the website
              </Title>
              <Paper p="xl">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Enter your name"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                  />
                  <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    withAsterisk
                    label="Passwrod"
                    placeholder="Password"
                    key={form.key("password")}
                    {...form.getInputProps("passsword")}
                  />

                  <Checkbox
                    mt="md"
                    label="I agree to sell my privacy"
                    key={form.key("termsOfService")}
                    {...form.getInputProps("termsOfService", {
                      type: "checkbox",
                    })}
                  />

                  <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                  </Group>
                </form>
              </Paper>
            </Flex>
          </Flex>
        </Paper>
      </Flex>
    </Box>
  );
}
export default Login;
