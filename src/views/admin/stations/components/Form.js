// Chakra imports
import {
  Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Flex,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default ({
  formType,
  name,
  lines,
  addStationLine,
  removeStationLine,
  availableLines,
  stations,
  addStationStation,
  removeStationStation,
  availableStations,
  isFormReady,
  syncing,
  onNameChange,
  onSubmitClick,
}) => {
  const handleNameChange = (e) => {
    onNameChange(e);
  };
  const handleSubmitClick = (e) => {
    onSubmitClick(e);
  };
  const handleAvailableLinesChange = (e) => {
    addStationLine(
      availableLines.find(
        (availableLine) => availableLine.id === e.target.value
      )
    );
  };
  const handleLineDeleteClick = (id) => (e) => {
    removeStationLine(id);
  };
  const handleAvailableStationsChange = (e) => {
    addStationStation(
      availableStations.find(
        (availableStation) => availableStation.id === e.target.value
      )
    );
  };
  const handleStationDeleteClick = (id) => (e) => {
    removeStationStation(id);
  };
  return (
    <Grid px="25px" gap={4}>
      <GridItem>
        <FormControl>
          <FormLabel>Station Name</FormLabel>
          <Input type="text" onChange={handleNameChange} value={name} />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl>
          <FormLabel>Section Lines</FormLabel>
          <Flex direction="column" gap={2}>
            {lines.map((line) => (
              <Flex key={line.id} gap={2} alignItems="center">
                <Input type="text" value={line.name} disabled />
                <Icon
                  as={MdOutlineDeleteForever}
                  w="18px"
                  h="18px"
                  onClick={handleLineDeleteClick(line.id)}
                />
              </Flex>
            ))}
            <Select
              placeholder="Select Line"
              onChange={handleAvailableLinesChange}
            >
              {availableLines
                .filter(
                  (availableLine) =>
                    lines.map((line) => line.id).indexOf(availableLine.id) ===
                    -1
                )
                .map((availableLine) => (
                  <option key={availableLine.id} value={availableLine.id}>
                    {availableLine.name}
                  </option>
                ))}
            </Select>
          </Flex>
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl>
          <FormLabel>Sections</FormLabel>
          <Flex direction="column" gap={2}>
            {stations.map((station) => (
              <Flex key={station.id} gap={2} alignItems="center">
                <Input type="text" value={station.name} disabled />
                <Icon
                  as={MdOutlineDeleteForever}
                  w="18px"
                  h="18px"
                  onClick={handleStationDeleteClick(station.id)}
                />
              </Flex>
            ))}
            <Select
              placeholder="Select Station"
              onChange={handleAvailableStationsChange}
            >
              {availableStations
                .filter(
                  (availableStation) =>
                    stations
                      .map((station) => station.id)
                      .indexOf(availableStation.id) === -1
                )
                .map((availableStation) => (
                  <option key={availableStation.id} value={availableStation.id}>
                    {availableStation.name}
                  </option>
                ))}
            </Select>
          </Flex>
        </FormControl>
      </GridItem>
      <GridItem>
        <Flex justifyContent="end" gap={2}>
          <NavLink to="/admin/lines">
            <Button colorScheme="gray" type="submit">
              Cancel
            </Button>
          </NavLink>
          <Button
            colorScheme="teal"
            type="submit"
            disabled={!isFormReady || syncing}
            onClick={handleSubmitClick}
          >
            {formType === "add" && "Add"}
            {formType === "edit" && "Edit"}
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};
