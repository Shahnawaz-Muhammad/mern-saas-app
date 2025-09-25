import { MessageCircle, Wifi, WifiOff, QrCode, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">WhatsApp Marketing</h1>
            <p className="text-sm text-muted-foreground">
              Professional Dashboard
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            className="border border-gray-600 p-2 rounded-lg cursor-pointer hover:scale-110 transition-all hover:bg-gray-300"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 text-status-connected" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
