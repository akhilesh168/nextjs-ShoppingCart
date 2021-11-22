import React from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItemQuantityInCart,
  decrementItemQuantityInCart,
} from "../redux/cart.slice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ArrowRight } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { CardHeader, Grid, IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
export default function MyCart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const cartLength = cart?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const totalCartPrice = cart?.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const router = useRouter();
  return (
    <>
      {cart.length === 0 ? null : (
        <>
          <Grid
            container
            spacing={12}
            justifyContent="center"
            alignContent="center"
          >
            <Grid item>
              <Typography className="p text-center">
                My Cart ({cartLength} Item)
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={12}>
            {cart.map((product) => (
              <Grid item key={product.id} style={{ display: "flex" }}>
                <Card
                  sx={{ maxWidth: 300 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: "column",
                  }}
                >
                  <CardHeader title={product?.name}></CardHeader>
                  <CardMedia
                    component="img"
                    alt={product?.name}
                    image={product?.imageURL}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {product?.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      size="small"
                      variant="contained"
                      onClick={() =>
                        dispatch(incrementItemQuantityInCart(product))
                      }
                    >
                      <AddBoxIcon color="error" />
                    </IconButton>
                    <Typography>{product?.quantity}</Typography>
                    <IconButton
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() =>
                        dispatch(decrementItemQuantityInCart(product))
                      }
                    >
                      <IndeterminateCheckBoxIcon color="error" />
                    </IconButton>
                    <Typography>x {product?.price}</Typography>
                    <Typography className="ml-4">
                      {product?.quantity * product?.price}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {cartLength === 0 ? (
        <>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Typography>No Items in your cart</Typography>
            </Grid>
            <Grid item>
              <Typography>Your favorite items are just a click away</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Button
                variant="contained"
                color={"error"}
                onClick={() => router.push("/products")}
              >
                Start Shopping
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <div className="container-fluid text-center mt-2 mb-2">
            <Image src="/static/images/lowest-price.png" alt="lowest price" />
            <Typography>You won't find it cheap anywhere</Typography>
          </div>
          <div className="container-fluid mb-2">
            <Typography className="p text-center">
              Promo Code Can be applied on payment page)
            </Typography>
          </div>
          <div className="container-fluid text-center">
            <Button variant="contained" color={"error"}>
              Proceed to checkout {`    ${totalCartPrice}`} <ArrowRight />
            </Button>
          </div>
        </>
      )}
    </>
  );
}
