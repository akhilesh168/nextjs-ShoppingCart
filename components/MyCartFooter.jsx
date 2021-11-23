import React from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { Image } from "react-bootstrap";
import { ArrowRight } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function MyCartFooter({
  totalCartPrice,
  cartLength,
  handleClose,
}) {
  const router = useRouter();
  const handleRoute = () => {
    router.push("/products");
    handleClose();
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
            <Button variant="contained" color={"error"}>
              Proceed to checkout {`  RS  ${totalCartPrice}`} <ArrowRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
