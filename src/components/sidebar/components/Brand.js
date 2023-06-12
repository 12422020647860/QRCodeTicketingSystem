import React from "react";

// Chakra imports
import { Flex, Image } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

import metroLogo from "assets/img/metro-logo.png"

export function SidebarBrand() {

  return (
    <Flex align='center' direction='column' gap={8}>
      <Image src={metroLogo} alt='' w='175px' />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
