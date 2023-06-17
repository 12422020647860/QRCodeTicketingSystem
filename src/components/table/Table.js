/* eslint-disable */
import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default (props) => {
  const { columnsData, tableData, Row, drawCell } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
      <Thead>
        {headerGroups.map((headerGroup, index) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={index}
                borderColor={borderColor}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  {...((column) =>
                    column.Header === "OPTIONS"
                      ? { justify: "center" }
                      : { justify: "space-between" })(column)}
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                >
                  {column.render("Header")}
                </Flex>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {page.map((row, index) => {
          prepareRow(row);
          return <Row row={row} {...row.getRowProps()} key={index} />;
        })}
      </Tbody>
    </Table>
  );
};
