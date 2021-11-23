import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MyCartBody from "./MyCartBody";
import MyCartFooter from "./MyCartFooter";

export default function MyCartDialog(props) {
  const { onClose, open } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const cart = useSelector((state) => state.cart);

  const cartLength = cart?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const totalCartPrice = cart?.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: "black", color: "white" }}
        >
          My Cart ({cartLength} Item)
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>

        <DialogContent>
          {cart.length === 0 ? null : (
            <>
              <MyCartBody cart={cart} />
            </>
          )}
          <MyCartFooter
            totalCartPrice={totalCartPrice}
            cartLength={cartLength}
            handleClose={onClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
