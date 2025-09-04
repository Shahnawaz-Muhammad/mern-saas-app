import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name} (Admin)</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
