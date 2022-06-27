import { theme } from "./data/dummy";
import { ThemeProvider } from "@mui/material";
import Navbar from "../src/components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/search/:categorySlug" element={<Search />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
