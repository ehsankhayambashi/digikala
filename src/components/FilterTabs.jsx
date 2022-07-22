import { Typography, Box, Tabs, Tab, Button } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { FaSortAmountDown } from "react-icons/fa";
import React, { useState } from "react";
import { theme } from "../data/dummy";

const useStyles = makeStyles((theme) => ({
  tabs: {
    "& .MuiTabs-indicator": {
      display: "none",
      padding: "0",
      //backgroundColor: "orange"
    },
  },
}));

const StyledTab = styled(Tab)({
  padding: "8px !important",
  minWidth: "0 !important",
});

function FilterTabs({ setOpen, filter, setFilter }) {
  // const [value, setValue] = useState("view");

  const handleChange = (event, newValue) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        currentFilter: filter[newValue],
      };
    });
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        height="60px"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <FaSortAmountDown />
          <Box>
            <Typography> مرتب سازی:</Typography>
          </Box>
          <Box>
            <Button
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={handleOpenModal}
              color="primary"
            >
              {filter.currentFilter.label}
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Tabs
              value={filter.currentFilter.value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              className={classes.tabs}
            >
              <StyledTab value={filter.view.value} label={filter.view.label} />
              <StyledTab
                value={filter.newest.value}
                label={filter.newest.label}
              />
              <StyledTab
                value={filter.bestseller.value}
                label={filter.bestseller.label}
              />
              <StyledTab
                value={filter.cheapest.value}
                label={filter.cheapest.label}
              />
              <StyledTab
                value={filter.expensive.value}
                label={filter.expensive.label}
              />
            </Tabs>
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{ display: { xs: "none", md: "none" } }}
            variant="body2"
            color={theme.palette.grey[600]}
          >
            ۱۳۶ کالا
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default FilterTabs;
