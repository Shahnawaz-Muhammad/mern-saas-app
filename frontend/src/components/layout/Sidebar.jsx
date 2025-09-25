import { Home, LayoutDashboard, Settings, Users, Utensils } from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = {
  superadmin: [
    { name: "Dashboard", icon: <Home />, path: "/dashboard" },
    { name: "Users", icon: <Users />, path: "/users"}
    // { name: "Restaurants", icon: <Utensils />, path: "/superadmin/restaurants" },
    // { name: "Users", icon: <Users />, path: "/superadmin/users" },
    // { name: "Settings", icon: <Settings />, path: "/superadmin/settings" },
  ],
  admin: [{ name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" }],
  user: [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
    {
      name: "Restaurants",
      icon: <Utensils />,
    },
    { name: "Users", icon: <Users /> },
    { name: "Settings", icon: <Settings /> },
  ],
  //   restaurant: [
  //     { name: "Dashboard", icon: <Home />, path: "/restaurant" },
  //     { name: "Orders", icon: <ShoppingCart />, path: "/restaurant/orders" },
  //   ],
  //   customer: [
  //     { name: "Home", icon: <Home />, path: "/" },
  //     { name: "My Orders", icon: <ShoppingCart />, path: "/orders" },
  //   ],
};

export default function Sidebar({ role }) {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">FoodSaaS</h2>
      <ul>
        {menuItems[role]?.map((item) => (
          <li key={item.name} className="mb-4">
            <NavLink
              to={item.path}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
            >
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
