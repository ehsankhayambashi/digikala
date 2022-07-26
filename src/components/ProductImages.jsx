import React, { useState } from "react";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
function ProductImages({ mainImage, images: otherImages }) {
  const [imgSelectedId, setImgSelectedId] = useState(0);
  let allImages = [...otherImages];
  allImages.push(mainImage);
  const [images, setImages] = useState(allImages.reverse());

  const handleImgSelect = (index) => {
    setImgSelectedId(index);
  };
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="center">
        <img width="80%" src={images[imgSelectedId]} alt="akse asli" />
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          display: "flex",
          whiteSpace: "nowrap",
        }}
        display="flex"
      >
        {images.map((image, index) => (
          <Box
            sx={{
              minWidth: "20%",
              border: "1px solid",
              borderColor: index === imgSelectedId ? "red" : "grey.300",
            }}
            borderRadius={1}
            m={0.5}
            p={0.25}
            key={index}
            onClick={() => handleImgSelect(index)}
          >
            <img width="100%" src={image} alt="" />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ProductImages;
