import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { ReactComponent as SpecialSaleImg } from "../data/SpecialSell.svg";
import React from "react";
// import { product } from "../data/dummy";
import { MdStarRate } from "react-icons/md";

function ProductCard({ product }) {
  return (
    <Card>
      <CardActionArea>
        {/* card content */}
        <Box p={1}>
          {/* specisl sale */}
          <Box
            mb={0.5}
            sx={{
              visibility: product.discount ? "visible" : "hidden",
            }}
          >
            <SpecialSaleImg />
          </Box>
          {/* main two columns img and information */}
          <Box
            display="flex"
            sx={{
              flexDirection: { xs: "row", sm: "column" },
              alignItems: { sm: "center" },
            }}
          >
            {/* img col */}
            <Box>
              <Box
                sx={{
                  width: { xs: "118px", sm: "240px" },
                  mx: { xs: 0, md: 6 },
                }}
                mb={3}
                display="flex"
                justifyContent="center"
              >
                <img
                  style={{ objectFit: "contain" }}
                  width="100%"
                  src={product.imgUrl}
                  alt="product image"
                />
              </Box>
            </Box>
            {/* information col */}
            <Box display="flex" flexDirection="column" width="100%">
              {/* product title */}
              <Box minHeight="60px">
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    lineClamp: 2,
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                  component="h2"
                  variant="subtitle2"
                  lineHeight="2.15"
                  textAlign="right"
                >
                  {product.title}
                </Typography>
              </Box>
              {/* rate and stock number */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                {product.stockNumber <= 3 ? (
                  <Typography
                    sx={{ fontSize: "12px" }}
                    variant="caption"
                    color="red"
                  >
                    تنها {product.stockNumber} عدد در انبار باقی مانده
                  </Typography>
                ) : (
                  <span></span>
                )}
                <Box display="flex" alignItems="center">
                  <Typography ml={0.5} component="p" variant="caption">
                    {product.rate}
                  </Typography>
                  <MdStarRate fontSize="1rem" color="gold" />
                </Box>
              </Box>
              {/* price and discount persentage */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent={product.discount ? "space-between" : "end"}
              >
                <Box
                  borderRadius={2}
                  display="flex"
                  alignItems="center"
                  bgcolor="red"
                  px={1}
                  visibility={product.discount ? "visible" : "hidden"}
                >
                  <Typography
                    sx={{ fontSize: "13px" }}
                    color="white"
                    variant="caption"
                  >
                    {product.discount + "%"}
                  </Typography>
                </Box>

                <Box display="flex">
                  <Typography>
                    {product.discount ? product.discountedPrice : product.price}
                  </Typography>
                  <Typography>تومان</Typography>
                </Box>
              </Box>
              {/* show main price */}
              <Box
                position="relative"
                pl={4.5}
                display="flex"
                justifyContent="end"
                visibility={product.discount ? "visible" : "hidden"}
              >
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    // textDecorationThickness: "2px",
                    // textUnderlineOffset: "-.3em",
                    // textDecorationSkipInk: "none",
                  }}
                  color="grey.500"
                  variant="caption"
                >
                  {product.price}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
