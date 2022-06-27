import { ListItemButton, ListItemText } from "@mui/material";
import Reac from "react";

function ThirdLevel({ category }) {
  return (
    <ListItemButton onClick={() => {}}>
      <ListItemText sx={{ textAlign: "right" }} primary={category.name} />
    </ListItemButton>
  );
}

export default ThirdLevel;
