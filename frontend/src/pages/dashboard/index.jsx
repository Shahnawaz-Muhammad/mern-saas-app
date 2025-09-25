// src/pages/dashboard/Dashboard.jsx
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {user.name} ({user?.role})
      </h1>

      {user.role === "superadmin" && (
        <div className="grid grid-cols-3 gap-6">
          <Card title="Total Restaurants" value="120" />
          <Card title="Total Users" value="8,432" />
          <Card title="Revenue" value="$94,000" />
        </div>
      )}

      {user.role === "admin" && (
        <div className="grid grid-cols-2 gap-6">
          <Card title="Pending Orders" value="42" />
          <Card title="Active Menu Items" value="58" />
        </div>
      )}

      {user.role === "user" && (
        <div>
          <Card title="My Orders" value="12" />
          <Card title="Loyalty Points" value="250" />
        </div>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
