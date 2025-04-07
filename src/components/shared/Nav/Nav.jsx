import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-bold">BCC Client</div>
        <nav className="space-x-4">
          <NavLink to="/" className="hover:text-gray-400">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-gray-400">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:text-gray-400">
            Contact
          </NavLink>
          <NavLink to="/login" className="hover:text-gray-400">
            Login
          </NavLink>
          <NavLink to="/register" className="hover:text-gray-400">
            Register
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
