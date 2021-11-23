import { Grid } from "@mui/material";
import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function Product({ products }) {
  return (
    <Grid container spacing={12}>
      {products.map((item) => (
        <Grid item key={item.id} style={{ display: "flex" }}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  );
}
