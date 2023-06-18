import { add as addTerminal } from "services/terminals";
import { getAll as getStations } from "services/stations";

// Chakra imports
import {
  Icon,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  CircularProgress,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdList } from "react-icons/md";
import Card from "components/card/Card";
import Form from "views/admin/terminals/components/Form";
import React, { useState, useEffect } from "react";
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
  const [type, setType] = useState("");
  const [availableTypes, setAvailableTypes] = useState(["IN", "OUT"]);
  const [station, setStation] = useState("");
  const [availableStations, setAvailableStations] = useState([]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleStationChange = (e) => {
    setStation(e.target.value);
  };

  const handleSubmitClick = (e) => {
    setSyncing(true);
    addTerminal({ type, station }).then((terminal) => {
      setType("");
      setStation("");
      setSyncing(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getStations()
      .then((stations) => {
        setAvailableStations(stations);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const isFormReady = type && station;

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
              Add New Terminal
            </Text>
            <Flex align="center" gap={2}>
              <NavLink to="/admin/terminals">
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
          {loading ? (
            <Flex justify="center" align="center">
              <CircularProgress isIndeterminate color="green.300" />
            </Flex>
          ) : (
            <Form
              formType="add"
              type={type}
              availableTypes={availableTypes}
              station={station}
              availableStations={availableStations}
              syncing={syncing}
              isFormReady={isFormReady}
              onTypeChange={handleTypeChange}
              onStationChange={handleStationChange}
              onSubmitClick={handleSubmitClick}
            />
          )}
        </Card>
      </GridItem>
    </Grid>
  );
};
