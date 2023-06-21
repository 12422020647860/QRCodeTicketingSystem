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
  price,
  stations,
  isFormReady,
  syncing,
  onPriceChange,
  onStationsChange,
  onSubmitClick,
}) => {
  const handlePriceChange = (e) => {
    if (e.target.value.match(/^\d*[1-9]\d*$/) || e.target.value === "")
      onPriceChange(e);
  };
  const handleStationsChange = (e) => {
    if (e.target.value.match(/^\d*$/) || e.target.value === "")
      onStationsChange(e);
  };
  const handleSubmitClick = (e) => {
    onSubmitClick(e);
  };
  return (
    <Grid px="25px" gap={4}>
      <GridItem>
        <FormControl>
          <FormLabel>Ticket Type Price</FormLabel>
          <Input type="text" onChange={handlePriceChange} value={price} />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl>
          <FormLabel>Ticket Type Maxuimam Stations</FormLabel>
          <Input type="text" onChange={handleStationsChange} value={stations} />
          <FormHelperText>0 is unlimited</FormHelperText>
        </FormControl>
      </GridItem>
      <GridItem>
        <Flex justifyContent="end" gap={2}>
          <NavLink to="/admin/tickets-types">
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
