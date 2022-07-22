import { Box, Container } from "@mui/material";
import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/dummy";
import ProductImages from "../components/ProductImages";

function ProductPage() {
  const parentCategories = [
    {
      name: "دیجیتال",
      slug: "category-digital",
    },
    {
      name: "موبایل",
      slug: "category-mobile",
    },
  ];

  const params = useParams();
  const productId = params.productId;
  const product = getProductById(productId);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Breadcrumb parentCategories={parentCategories} />
        <Box display="flex">
          {/* show images */}
          <Box flex={2}>
            <ProductImages mainImage={product.imgUrl} images={product.images} />
          </Box>
          <Box flex={3} bgcolor="gold">
            hello
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ProductPage;
