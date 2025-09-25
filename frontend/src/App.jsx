import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard";
import RoleBasedRoute from "./components/RoleBasedRoute";
import PublicRoute from "./components/PublicRoute";
import Users from "./pages/dashboard/superadmin/Users";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />{" "}
          </PublicRoute>
        }
      />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <RoleBasedRoute allowedRoles={["user", "admin", "superadmin"]}>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </RoleBasedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <RoleBasedRoute allowedRoles={["superadmin"]}>
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          </RoleBasedRoute>
        }
      />

      <Route path="/unauthorized" element={<h2>Access Denied</h2>} />
    </Routes>
  );
}

export default App;
