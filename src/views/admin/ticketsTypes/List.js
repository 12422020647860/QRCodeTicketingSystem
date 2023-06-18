import {
  getAll as getTicketsTypes,
  remove as removeTicketType,
} from "services/ticketsTypes";

// Chakra imports
import {
  Link,
  Icon,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  Td,
  Tr,
  CircularProgress,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  MdAdd,
  MdOutlineEditNote,
  MdOutlineDeleteForever,
} from "react-icons/md";
import Card from "components/card/Card";
import Table from "components/table/Table";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Row = (setTicketsTypes) => {
  const TableRow = ({ row, ...props }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
      <Tr {...props}>
        {row.cells.map((cell, index) => {
          return (
            <Td
              {...cell.getCellProps()}
              key={index}
              fontSize={{ sm: "14px" }}
              borderColor="transparent"
              {...((cell) =>
                cell.column.Header === "OPTIONS" ? {} : { width: "100%" })(
                cell
              )}
            >
              {((row, cell) => {
                let data = "";
                if (cell.column.Header === "NAME") {
                  data = (
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {cell.value}
                    </Text>
                  );
                } else if (cell.column.Header === "PRICE") {
                  data = (
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {cell.value}
                    </Text>
                  );
                } else if (cell.column.Header === "STATIONS") {
                  data = (
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {cell.value}
                    </Text>
                  );
                } else if (cell.column.Header === "OPTIONS") {
                  data = (
                    <Flex
                      align="center"
                      gap={2}
                      justifyContent="center"
                      alignContent="center"
                    >
                      <NavLink to={`/admin/tickets-types/${row.original.id}`}>
                        <Icon as={MdOutlineEditNote} w="18px" h="18px" />
                      </NavLink>
                      <Link
                        onClick={(e) => {
                          removeTicketType(row.original.id);
                          setTicketsTypes((previousTicketsTypes) =>
                            previousTicketsTypes.filter(
                              (previousTicketType) =>
                                previousTicketType.id !== row.original.id
                            )
                          );
                        }}
                      >
                        <Icon as={MdOutlineDeleteForever} w="18px" h="18px" />
                      </Link>
                    </Flex>
                  );
                }
                return data;
              })(row, cell)}
            </Td>
          );
        })}
      </Tr>
    );
  };
  return TableRow;
};

export default () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [loading, setLoading] = useState(false);
  const [ticketsTypes, setTicketsTypes] = useState([]);

  useEffect(() => {
    setLoading(true);
    getTicketsTypes()
      .then((ticketsTypes) => {
        setTicketsTypes(ticketsTypes);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Grid mb="20px" templateColumns={{ sm: 1, md: "1fr 50% 1fr" }}>
      <GridItem colStart={2}>
        <Card
          direction="column"
          w="100%"
          px="0px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Tickets Types Table
            </Text>
            <Flex align="center" gap={2}>
              <NavLink to="/admin/tickets-types/add">
                <Button
                  align="center"
                  justifyContent="center"
                  bg={bgButton}
                  _hover={bgHover}
                  _focus={bgFocus}
                  _active={bgFocus}
                  w="37px"
                  h="37px"
                  onClick={() => {}}
                  lineHeight="100%"
                  borderRadius="10px"
                >
                  <Icon as={MdAdd} color={iconColor} w="24px" h="24px" />
                </Button>
              </NavLink>
            </Flex>
          </Flex>
          {loading ? (
            <Flex justify="center" align="center">
              <CircularProgress isIndeterminate color="green.300" />
            </Flex>
          ) : (
            <Table
              columnsData={[
                {
                  Header: "NAME",
                  accessor: "name",
                },
                {
                  Header: "PRICE",
                  accessor: "price",
                },
                {
                  Header: "STATIONS",
                  accessor: "stations",
                },
                {
                  Header: "OPTIONS",
                  accessor: "options",
                },
              ]}
              tableData={ticketsTypes}
              Row={Row(setTicketsTypes)}
            />
          )}
        </Card>
      </GridItem>
    </Grid>
  );
};
