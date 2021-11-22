import React from "react";

import { addToCart } from "../redux/cart.slice";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <Card
      sx={{ maxWidth: 300 }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardHeader title={product.name}></CardHeader>
      <CardMedia
        component="img"
        alt={product?.name}
        image={product?.imageURL}
      />
      <CardContent>
        <Typography>{product.description}</Typography>
      </CardContent>
      <CardActions>
        <strong className="me-auto">MRP RS {product.price}</strong>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(addToCart(product))}
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
}
