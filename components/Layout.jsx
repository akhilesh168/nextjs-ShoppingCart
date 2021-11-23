import Footer from "./Footer";
import NavbarWithProps from "./NavbarWithProps";

export default function Layout({ children }) {
  return (
    <>
      <NavbarWithProps />
      <main>{children}</main>
      <Footer />
    </>
  );
}
