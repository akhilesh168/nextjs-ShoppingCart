import OfferCarousel from "../components/OfferCarousel";
import CategoryCard from "../components/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../redux/category.slice";
import { getCategories } from "./api/category";
import { getOffers } from "./api/banners/offers";

export default function HomePage({ categories, offers }) {
  const dispatch = useDispatch();

  const categoriesSelector = useSelector((state) => state.categories);
  if (categoriesSelector.length === 0) {
    dispatch(getAllCategory(categories));
  }

  return (
    <>
      <OfferCarousel offers={offers} />
      {categories?.map((item) => (
        <CategoryCard key={item.name} category={item} />
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const categories = getCategories();
  const offers = getOffers();

  return {
    props: {
      categories,
      offers,
    },
  };
}
