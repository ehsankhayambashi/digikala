import slide1 from "./slide1.jpeg";
import slide2 from "./slide2.jpeg";
import slide3 from "./slide3.jpeg";
import slide4 from "./slide4.jpeg";
import slide5 from "./slide5.jpeg";
import slide6 from "./slide6.jpeg";

import m1 from "./m1.jpeg";
import m2 from "./m2.jpeg";
import m3 from "./m3.jpeg";
import m4 from "./m4.jpeg";
import m5 from "./m5.jpeg";
import m6 from "./m6.jpeg";
import { createTheme } from "@mui/material/styles";
// import { createMuiTheme, ThemeProvider } from "@mui/material/core";

export const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#fff",
  //   },
  // },
  typography: {
    fontFamily: "iransans",
  },
});

export const navLinks = [
  { name: "دیجیتال", slug: "category-digital", id: 1, parentId: null },
  { name: "خوراک", slug: "category-food", id: 2, parentId: null },
  { name: "پوشاک", slug: "category-clothes", id: 3, parentId: null },
  { name: "زیبایی", slug: "category-beauty", id: 4, parentId: null },
  { name: "آشپز خانه", slug: "category-kitchen", id: 5, parentId: null },
  { name: "موبایل", slug: "category-mobile", id: 6, parentId: 1 },
  { name: "تبلت", slug: "category-tablet", id: 7, parentId: 1 },
  { name: "لپتاپ", slug: "category-laptop", id: 8, parentId: 1 },
  { name: "قاب موبایل", slug: "category-mobile-cover", id: 9, parentId: 6 },
  {
    name: "جعبه موبایل موبایل موبایل",
    slug: "category-mobile-box",
    id: 18,
    parentId: 6,
  },
  { name: "قاب صورتی", slug: "category-pink-cover", id: 12, parentId: 9 },
  { name: "قاب آبی", slug: "category-blue-cover", id: 13, parentId: 9 },
  {
    name: "باطری موبایل",
    slug: "category-mobile-battery",
    id: 10,
    parentId: 6,
  },
  { name: "گلس موبایل", slug: "category-mobile-glass", id: 11, parentId: 6 },
  { name: "اجاق گاز", slug: "category-oven", id: 14, parentId: 5 },
  { name: "روکش اجاق", slug: "category-oven-cover", id: 15, parentId: 14 },
  { name: "۱لپتاپ", slug: "category-laptop-1", id: 16, parentId: 8 },
  { name: "۲لپتاپ", slug: "category-laptop-2", id: 17, parentId: 8 },
];
export function searchPageData(slug) {
  //get all categories
  const categories = createCategoryList(navLinks);
  //get current cat by slug
  const currentCategory = getCategoryBySlug(slug);
  //get children's category
  let subCategories = getChildrenCat(currentCategory);
  //get parant's category
  let breadcrumbsCategories = makeBreadcrumbs(
    categories,
    currentCategory.parentId
  );

  let searchPageData = {
    currentCategory: currentCategory,
    subCategories: subCategories,
    parentCategories: breadcrumbsCategories,
  };

  return searchPageData;
}
export function getCategoryBySlug(slug) {
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

export function createCategoryList(categories, parentId = null) {
  let categoryList = [];
  let cats;
  let category = {};
  if (parentId === null) {
    cats = categories.filter((cat) => cat.parentId === null);
  } else {
    cats = categories.filter((cat) => cat.parentId === parentId);
  }
  for (let cat of cats) {
    category = {
      name: cat.name,
      id: cat.id,
      parentId: cat.parentId,
      slug: cat.slug,
      children: createCategoryList(categories, cat.id),
    };
    categoryList.push(category);
  }
  return categoryList;
}

export const dataSlider = [
  { imgLink: slide1, mobileLink: m1 },
  { imgLink: slide2, mobileLink: m2 },
  { imgLink: slide3, mobileLink: m3 },
  { imgLink: slide4, mobileLink: m4 },
  { imgLink: slide5, mobileLink: m5 },
  { imgLink: slide6, mobileLink: m6 },
];

// const digital = categories[4];
// iek category be in func midim bache hasho mizare to subCategories

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
//-------------------------------------------------------------------

//ie parentid va tamame category haro be func makeBreadcrumbs midim tamame parent hasho mizare to array breadcrumbsCategories

function makeBreadcrumbs(categories, parentId) {
  let breadcrumbsCategories = [];
  let currentCatParentId = parentId;
  while (currentCatParentId != null) {
    let founded = findParent(categories, currentCatParentId);
    if (founded != false) {
      console.log("founded", founded);
    }
    breadcrumbsCategories.push({
      name: founded.name,
      slug: founded.slug,
    });
    currentCatParentId = founded.parentId;
  }
  console.log("breadcrumbsCategories", breadcrumbsCategories);
  return breadcrumbsCategories;
}
function findParent(categories, parentId) {
  let founded = {};
  categories.map((category) => {
    if (category.id === parentId) {
      founded = category;
    }
    findParent(category.children, parentId);
  });
  if (Object.keys(founded).length > 0) {
    return founded;
  } else {
    return false;
  }
}
//------------------------------------------------------------------------------------------------------------------------------
