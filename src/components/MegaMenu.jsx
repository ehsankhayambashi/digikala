import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
  },
}));
function MegaMenu({ subCats, anchorEl, setAnchorEl, event }) {
  // const [subCatanchorEl, setSubCatanchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setAnchorEl(event);
  };

  const classes = useStyles();
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      className={classes.popover}
      classes={{
        paper: classes.popoverContent,
      }}
      // PaperProps={{
      //   style: { width: "100%" },
      // }}
      PaperProps={{ onMouseEnter: handleClick, onMouseLeave: handleClose }}
      disdisablerestorefocus="true"
    >
      <Stack direction="row">
        {subCats.map((cat, index) => (
          <Box p={1} key={index} display="flex">
            <List>
              <ListItem key={index} sx={{ paddingRight: "0" }}>
                {/* <ListItemButton sx={{ paddingRight: "0" }}> */}
                <Link
                  to={`/search/${cat.slug}`}
                  // color="inherit"
                  // sx={{ "&:hover": { color: "skyblue" } }}
                  sx={{ textUnderlineOffset: "5px" }}
                  component={RouterLink}
                  underline="hover"
                >
                  <ListItemText
                    sx={{ margin: "0", textAlign: "right" }}
                    primary={cat.name}
                    onClick={handleClose}
                  />
                </Link>
                {/* <ListItemIcon sx={{ minWidth: "0" }}>
                    <IoIosArrowBack />
                  </ListItemIcon> */}
                {/* </ListItemButton> */}
              </ListItem>
              {cat.children.map((child, index) => (
                <ListItem disablePadding key={index}>
                  <Link
                    to={`/search/${child.slug}`}
                    underline="hover"
                    sx={{ textUnderlineOffset: "5px" }}
                    component={RouterLink}
                  >
                    <ListItemText
                      sx={{
                        textAlign: "right",
                        margin: "0",
                        paddingLeft: "10px",
                        paddingBottom: "5px",
                        color: "#81858b",
                        whiteSpace: "nowrap",
                      }}
                      primary={child.name}
                      onClick={handleClose}
                    />
                  </Link>
                </ListItem>
              ))}
            </List>
            {index === subCats.length - 1 ? (
              ""
            ) : (
              <Divider orientation="vertical" flexItem />
            )}
          </Box>
        ))}
      </Stack>
    </Popover>
  );
}

export default MegaMenu;
