// Chakra imports
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default ({
  formType,
  location,
  isFormReady,
  syncing,
  onLocationChange,
  onSubmitClick,
}) => {
  const handleLocationChange = (e) => {
    onLocationChange(e);
  };
  const handleSubmitClick = (e) => {
    onSubmitClick(e);
  };
  return (
    <Grid px="25px" gap={4}>
      <GridItem>
        <FormControl>
          <FormLabel>Charger Location</FormLabel>
          <Input type="text" onChange={handleLocationChange} value={location} />
        </FormControl>
      </GridItem>
      <GridItem>
        <Flex justifyContent="end" gap={2}>
          <NavLink to="/admin/chargers">
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
