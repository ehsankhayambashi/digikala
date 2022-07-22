import React from "react";
import { Box } from "@mui/material";

function ProductImages({ mainImage, images }) {
  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <img width="80%" src={mainImage} alt="akse asli" />
      </Box>
      <Box display="flex">
        {images.map((image, index) => (
          <Box sx={{ width: "30%" }}>
            <img width="100%" src={image.imgUrl} alt="" />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ProductImages;
