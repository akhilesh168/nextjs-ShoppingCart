import { Image } from "react-bootstrap";
import Link from "next/link";
import { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { UserContext } from "../pages/_app";
import firebase from "../firebase/initAuth";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import MyCartDialog from "./MyCartDialog";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const NavbarWithProps = () => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await firebase.auth().signOut();
    router.push("/");
    s;
  };
  const router = useRouter();

  const cart = useSelector((state) => state.cart);
  const cartLength = cart?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <Navbar collapseOnSelect bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          {" "}
          <Image
            src="/static/images/logo.png"
            style={{ objectFit: "cover", height: "100%", width: "auto" }}
            alt="logo"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/products" passHref>
              <Nav.Link>Products</Nav.Link>
            </Link>
          </Nav>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid item>
              <Nav className="justify-content-end">
                {user.email ? (
                  <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                ) : (
                  <>
                    <Link href="/login" passHref>
                      <Nav.Link> {user.email}SignIn</Nav.Link>
                    </Link>
                    <Link href="/signUp" passHref>
                      <Nav.Link>Register</Nav.Link>
                    </Link>
                  </>
                )}
              </Nav>
            </Grid>
            <Grid item>
              <Fab
                variant="extended"
                size="small"
                color="default"
                aria-label="add"
                onClick={() => setOpen(true)}
              >
                <ShoppingCartIcon sx={{ mr: 1 }} />
                {cartLength} Items
              </Fab>

              <MyCartDialog open={open} onClose={() => setOpen(false)} />
            </Grid>
          </Grid>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarWithProps;
