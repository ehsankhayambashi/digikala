import { Box } from "@mui/material";
import React from "react";
import SubCatCart from "./SubCatCart";

function ShowSubCats({ subCategories }) {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        display: "flex",
        whiteSpace: "nowrap",
      }}
    >
      {subCategories.map((subCat, index) => (
        <SubCatCart subCat={subCat} key={index} />
      ))}
    </Box>
  );
}

export default ShowSubCats;
