import { add as addTicketType } from "services/ticketsTypes";

// Chakra imports
import {
  Icon,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdList } from "react-icons/md";
import Card from "components/card/Card";
import Form from "views/admin/ticketsTypes/components/Form";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

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
  const [syncing, setSyncing] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stations, setStations] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleStationsChange = (e) => {
    setStations(e.target.value);
  };

  const handleSubmitClick = (e) => {
    setSyncing(true);
    addTicketType({ name, price, stations }).then((ticketType) => {
      setName("");
      setPrice(0);
      setStations(0);
      setSyncing(false);
    });
  };

  const isFormReady = name && price !== "" && stations !== "";

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
              Add New Ticket Type
            </Text>
            <Flex align="center" gap={2}>
              <NavLink to="/admin/tickets-types">
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
                  <Icon as={MdList} color={iconColor} w="24px" h="24px" />
                </Button>
              </NavLink>
            </Flex>
          </Flex>
          <Form
            formType="add"
            name={name}
            price={price}
            stations={stations}
            syncing={syncing}
            isFormReady={isFormReady}
            onNameChange={handleNameChange}
            onPriceChange={handlePriceChange}
            onStationsChange={handleStationsChange}
            onSubmitClick={handleSubmitClick}
          />
        </Card>
      </GridItem>
    </Grid>
  );
};
