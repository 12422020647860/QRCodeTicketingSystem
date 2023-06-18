import { getAll as getLines } from "services/lines";
import {
  getAll as getStations,
  get as getStation,
  update as updateStation,
} from "services/stations";

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
import Form from "views/admin/stations/components/Form";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

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

  let { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [name, setName] = useState("");
  const [lines, setLines] = useState([]);
  const [availableLines, setAvailableLines] = useState([]);
  const [stations, setStations] = useState([]);
  const [availableStations, setAvailableStations] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitClick = (e) => {
    setSyncing(true);
    updateStation(id, {
      name,
      lines: lines.map((line) => line.id),
      stations: stations.map((station) => station.id),
    }).then((station) => {
      setSyncing(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([getStation(id), getLines(), getStations()])
      .then(([station, lines, stations]) => {
        setName(station.name);
        setLines(
          station.lines.map((stationLine) =>
            lines.find((line) => line.id === stationLine.id)
          )
        );
        setStations(
          station.stations.map((stationStation) =>
            stations.find((station) => station.id === stationStation.id)
          )
        );
        setAvailableLines(lines);
        setAvailableStations(stations.filter((station) => station.id !== id));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addStationLine = (line) => {
    setLines((previousLines) => [...previousLines, line]);
  };

  const removeStationLine = (id) => {
    setLines((previousLines) =>
      previousLines.filter((previousLine) => previousLine.id !== id)
    );
  };

  const addStationStation = (station) => {
    setStations((previousStations) => [...previousStations, station]);
  };

  const removeStationStation = (id) => {
    setStations((previousStations) =>
      previousStations.filter((previousStation) => previousStation.id !== id)
    );
  };

  const isFormReady = name && lines.length;

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
              Edit Station
            </Text>
            <Flex align="center" gap={2}>
              <NavLink to="/admin/stations">
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
              formType="edit"
              name={name}
              lines={lines}
              availableLines={availableLines}
              stations={stations}
              availableStations={availableStations}
              syncing={syncing}
              isFormReady={isFormReady}
              addStationLine={addStationLine}
              removeStationLine={removeStationLine}
              addStationStation={addStationStation}
              removeStationStation={removeStationStation}
              onNameChange={handleNameChange}
              onSubmitClick={handleSubmitClick}
            />
          )}
        </Card>
      </GridItem>
    </Grid>
  );
};
