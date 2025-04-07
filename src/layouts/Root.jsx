import { Outlet } from "react-router-dom";
import Nav from "../components/shared/Nav/Nav";
import Footer from "../components/shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Nav />

      <div className="max-w-7xl mx-auto w-11/12">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
