import React from "react";
import { CardHeader, Grid, IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch } from "react-redux";
import {
  incrementItemQuantityInCart,
  decrementItemQuantityInCart,
  removeItemFromCart,
} from "../redux/cart.slice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
const StyledTypography = styled(Typography)`
  margin-left: 3rem !important;
`;

export default function MyCartBody({ cart }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Grid container spacing={12}>
        {cart.map((product) => (
          <Grid item key={product?.id} style={{ display: "flex" }}>
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
                  onClick={() => dispatch(incrementItemQuantityInCart(product))}
                >
                  <AddBoxIcon color="error" />
                </IconButton>
                <Typography>{product?.quantity}</Typography>
                <IconButton
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(decrementItemQuantityInCart(product))}
                >
                  <IndeterminateCheckBoxIcon color="error" />
                </IconButton>
                <Typography>x {product?.price}</Typography>
                <StyledTypography className="ml-4">
                  {product?.quantity * product?.price}
                </StyledTypography>
                <IconButton
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(removeItemFromCart(product))}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
