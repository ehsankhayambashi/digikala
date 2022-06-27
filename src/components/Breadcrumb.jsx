import { Breadcrumbs, Link, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

function Breadcrumb({ parentCategories }) {
  return (
    <Box
      mt={3}
      pb={1}
      sx={{
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <Link
        underline="none"
        color="text.secondary"
        component={RouterLink}
        to="/"
      >
        <Typography display="inline" variant="subtitle2" color="text.secondary">
          کافه ایستگاه
        </Typography>
      </Link>
      {parentCategories.length === 0 ? null : (
        <Typography color="text.secondary" marginX={1} display="inline">
          /
        </Typography>
      )}
      {parentCategories.map((cat, index) => (
        <React.Fragment key={index}>
          <Link
            underline="none"
            color="text.secondary"
            component={RouterLink}
            to={`/search/${cat.slug}`}
          >
            <Typography
              display="inline"
              variant="subtitle2"
              color="text.secondary"
            >
              {cat.name}
            </Typography>
          </Link>
          {index === parentCategories.length - 1 ? null : (
            <Typography color="text.secondary" marginX={1} display="inline">
              /
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default Breadcrumb;
