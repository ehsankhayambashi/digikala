import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  Link,
  Popover,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { SiCoffeescript } from "react-icons/si";
import { MdSearch, MdCoffeeMaker } from "react-icons/md";
import { FiShoppingCart, FiUser, FiPhone } from "react-icons/fi";
import { VscTriangleDown } from "react-icons/vsc";
import { GiHamburgerMenu, GiGlassShot } from "react-icons/gi";
import { GiCoffeeBeans, GiTeapotLeaves } from "react-icons/gi";
import { useState } from "react";
import { navLinks, createCategoryList, theme } from "../data/dummy";
import MegaMenu from "./MegaMenu";
import SideMenu from "../sideMenu/SideMenu";
import { Link as RouterLink } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(3),
    width: "100%",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 3, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
    // [theme.breakpoints.down("md")]: {
    //   width: "100%",
    // },
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "none",
  marginTop: "15px",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledButtonNav = styled(Button)(({ theme }) => ({
  gap: 10,
  border: 0,
  alignItems: "center",
  fontSize: "18px",
  padding: 0,
  // color: theme.palette.secondary.main,
  "& .MuiButton-startIcon": { marginRight: "0px" },
}));

function Navbar() {
  const [subCats, setSubCats] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const categories = createCategoryList(navLinks);

  const handleClick = (event, children) => {
    setAnchorEl(event.currentTarget);
    setSubCats(children);
    setEvent(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" color="primary">
          <Container maxWidth="xl">
            <StyledToolbar disableGutters={true}>
              <Box
                justifyContent="space-between"
                alignItems="center"
                sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}
              >
                <IconButton
                  size="inherit"
                  color="inherit"
                  sx={{ paddingRight: "0" }}
                  onClick={() => setDrawerOpen(true)}
                >
                  <GiHamburgerMenu />
                </IconButton>
                <Typography variant="h6" component="div">
                  کافه ایستگاه
                </Typography>
                <IconButton size="inherit" color="inherit">
                  <FiPhone />
                </IconButton>
              </Box>
              <Box
                display="flex"
                width="100%"
                mt={1}
                justifyContent="space-between"
              >
                <Box
                  gap={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: { xs: "100%" },
                  }}
                >
                  <Box
                    sx={{ display: { xs: "none", md: "flex" } }}
                    alignItems="center"
                    gap={1}
                  >
                    <SiCoffeescript />
                    <Typography fontWeight="bold" variant="h6" component="div">
                      کافه ایستگاه
                    </Typography>
                  </Box>
                  <Search>
                    <SearchIconWrapper>
                      <MdSearch />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="جستجو"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                </Box>
                <Box display="flex" gap={1}>
                  <IconButton size="inherit" color="inherit" disableRipple>
                    <FiUser />
                    <VscTriangleDown style={{ width: "12px" }} />
                  </IconButton>
                  <Divider orientation="vertical" />
                  <IconButton size="inherit" color="inherit">
                    <FiShoppingCart />
                  </IconButton>
                </Box>
              </Box>
              <StyledBox>
                {categories.map((category, index) => {
                  if (category.parentId === null) {
                    return (
                      <Link
                        key={index}
                        to={`/search/${category.slug}`}
                        component={RouterLink}
                        color="inherit"
                        underline="hover"
                        sx={{ textUnderlineOffset: "7px" }}
                        onClick={handleClose}
                      >
                        <StyledButtonNav
                          key={index}
                          color="inherit"
                          variant="outlined"
                          startIcon={<GiCoffeeBeans />}
                          onMouseOver={(e) => handleClick(e, category.children)}
                          onMouseLeave={handleClose}
                          sx={
                            index === 0
                              ? { marginRight: "0" }
                              : { marginRight: "20px" }
                          }
                        >
                          {category.name}
                        </StyledButtonNav>
                      </Link>
                    );
                  }
                })}
              </StyledBox>
            </StyledToolbar>
          </Container>
        </AppBar>
        <MegaMenu
          subCats={subCats}
          setAnchorEl={setAnchorEl}
          anchorEl={anchorEl}
          event={event}
        />
      </Box>

      {/* <Box sx={{ width: "100%", height: "300px" }}>
        <Slider />
      </Box> */}
      <SideMenu
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        categories={categories}
      />
    </>
  );
}

export default Navbar;
