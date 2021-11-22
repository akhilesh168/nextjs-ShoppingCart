import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import CategoryPanel from "../../components/CategoryPanel";
import axios from "axios";

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
  const url = "http://localhost:5000";
  const products = (await axios.get(`${url}/products`)).data;
  const categoryId = ctx.query.id;
  return {
    props: {
      categoryId,
      products,
    },
  };
}
