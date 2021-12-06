import React from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { Image } from "react-bootstrap";
import { ArrowRight } from "@mui/icons-material";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { API_HANDLER } from "../lib/util/apiUtil";
import { cartCheckoutDataTransform } from "../lib/util/transformDataUtil";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
export default function MyCartFooter({
  totalCartPrice,
  cartLength,
  handleClose,
}) {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const handleRoute = () => {
    router.push("/products");
    handleClose();
  };

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await API_HANDLER.postRequest(
      "/api/create-checkout-session",
      {
        items: cartCheckoutDataTransform(cart),
        email: "test@gmail.com",
      }
    );
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div>
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
              <Button variant="contained" color={"error"} onClick={handleRoute}>
                Start Shopping
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <div className="container-fluid text-center mt-2 mb-2">
            <Image src="/static/images/lowest-price.png" alt="lowest price" />
            <Typography>{"You won't find it cheap anywhere"}</Typography>
          </div>
          <div className="container-fluid mb-2">
            <Typography className="p text-center">
              Promo Code Can be applied on payment page)
            </Typography>
          </div>
          <div className="container-fluid text-center">
            <Button
              variant="contained"
              color={"error"}
              onClick={createCheckOutSession}
            >
              Proceed to checkout {`  RS  ${totalCartPrice}`} <ArrowRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
