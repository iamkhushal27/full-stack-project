import { Box, ThemeIcon } from "@mantine/core";

function IconBox({ backgroundColor, MyIcon, size }) {
  const Icon = MyIcon; // ✅ reassign to guarantee capital letter
  return (
    <ThemeIcon bdrs="md" size={size} bg={backgroundColor}>
      <Icon style={{ width: "70%", height: "70%" }} />
    </ThemeIcon>
  );
}

export default IconBox;
