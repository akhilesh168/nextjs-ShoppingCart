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
import Snackbar from "@mui/material/Snackbar";
import Alert from "../components/Alert";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    dispatch(addToCart(product));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
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
          <Button variant="contained" color="error" onClick={handleClick}>
            Buy Now
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Items added to the cart
        </Alert>
      </Snackbar>
    </>
  );
}
