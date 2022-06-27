import {
  Box,
  Breadcrumbs,
  Container,
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
import ShowSubCats from "../components/ShowSubCats";
import SubCatCart from "../components/SubCatCart";
import { createCategoryList, navLinks } from "../data/dummy";

function Search() {
  let founded = {};
  const params = useParams();
  const catSlug = params.categorySlug;
  const categories = createCategoryList(navLinks);
  const currentCategory = getCategoryBySlug(catSlug);
  let subCategories = getChildrenCat(currentCategory);
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
    // if (Object.keys(founded).length > 0) {
    //   return founded;
    // } else {
    //   return false;
    // }
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
    let subCategories = [];
    category.children.map((child, index) => {
      let subCat = {
        name: child.name,
        slug: child.slug,
      };
      subCategories.push(subCat);
      getChildrenCat(child);
    });
    return subCategories;
  }
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
      </Container>
    </>
  );
}

export default Search;
