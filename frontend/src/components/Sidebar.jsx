import { useNavigate, NavLink, Link } from "react-router-dom";

import {
  FaChartBar,
  FaShoppingCart,
  FaMoneyBill,
  FaTruck,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
<NavLink
  to="/settings"
  className="flex items-center gap-3 hover:text-blue-400"
>
  <FaCog />
  Settings
</NavLink>
  return (
    <div className="w-64 bg-gray-900 h-screen text-white p-5">

      <Link
        to="/dashboard"
        className="text-4xl font-bold text-white block mb-10"
      >
        BIKKINA
      </Link>

      <nav className="space-y-4">

        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaChartBar />
          Dashboard
        </NavLink>

        <NavLink
          to="/purchases"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaShoppingCart />
          Purchases
        </NavLink>

        <NavLink
          to="/sales"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaMoneyBill />
          Sales
        </NavLink>

        <NavLink
          to="/expenses"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaTruck />
          Expenses
        </NavLink>

        <NavLink
          to="/reports"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaFileAlt />
          Reports
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 mt-12"
        >
          <FaSignOutAlt />
          Logout
        </button>
        <NavLink
  to="/settings"
  className="flex items-center gap-3 hover:text-blue-400"
>
  <FaCog />
  Settings
</NavLink>

      </nav>

    </div>
  );
}

export default Sidebar;