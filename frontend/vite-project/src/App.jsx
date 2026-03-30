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
import { Outlet, useLocation, Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

import { useState } from "react";
import IconBox from "./components/iconBox";

function App() {
  const location = useLocation();

  const data = [
    { icon: IoIosNotifications, label: "Dashboard", href: "/" },

    { icon: IoIosNotifications, label: "Settings", href: "/settings" },
    { icon: IoIosNotifications, label: "My Account", href: "/myaccount" },
    { icon: IoIosNotifications, label: "Categories", href: "/categories" },
  ];
  const items = data.map((item, index) => (
    <NavLink
      component={Link} // 👈 Use React Router's Link
      to={item.href}
      key={item.label}
      active={location.pathname === item.href}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      leftSection={<item.icon size={24} stroke={1.5} />}
      w="80%"
      styles={{
        root: {
          backgroundColor:
            location.pathname === item.href ? "white" : "transparent",
          color: location.pathname === item.href ? "#FF6767" : "white",
          borderRadius: "16px",
          margin: "5% 10%",
        },
        label: {
          fontSize: "16px",
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
        <Box
          h="83vh"
          mt="7vh"
          w="20vw"
          bg="#FF6767"
          bdrs=""
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Flex pos="relative" bottom={40} align="center" direction="column">
            <Avatar
              size="xl"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
            ></Avatar>
          </Flex>
          <Box> {items}</Box>
        </Box>
        <Box h="83vh" w="80vw" mt="7vh">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
