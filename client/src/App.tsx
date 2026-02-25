import { useState } from "react";
import { authApi }from "./lib/authApi";
import { Dashboard } from "./components/Dashboard";
import { RoomManagement } from "./components/RoomManagement";
import { BookingManagement } from "./components/BookingManagement";
import { GuestManagement } from "./components/GuestManagement";
import { CheckInOut } from "./components/CheckInOut";
import { Settings } from "./components/Settings";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ServiceManagement } from "./components/ServiceManagement";
import { EmployeeManagement } from "./components/EmployeeManagement";
import { HousekeepingManagement } from "./components/HousekeepingManagement";
import { RolePermissionManagement } from "./components/RolePermissionManagement";
import {
  Hotel,
  Bed,
  Calendar,
  Users,
  LogIn,
  Settings as SettingsIcon,
  UserCircle,
  LogOut,
  Menu,
  X,
  Package,
  UsersIcon,
  Sparkles,
  Shield,
} from "lucide-react";
import { Toaster } from "./components/ui/sonner";

type Tab =
  | "dashboard"
  | "rooms"
  | "bookings"
  | "guests"
  | "checkinout"
  | "services"
  | "employees"
  | "housekeeping"
  | "settings"
  | "profile"
  | "roles";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "Nguyễn Văn A",
    email: "admin@hotel.com",
    avatar:
      "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTExNDk1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    role: "admin" as
      | "admin"
      | "manager"
      | "receptionist"
      | "housekeeping",
  });
const handleLogin = async (email: string, password: string) => {
  try {
    const res = await authApi.login({ email, password })
    localStorage.setItem("access_token", res.data.accessToken)
    setIsAuthenticated(true)
  } catch (err) {
    console.error(err)
  }
}

const handleRegister = async (payload: {
  fullName: string
  email: string
  phone: string
  address?: string
  password: string
}) => {
  try {
    const res = await authApi.register({
      name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      password: payload.password,
      confirmPassword: payload.password,
    })

    console.log(res.data.message)
    // toast.success(res.data.message)
    setShowLogin(true)

  } catch (err: any) {
    console.error(err)

    const message =
      err.response?.data?.message || "Đăng ký thất bại"

    // toast.error(message)
    alert(message)
  }
}


  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
    setActiveTab("dashboard");
  };

  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setShowLogin(false)}
        />
      );
    } else {
      return (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setShowLogin(true)}
        />
      );
    }
  }

  // Role-based menu
  const getMenuTabs = () => {
    const allTabs = [
      {
        id: "dashboard" as Tab,
        label: "Tổng Quan",
        icon: Hotel,
        roles: ["admin", "manager"],
      },
      {
        id: "rooms" as Tab,
        label: "Phòng",
        icon: Bed,
        roles: ["admin", "manager", "receptionist"],
      },
      {
        id: "bookings" as Tab,
        label: "Đặt Phòng",
        icon: Calendar,
        roles: ["admin", "manager", "receptionist"],
      },
      {
        id: "guests" as Tab,
        label: "Khách Hàng",
        icon: Users,
        roles: ["admin", "manager", "receptionist"],
      },
      {
        id: "checkinout" as Tab,
        label: "Nhận/Trả Phòng",
        icon: LogIn,
        roles: ["admin", "manager", "receptionist"],
      },
      {
        id: "services" as Tab,
        label: "Dịch Vụ",
        icon: Sparkles,
        roles: ["admin", "manager", "receptionist"],
      },
      {
        id: "employees" as Tab,
        label: "Nhân Viên",
        icon: UsersIcon,
        roles: ["admin", "manager"],
      },
      {
        id: "roles" as Tab,
        label: "Phân Quyền",
        icon: Shield,
        roles: ["admin"],
      },
      {
        id: "housekeeping" as Tab,
        label: "Buồng Phòng",
        icon: Package,
        roles: ["admin", "manager", "housekeeping"],
      },
    ];

    return allTabs.filter((tab) =>
      tab.roles.includes(currentUser.role),
    );
  };

  const mainMenuTabs = getMenuTabs();

  const bottomMenuTabs = [
    { id: "profile" as Tab, label: "Hồ Sơ", icon: UserCircle },
    {
      id: "settings" as Tab,
      label: "Cài Đặt",
      icon: SettingsIcon,
    },
  ];

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-72" : "w-20"} bg-[#D1F4FA] border-r border-gray-200/50 shadow-xl transition-all duration-300 flex flex-col`}
      >
        {/* Logo & Toggle */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            {isSidebarOpen ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Hotel className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">
                      HotelPro
                    </h1>
                    <p className="text-xs text-gray-500">
                      Quản lý khách sạn
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors mx-auto"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {mainMenuTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  title={!isSidebarOpen ? tab.label : ""}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {isSidebarOpen && (
                    <span className="font-medium">
                      {tab.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200/50">
          <div className="space-y-1 mb-4">
            {bottomMenuTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  title={!isSidebarOpen ? tab.label : ""}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {isSidebarOpen && (
                    <span className="font-medium">
                      {tab.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* User Profile */}
          {isSidebarOpen && (
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 shadow-md"
                  />
                ) : (
                  <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium border border-red-200"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>
          )}

          {!isSidebarOpen && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Page Content */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "rooms" && <RoomManagement />}
            {activeTab === "bookings" && <BookingManagement />}
            {activeTab === "guests" && <GuestManagement />}
            {activeTab === "checkinout" && <CheckInOut />}
            {activeTab === "services" && <ServiceManagement />}
            {activeTab === "employees" && (
              <EmployeeManagement />
            )}
            {activeTab === "housekeeping" && (
              <HousekeepingManagement />
            )}
            {activeTab === "settings" && <Settings />}
            {activeTab === "profile" && (
              <Profile
                user={currentUser}
                onUpdateUser={setCurrentUser}
              />
            )}
            {activeTab === "roles" && (
              <RolePermissionManagement />
            )}
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}