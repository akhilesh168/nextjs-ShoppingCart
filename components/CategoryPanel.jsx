import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavLink from "next/link";
import Divider from "@mui/material/Divider";

export default function CategoryPanel() {
  const categories = useSelector((state) => state.categories);

  const categoriesLink = categories.map((category) => (
    <>
      <Navbar fill className="flex-column" key={category.id}>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                activeClassName="active"
                href={`/category/${category.id}`}
                passHref
              >
                <Nav.Link>{category.name}</Nav.Link>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Divider variant="middle" />
    </>
  ));
  return <>{categoriesLink}</>;
}
