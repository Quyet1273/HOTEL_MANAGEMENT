import { authApi } from "../lib/authApi";
import { useState, useEffect } from "react";
import { Hotel, EyeOff, Eye } from "lucide-react";

interface LoginProps {
  onLogin: (email: string, password: string) => void
  onSwitchToRegister: () => void
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    api: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Background images
  const backgroundImages = [
    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&w=1080",
    "https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?auto=format&w=1080",
    "https://images.unsplash.com/photo-1534612899740-55c821a90129?auto=format&w=1080",
    "https://images.unsplash.com/photo-1640108930193-76941e385e5e?auto=format&w=1080",
  ];

  // Auto change background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ================= VALIDATE =================
  const validateForm = () => {
    const newErrors = { email: "", password: "", api: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ================= SUBMIT LOGIN =================
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!validateForm()) return
  onLogin(email, password)


    try {
      setLoading(true);
      setErrors((prev) => ({ ...prev, api: "" }));

      const res = await authApi.login({
        email,
        password,
      });

      /**
       * Backend trả:
       * {
       *   accessToken,
       *   user
       * }
       * Refresh token đã nằm trong COOKIE (httpOnly)
       */
      localStorage.setItem("access_token", res.data.accessToken);

      // 👉 Sau này redirect dashboard / set auth context
      console.log("LOGIN SUCCESS:", res.data.user);
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        api:
          err?.response?.data?.message ||
          "Đăng nhập thất bại, vui lòng thử lại",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/80 via-blue-800/70 to-purple-900/80" />
        </div>
      ))}

      {/* Content */}
      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Hotel className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Hệ Thống Quản Lý Khách Sạn
          </h1>
          <p className="text-blue-100">Đăng nhập để tiếp tục</p>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.api && (
              <p className="text-sm text-red-600 text-center">{errors.api}</p>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>
            {/* <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl"
                onDoubleClick={() => setShowPassword((prev) => !prev)}
              /> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 font-semibold"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
