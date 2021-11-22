import OfferCarousel from "../components/OfferCarousel";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../redux/category.slice";
import NavbarWithProps from "../components/NavbarWithProps";

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
  const url = "http://localhost:5000";
  const categories = (await axios.get(`${url}/categories`)).data;
  const offers = (await axios.get(`${url}/banners`)).data;

  return {
    props: {
      categories,
      offers,
    },
  };
}
