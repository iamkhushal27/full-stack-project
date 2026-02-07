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
    <Box h="100vh" w="100wh" bg="#6741d9">
      
      <Flex justify="center" h="100%" align="center" direction="column" gap="xl"> 
      <Title order={1} c="white">Welcome to the website</Title>
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
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
        </Paper>
      </Flex>
    </Box>
  );
}
export default Login;
