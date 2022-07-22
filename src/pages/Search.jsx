import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  ImageList,
  Link,
  makeStyles,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ShowSubCats from "../components/ShowSubCats";
import FilterTabs from "../components/FilterTabs";
import {
  allProducts,
  createCategoryList,
  navLinks,
  theme,
} from "../data/dummy";
import ModalMobile from "../components/ModalMobile";
import { Link as RouterLink } from "react-router-dom";

function Search() {
  let founded = {};
  let subCategories = [];
  const params = useParams();
  const catSlug = params.categorySlug;
  const categories = createCategoryList(navLinks);
  const currentCategory = getCategoryBySlug(catSlug);
  getChildrenCat(currentCategory);
  const catArray = getCatArray(currentCategory, subCategories);
  const products = getProductsByCatIds(catArray);
  let breadcrumbsCategories = makeBreadcrumbs(
    categories,
    currentCategory.parentId
  );

  //---------------------------------------
  function makeBreadcrumbs(categories, parentId) {
    let breadcrumbsCategories = [];
    let currentCatParentId = parentId;
    while (currentCatParentId != null) {
      findParent(categories, currentCatParentId);
      if (Object.keys(founded).length != 0) {
        breadcrumbsCategories.push({
          name: founded.name,
          slug: founded.slug,
        });
        currentCatParentId = founded.parentId;
      }
    }
    return breadcrumbsCategories.reverse();
  }
  function findParent(categories, parentId) {
    categories.map((category) => {
      if (category.id === parentId) {
        founded = category;
      }
      findParent(category.children, parentId);
    });
  }
  function getCategoryBySlug(slug) {
    let category = {};
    let fintCats = navLinks.filter((cat) => cat.slug === slug);
    let cat = fintCats[0];
    category = {
      name: cat.name,
      id: cat.id,
      parentId: cat.parentId,
      slug: cat.slug,
      children: createCategoryList(navLinks, cat.id),
    };
    return category;
  }

  function getChildrenCat(category) {
    category.children.map((child, index) => {
      let subCat = {
        name: child.name,
        slug: child.slug,
        id: child.id,
      };
      subCategories.push(subCat);
      getChildrenCat(child);
    });
    // return subCategories;
  }

  function getCatArray(currentCategory, subCategories) {
    let catIdArray = [];
    catIdArray.push(currentCategory.id);
    subCategories.map((cat) => {
      catIdArray.push(cat.id);
    });
    return catIdArray;
  }

  function getProductsByCatIds(catArray) {
    let products = [];
    catArray.map((catId) => {
      let productBycat = allProducts.find((prod) => prod.category === catId);
      if (productBycat !== undefined) products.push(productBycat);
    });
    return products;
  }

  // mobile modal
  const [open, setOpen] = useState(false);
  // filter state
  const [filter, setFilter] = useState({
    currentFilter: { value: "view", label: "پربازدیدترین" },
    view: { value: "view", label: "پربازدیدترین" },
    newest: { value: "newest", label: "جدیدترین" },
    bestseller: { value: "bestseller", label: "پرفروش‌ترین" },
    cheapest: { value: "cheapest", label: "ارزانترین" },
    expensive: { value: "expensive", label: "گرانترین" },
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Breadcrumb parentCategories={breadcrumbsCategories} />
        {subCategories.length === 0 ? null : (
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              component="div"
              color="text.primary"
            >
              دسته‌بندی‌ها
            </Typography>
            <ShowSubCats subCategories={subCategories} />
          </Box>
        )}
        <FilterTabs setOpen={setOpen} filter={filter} setFilter={setFilter} />
        <Box mb={2}>
          <Divider />
        </Box>
        <Grid container>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
              <Link
                underline="none"
                color="text.secondary"
                component={RouterLink}
                to={`/product/${product.id}`}
              >
                <ProductCard product={product} />
              </Link>
            </Grid>
          ))}
        </Grid>
        <ModalMobile
          open={open}
          setOpen={setOpen}
          filter={filter}
          setFilter={setFilter}
        />
      </Container>
    </>
  );
}

export default Search;
