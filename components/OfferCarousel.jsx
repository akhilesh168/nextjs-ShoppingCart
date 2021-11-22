import React from "react";
import { Carousel, Image } from "react-bootstrap";

export default function OfferCarousel({ offers }) {
  const carouselItems = offers?.map((item) => (
    <Carousel.Item key={item.id}>
      <Image
        className="d-block w-100"
        src={item.bannerImageUrl}
        alt="First slide"
      />
    </Carousel.Item>
  ));
  return <Carousel variant="dark">{carouselItems}</Carousel>;
}
