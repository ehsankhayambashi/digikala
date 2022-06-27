import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdChevronLeft, MdExpandLess, MdExpandMore } from "react-icons/md";
import ThirdLevel from "./ThirdLevel";

function SecondLevel({ category }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List sx={{ paddingRight: "2rem" }} component="div" disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          sx={{ textAlign: "right" }}
          primary={
            open ? (
              <Typography variant="body1" style={{ color: "tomato" }}>
                {category.name}
              </Typography>
            ) : (
              <Typography variant="body1" style={{ color: "black" }}>
                {category.name}
              </Typography>
            )
          }
        />
        {open ? <MdExpandLess color="tomato" /> : <MdExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          sx={{ paddingRight: "2rem" }}
          component="div"
          disablePadding
          subheader={
            <ListSubheader
              sx={{
                backgroundColor: "#f0f0f1",
                display: "flex",
                alignItems: "center",
              }}
              component="div"
              id="nested-list-subheader"
            >
              همه موارد این دسته
              <MdChevronLeft />
            </ListSubheader>
          }
        >
          {category.children.map((child, index) => (
            <ThirdLevel category={child} key={index} />
          ))}
          <Divider variant="middle" />
        </List>
      </Collapse>
    </List>
  );
}

export default SecondLevel;
