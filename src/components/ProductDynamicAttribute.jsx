import React, { useState } from "react";
import { Box } from "@mui/system";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FiCheck } from "react-icons/fi";
import ProductColor from "./ProductColor";
import ProductProperty from "./ProductProperty";
function ProductDynamicAttribute({ attributes, type }) {
  if (attributes.length > 0) {
    return type === "رنگ" ? (
      <ProductColor attributes={attributes} type={type} />
    ) : (
      <ProductProperty attributes={attributes} type={type} />
    );
  } else {
    return null;
  }
}

export default ProductDynamicAttribute;
