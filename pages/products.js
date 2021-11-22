import axios from "axios";
import React from "react";

import CategoryPanel from "../components/CategoryPanel";
import Product from "../components/Product";
import { getAllProduct } from "../redux/product.slice";
import { getAllCategory } from "../redux/category.slice";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

export default function Products({ products, categories }) {
  const dispatch = useDispatch();
  const categoriesSelector = useSelector((state) => state.categories);
  dispatch(getAllCategory(categories));
  if (categoriesSelector.length === 0) {
    dispatch(getAllProduct(products));
  }
  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={2}>
          <CategoryPanel />
        </Grid>
        <Grid item xs={10}>
          <Product products={products} />
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
  const url = "http://localhost:5000";
  const categories = (await axios.get(`${url}/categories`)).data;
  const products = (await axios.get(`${url}/products`)).data;
  return {
    props: {
      products,
      categories,
    },
  };
}
