import { Table } from "@mantine/core";

const elements = [
  { position: 6, name: "Carbon" },
  { position: 7, name: "Nitrogen" },
  { position: 7, name: "Nitrogen" },
];

function MyTable({ h }) {
  const rows = elements.map((element, index) => (
    <Table.Tr key={element.name}>
      <Table.Td>{index + 1}</Table.Td> {/* 👈 Row number */}
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500} type="native">
      <Table
        h={h}
        verticalSpacing="xs"
        horizontalSpacing="xs"
        highlightOnHover
        withTableBorder
        withColumnBorders
        withRowBorders={false}
        bd="1px solid #A1A3AB"
        styles={{
          tbody: {
            overflowY: "scroll",
            border: " 1px solid #A1A3AB",
          },
          thead: {
            borderBottom: " 1px solid #A1A3AB",
          },
          th: {
            fontWeight: 600,
            textAlign: "center",
            borderRight: "1px solid #A1A3AB", // ✅ column divider in header
          },

          td: { textAlign: "center", borderRight: "1px solid #A1A3AB" },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th> {/* 👈 New column */}
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default MyTable;
