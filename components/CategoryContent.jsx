import React from "react";
import { Card, Button, Nav } from "react-bootstrap";
import Link from "next/link";

export default function CategoryContent({ content }) {
  return (
    <div>
      <Card
        style={
          content.order % 2 === 0
            ? { flexDirection: "row-reverse" }
            : { flexDirection: "row" }
        }
        className="mb-3"
      >
        <Card.Img
          src={content.imageUrl}
          alt={content?.key}
          style={{ objectFit: "cover", height: "100%", width: "500px" }}
        ></Card.Img>

        <Card.Body className="mt-5 pt-5">
          <Card.Title>{content.name}</Card.Title>
          <Card.Text>{content.description}</Card.Text>
          <Button variant="danger">
            <Link href={`/category/${content.id}`} passHref>
              <Nav.Link
                style={{ color: "white" }}
              >{`Explore ${content.name}`}</Nav.Link>
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
