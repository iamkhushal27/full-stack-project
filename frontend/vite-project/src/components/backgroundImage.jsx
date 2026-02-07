import { BackgroundImage, Center, Text, Box } from '@mantine/core';


function BackGroundImage(params) {
  return (
    <>
    <Box maw={300} mx="auto">
      <BackgroundImage
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
        radius="xs"
      >
        <Center p="md">
          <Text c="white">
            BackgroundImage component can be used to add any content on image. It is useful for hero
            headers and other similar sections
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
    </>

  );
}

export default BackGroundImage