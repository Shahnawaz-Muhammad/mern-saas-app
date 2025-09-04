import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  const handleLogin = (role) => {
    login(role);
    navigate(role === "admin" ? "/admin" : "/dashboard", { replace: true });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => handleLogin("user")}>Login as User</button>
      <button onClick={() => handleLogin("admin")}>Login as Admin</button>
    </div>
  );
}
