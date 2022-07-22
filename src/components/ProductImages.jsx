import React from "react";
import { Box } from "@mui/material";

function ProductImages({ mainImage, images }) {
  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <img width="100%" src={mainImage} alt="akse asli" />
      </Box>
      <Box></Box>
    </Box>
  );
}

export default ProductImages;
