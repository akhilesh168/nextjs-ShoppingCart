import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import CategoryPanel from "../../components/CategoryPanel";
import axios from "axios";
import { getCategories } from "../api/category";
import { getProductsByCategory } from "../api/category/[id]";

export default function CategoriesPage({ categoryId, products }) {
  const productByCategory = products.filter(
    (category) => category.category === categoryId
  );
  return (
    <>
      <Row>
        <Col xs={2}>
          <CategoryPanel />
        </Col>
        <Col xs={10}>
          <Product products={productByCategory} />
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const categoryId = ctx.query.id;
  console.log(categoryId);
  const products = getProductsByCategory(categoryId);
  return {
    props: {
      categoryId,
      products,
    },
  };
}
