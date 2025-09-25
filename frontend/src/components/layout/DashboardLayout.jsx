import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout({ children }) {
  const {user} = useAuth()
  
  return (
    <div className="min-h-screen flex w-full bg-gradient-subtle">
      <Sidebar role={user?.role}/>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
