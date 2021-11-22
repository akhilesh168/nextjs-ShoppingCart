import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import CategoryContent from "./CategoryContent";

export default function CategoryCard({ category }) {
  return (
    <Container>
      <CategoryContent content={category} />
    </Container>
  );
}
