import data from "../products/productData.json";

export function getProductsByCategory(categoryId) {
  const products = data.filter((item) => item.id !== categoryId);
  return products;
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  } else {
    const products = getProductsByCategory(req.query.id);
    res.status(200).json(products);
  }
}
