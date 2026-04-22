import { Table } from "@mantine/core";

function MyTable({ data = [], columns, labels = {}, h }) {
  if (!data.length) return <p>No data</p>;

  const rows = data.map((row, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        {columns.map((col) => {
          return (
            <Table.Td key={col.key} width={col.width}>
              {col.render ? col.render(row) : row[col.key] ?? "—"}
            </Table.Td>
          );
        })}
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={500} type="native">
      <Table
        verticalSpacing="xs"
        horizontalSpacing="xs"
        highlightOnHover
        withTableBorder
        withColumnBorders
        layout=""
        withRowBorders={false}
        bd="1px solid #A1A3AB"
        styles={{
          
          thead: { borderBottom: "1px solid #A1A3AB" },
          th: {
            fontWeight: 600,
            textAlign: "center",
            borderRight: "1px solid #A1A3AB",
          },
          td: { textAlign: "center", borderRight: "1px solid #A1A3AB" },
        }}
      
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th w="5%">#</Table.Th>
            {columns.map((col) => (
              <Table.Th key={col.key} style={{ width: col.width }}>
                {col.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default MyTable;
