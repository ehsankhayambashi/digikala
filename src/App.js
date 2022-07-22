import { theme } from "./data/dummy";
import { ThemeProvider } from "@mui/material";
import Navbar from "../src/components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/search/:categorySlug" element={<Search />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
