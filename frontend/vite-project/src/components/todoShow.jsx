import {
  Avatar,
  Box,
  Divider,
  Flex,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { GoFileZip } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import IconBox from "./iconBox";
import { MdDelete } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";

function TodoShow() {
  return (
    <>
      <Flex h="100%" w="94%" ml="md" mr="md" gap="md" direction="column">
        <Flex h="35%" w="100%" gap="md">
          <img
            height="100%"
            width="30%"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
            alt=""
            style={{ borderRadius: "14px" }}
          />
          <Flex direction="column" gap="sm" justify="end" h="100%">
            <Title fz={16}> Submit Documents</Title>
            <Text fz={12}> Priority: Extreme</Text>
            <Text fz={12}> Status: Not Started</Text>
            <Text c="#A1A3AB" fz={10}>
              {" "}
              Created on: 20/06/2023
            </Text>
          </Flex>
        </Flex>
        <Flex h="65%" w="100%" direction="column" justify="space-between">
          <Stack gap={4}>
            <Flex align="Start">
              <Text fw="bold" fz={16} c="#747474">
                {" "}
                Task Title:
              </Text>
              <Text fz={16} c="#747474">
                {" "}
                Document Submission.
              </Text>
            </Flex>
            <Flex align="Start">
              <Text fz={16} fw="bold" c="#747474">
                {" "}
                Objective:{" "}
              </Text>
              <Text fz={16} c="#747474">
                {" "}
                To submit required documents for something important
              </Text>
            </Flex>

            <Box w="95%">
              <Text span={true} fz={16} fw="bold" c="#747474">
                Task Description:
              </Text>
              <Text span fz={16} c="#747474">
                {" "}
                Review the list of documents required for submission and ensure
                all necessary documents are ready. Organize the documents
                accordingly and scan them if physical copies need to be
                submitted digitally. Rename the scanned files appropriately for
                easy identification and verify the accepted file formats. Upload
                the documents securely to the designated platform, double-check
                for accuracy, and obtain confirmation of successful submission.
                Follow up if necessary to ensure proper processing.
              </Text>
            </Box>
          </Stack>
          <Flex justify="end" gap="md">
            <IconBox MyIcon={MdDelete} backgroundColor={"red"} size={40} />
            <IconBox MyIcon={RiEditBoxFill} backgroundColor={"red"} size={40} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
export default TodoShow;
