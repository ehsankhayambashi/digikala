import React, { useState } from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function ModalMobile({ open, setOpen, filter, setFilter }) {
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleChange = (event, newValue) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        currentFilter: filter[newValue],
      };
    });
    setOpen(false);
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `auto`,
            maxHeight: `calc(90% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        // ModalProps={{
        //   keepMounted: true,
        // }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            انتخاب فیلتر
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <ToggleButtonGroup
            orientation="vertical"
            value={filter.currentFilter.value}
            color="primary"
            exclusive
            onChange={handleChange}
            fullWidth
          >
            <ToggleButton value={filter.view.value} aria-label="list">
              {filter.view.label}
            </ToggleButton>
            <ToggleButton value={filter.newest.value} aria-label="module">
              {filter.newest.label}
            </ToggleButton>
            <ToggleButton value={filter.bestseller.value} aria-label="quilt">
              {filter.bestseller.label}
            </ToggleButton>
            <ToggleButton value={filter.cheapest.value} aria-label="quilt">
              {filter.cheapest.label}
            </ToggleButton>
            <ToggleButton value={filter.expensive.value} aria-label="quilt">
              {filter.expensive.label}
            </ToggleButton>
          </ToggleButtonGroup>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default ModalMobile;
