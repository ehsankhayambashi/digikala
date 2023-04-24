import { Box, Container, useMediaQuery } from "@mui/material";
import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/dummy";
import ProductImages from "../components/ProductImages";
import ProductInfoCard from "../components/ProductInfoCard";
import ProductDynamicAttribute from "../components/ProductDynamicAttribute";
import ProductFeatures from "../components/ProductFeatures";
import ProductTitle from "../components/ProductTitle";
import ProductComments from "../components/ProductComments";
import ProductInfoCardMobile from "../components/ProductInfoCardMobile";
import { theme } from "../data/dummy";
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

  const mobileVersion = useMediaQuery(theme.breakpoints.down("md"));
  const params = useParams();
  const productId = params.productId;
  const product = getProductById(productId);
  return (
    <Box sx={{ paddingBottom: mobileVersion ? "82px" : "0" }}>
      <Navbar />
      <Container maxWidth="xl">
        <Breadcrumb parentCategories={parentCategories} />
        <Box display="flex" sx={{ flexDirection: { xs: "column", md: "row" } }}>
          <Box flex={2}>
            <ProductImages mainImage={product.imgUrl} images={product.images} />
          </Box>
          <Box flex={3} sx={{ pr: { md: 0.5 } }}>
            <ProductTitle title={product.title} />
            <Box display="flex" flexDirection="column">
              <Box
                display="flex"
                sx={{ flexDirection: { xs: "column", md: "row" } }}
              >
                <Box flex={2}>
                  <Box display="flex" flexDirection="column">
                    <ProductDynamicAttribute
                      attributes={product.dynamicAttributes}
                      type={product.dynamicType}
                    />
                    <ProductFeatures features={product.features} />
                  </Box>
                </Box>
                <ProductInfoCard product={product} />
              </Box>
            </Box>
          </Box>
        </Box>
        <ProductComments comments={product.comments} />
      </Container>
      <ProductInfoCardMobile product={product} />
    </Box>
  );
}

export default ProductPage;
