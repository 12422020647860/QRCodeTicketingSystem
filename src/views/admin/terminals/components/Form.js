// Chakra imports
import {
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
import { NavLink } from "react-router-dom";

export default ({
  formType,
  type,
  station,
  isFormReady,
  syncing,
  availableTypes,
  availableStations,
  onTypeChange,
  onStationChange,
  onSubmitClick,
}) => {
  const handleTypeChange = (e) => {
    onTypeChange(e);
  };
  const handleStationChange = (e) => {
    onStationChange(e);
  };
  const handleSubmitClick = (e) => {
    onSubmitClick(e);
  };
  return (
    <Grid px="25px" gap={4}>
      <GridItem>
        <FormControl>
          <FormLabel>Terminal Type</FormLabel>
          <Select
            placeholder="Select Type"
            onChange={handleTypeChange}
            value={type}
          >
            {availableTypes.map((availableType) => (
              <option key={availableType} value={availableType}>
                {availableType}
              </option>
            ))}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl>
          <FormLabel>Terminal Station</FormLabel>
          <Select
            placeholder="Select Station"
            onChange={handleStationChange}
            value={station}
          >
            {availableStations.map((availableStation) => (
              <option key={availableStation.id} value={availableStation.id}>
                {availableStation.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem>
        <Flex justifyContent="end" gap={2}>
          <NavLink to="/admin/terminals">
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
