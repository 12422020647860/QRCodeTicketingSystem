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
  name,
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
  return (
    <Grid px="25px" gap={4}>
      <GridItem>
        <FormControl>
          <FormLabel>Line Name</FormLabel>
          <Input type="text" onChange={handleNameChange} value={name} />
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
