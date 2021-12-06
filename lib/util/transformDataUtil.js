export const cartCheckoutDataTransform = (cart) => {
  const transformedItems = cart.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        images: [`http://localhost:3000${item.imageURL}`],
        name: item.name,
      },
      unit_amount: item.price,
    },
    description: item.description,
    quantity: item.quantity,
  }));
  return transformedItems;
};
