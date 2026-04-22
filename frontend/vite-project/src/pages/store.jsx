import { Box } from "@mantine/core";
import { useAuth } from "../store/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../service/user.service";

function StoreMy(params) {
  const user = useAuth((state) => state.user);

  return (
    <>
      <Box>
        <h1>{user?.name} bears around here...</h1>
      </Box>
    </>
  );
}
export default StoreMy;
