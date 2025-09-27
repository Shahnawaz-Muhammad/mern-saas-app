import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers, updateUserRole } from "../../../api/userApi";

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true); // start loader
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setIsLoading(false); // stop loader
      }
    };
    if (user?.role === "superadmin") {
      fetchUsers();
    }
  }, [user]);

  if (!user || user.role !== "superadmin") {
    return <p>Access denied: only Superadmins can view this page.</p>;
  }

  const handleEdit = (u) => {
    setEditingUserId(u._id);
    setFormData({ role: u.role });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      await updateUserRole(id, formData.role);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, role: formData.role } : u
        )
      );
      setEditingUserId(null);
    } catch (err) {
      console.error("Failed to update role", err);
      alert("Error updating role");
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setFormData({});
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {isLoading ? (
        <p className="text-gray-600">Loading ...</p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">
                  {editingUserId === u._id ? (
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>

                <td className="p-2 border">
                  {editingUserId === u._id ? (
                    <>
                      <button
                        onClick={() => handleSave(u._id)}
                        className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-2 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(u)}
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
