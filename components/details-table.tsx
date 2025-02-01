import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

export default function ProductDetails({
  details,
}: {
  details: { label: string; value: string }[];
}) {
  return (
    <Table
      hideHeader
      isStriped
      color="primary"
      defaultSelectedKeys={["2"]}
      selectionMode="single"
    >
      <TableHeader>
        <TableColumn>Key</TableColumn>
        <TableColumn>Value</TableColumn>
      </TableHeader>
      <TableBody>
        {details.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.label}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
