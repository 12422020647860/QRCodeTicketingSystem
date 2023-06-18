/* eslint-disable */
import {
  Flex,
  Table,
  Tbody,
  Tfoot,
  Td,
  Th,
  Thead,
  Tr,
  Button,
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
    pageOptions,
    gotoPage,
  } = tableInstance;
  initialState.pageSize = 8;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (
    <Table {...getTableProps()} variant="simple" color="gray.500">
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
      <Tfoot>
        <Tr>
          <Td colSpan={columns.length}>
            <Flex align="center" justify="center" gap={2}>
              {pageOptions.map((pageOption) => (
                <Button
                  align="center"
                  justifyContent="center"
                  bg={bgButton}
                  _hover={bgHover}
                  _focus={bgFocus}
                  _active={bgFocus}
                  w="37px"
                  h="37px"
                  lineHeight="100%"
                  borderRadius="10px"
                  onClick={(e) => gotoPage(pageOption)}
                  key={pageOption}
                >
                  {pageOption + 1}
                </Button>
              ))}
            </Flex>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  );
};
