import {
  Box,
  Flex,
  TextInput,
  Title,
  Text,
  ThemeIcon,
  Avatar,
  NavLink,
} from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

import { useState } from "react";
import IconBox from "./components/iconBox";

function App() {
  const location = useLocation();
  const [active, setActive] = useState(0);
  const data = [
    { icon: IoIosNotifications, label: "Dashboard" },
    {
      icon: IoIosNotifications,
      label: "Security",
    },
    { icon: IoIosNotifications, label: "Activity" },
  ];
  const items = data.map((item, index) => (
    <NavLink
      href="#required-for-focus"
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      leftSection={<item.icon size={16} stroke={1.5} />}
      onClick={() => setActive(index)}
      w="80%"
      styles={{
        root: {
          backgroundColor: index === active ? "white" : "transparent",
          color: index === active ? "red" : "white",
          borderRadius: "8px",
          margin: "0% 10%",
        },
      }}
      variant="filled"
    />
  ));

  console.log(location);
  return (
    <Box h="100vh" bg="#F5F8FF">
      <Box h="10vh">
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
      <Flex h="90vh" gap="xl">
        <Box h="83vh" mt="7vh" w="20vw" bg="red" bdrs="sm">
          <Flex pos="relative" bottom={40} align="center" direction="column">
            <Avatar
              size="xl"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
            ></Avatar>
          </Flex>
          <Box>{items}</Box>
        </Box>
        <Box h="83vh" w="80vw" mt="7vh">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
