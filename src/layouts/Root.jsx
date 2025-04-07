import { Outlet } from "react-router-dom";
import Nav from "../components/shared/Nav/Nav";
import Footer from "../components/shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Nav />

      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
