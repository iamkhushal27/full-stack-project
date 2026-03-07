import { Box, Flex, TextInput, Title, Text, ThemeIcon } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import IconBox from "./components/iconBox";

function App() {
  const location = useLocation();
  console.log(location);
  return (
    <Box h="100vh">
      <Box h="8vh">
        <Flex justify="space-evenly" align="center" h="100%" bg="#FFFBFB">
          <Flex>
            <Title c="#FF6767">Dash</Title>
            <Title>Board</Title>
          </Flex>
          <TextInput
            radius="md"
            w="40%"
            rightSection={
              <ThemeIcon bdrs="md" size={36} bg="red">
                <GoSearch />
              </ThemeIcon>
            }
          ></TextInput>
          <Flex gap="xl" align="center">
            <Flex gap="sm" align="center">
              <IconBox
                size={38}
                MyIcon={IoIosNotifications}
                backgroundColor={"red"}
              />
              <IconBox
                size={38}
                MyIcon={FaCalendarAlt}
                backgroundColor={"red"}
              />
            </Flex>
            <Flex direction="column">
              <Text>tuesday</Text>
              <Text>17-4-26</Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <h2>{location.pathname}</h2>

      <Outlet />
    </Box>
  );
}

export default App;
