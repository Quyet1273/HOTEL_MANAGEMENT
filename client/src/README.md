# 🏨 HotelPro - Hệ Thống Quản Lý Khách Sạn

![HotelPro](https://img.shields.io/badge/HotelPro-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0.0-38bdf8)

> Hệ thống quản lý khách sạn hiện đại, chuyên nghiệp với giao diện tiếng Việt đầy đủ

---

## ✨ TÍNH NĂNG CHÍNH

### 🎯 **12 Màn Hình Quản Lý**

1. **🔐 Đăng nhập/Đăng ký** - Authentication với phân quyền
2. **📊 Dashboard** - Tổng quan doanh thu, biểu đồ, thống kê
3. **🏠 Quản lý phòng** - Grid/List view, lọc theo trạng thái
4. **📅 Quản lý booking** - Đặt phòng, xem chi tiết, hủy booking
5. **✅ Nhận/Trả phòng** - Check-in/Check-out, xác nhận booking
6. **👥 Quản lý khách hàng** - Thông tin khách, lịch sử đặt phòng
7. **🍽️ Quản lý dịch vụ** - Thêm/sửa/xóa dịch vụ, Grid/List view
8. **👔 Quản lý nhân viên** - CRUD nhân viên, phân quyền
9. **🧹 Dọn dẹp phòng** - Quản lý housekeeping, trạng thái dọn phòng
10. **🛡️ Phân quyền** - Quản lý role & permissions
11. **👤 Hồ sơ cá nhân** - Cập nhật thông tin, đổi mật khẩu
12. **⚙️ Cài đặt** - Cấu hình hệ thống

---

## 🎨 THIẾT KẾ UI/UX

- ✅ **Giao diện hiện đại** với gradient và shadow effects
- ✅ **Màu sắc pastel** dễ nhìn (#EDF9FC - xanh nhạt)
- ✅ **Sidebar thu gọn** được
- ✅ **Toast notifications** thân thiện
- ✅ **Responsive** trên mọi thiết bị
- ✅ **Icon đẹp** từ Lucide React
- ✅ **Biểu đồ trực quan** với Recharts
- ✅ **Animation mượt mà**

---

## 🔐 PHÂN QUYỀN 4 CẤP

| Vai trò | Quyền truy cập |
|---------|---------------|
| **👑 Admin** | Toàn quyền tất cả chức năng |
| **👔 Manager** | Quản lý phòng, booking, dịch vụ |
| **👨‍💼 Receptionist** | Booking, check-in/out, dịch vụ |
| **🧹 Housekeeping** | Chỉ quản lý dọn dẹp phòng |

---

## 🚀 CÀI ĐẶT NHANH

### **Yêu cầu:**
- Node.js >= 18.0.0
- npm hoặc yarn

### **Các bước:**

```bash
# 1. Clone hoặc tải project
cd hotelpro

# 2. Cài đặt dependencies
npm install

# 3. Chạy development server
npm run dev

# 4. Mở trình duyệt
http://localhost:5173
```

### **Tài khoản demo:**
- **Admin:** `admin@hotel.com` (password: bất kỳ)
- **Manager:** `manager@hotel.com` (password: bất kỳ)
- **Receptionist:** `receptionist@hotel.com` (password: bất kỳ)
- **Housekeeping:** `housekeeping@hotel.com` (password: bất kỳ)

---

## 📂 CẤU TRÚC THỨ MỤC

```
hotelpro/
├── 📁 components/
│   ├── Dashboard.tsx              # Trang tổng quan
│   ├── RoomManagement.tsx         # Quản lý phòng
│   ├── BookingManagement.tsx      # Quản lý booking
│   ├── CheckInOut.tsx             # Nhận/trả phòng
│   ├── ServiceManagement.tsx      # Quản lý dịch vụ
│   ├── EmployeeManagement.tsx     # Quản lý nhân viên
│   ├── HousekeepingManagement.tsx # Dọn dẹp phòng
│   ├── RolePermissionManagement.tsx # Phân quyền
│   ├── GuestManagement.tsx        # Quản lý khách
│   ├── Login.tsx                  # Đăng nhập
│   ├── Register.tsx               # Đăng ký
│   ├── Profile.tsx                # Hồ sơ
│   ├── Settings.tsx               # Cài đặt
│   ├── mockData.ts                # Dữ liệu demo
│   ├── 📁 ui/                     # 60+ UI components
│   └── 📁 figma/                  # Components hỗ trợ
├── 📁 styles/
│   └── globals.css                # Tailwind CSS
├── App.tsx                        # Main component
├── main.tsx                       # Entry point
├── index.html                     # HTML template
├── vite.config.ts                 # Vite config
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies

```

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG

| Công nghệ | Version | Mục đích |
|-----------|---------|----------|
| **React** | 18.3.1 | UI Framework |
| **TypeScript** | 5.5.3 | Type Safety |
| **Vite** | 5.4.1 | Build Tool |
| **Tailwind CSS** | 4.0.0 | Styling |
| **Lucide React** | 0.400.0 | Icons |
| **Recharts** | 2.12.7 | Charts |
| **Sonner** | 2.0.3 | Toast Notifications |
| **React Hook Form** | 7.55.0 | Form Handling |

---

## 📊 LUỒNG NGHIỆP VỤ

```
📞 KHÁCH ĐẶT PHÒNG
    ↓
✅ NHÂN VIÊN XÁC NHẬN (Tab Đang chờ)
    ↓
🏨 KHÁCH CHECK-IN (Tab Nhận phòng)
    ↓
🍽️ THÊM DỊCH VỤ (Nước, giặt ủi, spa...)
    ↓
🚪 KHÁCH CHECK-OUT (Tab Trả phòng)
    ↓
💰 THANH TOÁN & IN HÓA ĐƠN
    ↓
🧹 DỌN DẸP PHÒNG (Housekeeping)
    ↓
✨ PHÒNG SẴN SÀNG CHO KHÁCH MỚI
```

---

## 📸 SCREENSHOTS

### Dashboard
- Biểu đồ doanh thu 6 tháng
- Thống kê phòng trống/đã đặt
- Top dịch vụ được sử dụng

### Quản lý phòng
- View mode: Grid & List
- Lọc theo: Tất cả/Trống/Đã đặt/Bảo trì
- Hình ảnh phòng đẹp từ Unsplash

### Nhận/Trả phòng
- 3 Tab: Đang chờ, Nhận phòng, Trả phòng
- Toast notification thân thiện
- Hiển thị yêu cầu đặc biệt

---

## 🔧 SCRIPTS

```bash
# Development
npm run dev          # Chạy dev server

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build

# Lint
npm run lint         # Check code quality
```

---

## 📦 BUILD & DEPLOY

### **Build for production:**
```bash
npm run build
```

**Output:** Thư mục `dist/` chứa file đã optimize

### **Deploy options:**
- ✅ Vercel (khuyến nghị)
- ✅ Netlify
- ✅ GitHub Pages
- ✅ VPS/Server riêng

---

## 🌟 TÍNH NĂNG NỔI BẬT

### 1. **Mock Data đầy đủ**
- 13 phòng với hình ảnh thật
- 5 khách hàng Việt Nam
- 14 booking mẫu
- 5 dịch vụ với giá VNĐ

### 2. **Thông báo Toast**
- Hiển thị giữa màn hình
- Tự động đóng
- Màu sắc phù hợp (success/error)
- Văn bản tiếng Việt ngắn gọn

### 3. **Responsive Design**
- Desktop: Full layout với sidebar
- Tablet: Sidebar thu gọn
- Mobile: Navigation drawer

### 4. **Check-in/Check-out**
- Mặc định: Check-in 14:00, Check-out 12:00
- Hiển thị yêu cầu đặc biệt
- Tìm kiếm theo mã/tên/số phòng

---

## 🎯 ROADMAP TƯƠNG LAI

- [ ] Kết nối Backend API (Node.js/Express)
- [ ] Database (MySQL/PostgreSQL)
- [ ] Authentication thật (JWT)
- [ ] Email notifications
- [ ] Export báo cáo PDF/Excel
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app (React Native)

---

## 🐛 BÁO LỖI

Nếu phát hiện lỗi, vui lòng tạo issue với thông tin:
- Mô tả lỗi
- Bước tái hiện
- Screenshot
- Browser/OS version

---

## 📄 LICENSE

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại

---

## 👨‍💻 TÁC GIẢ

**HotelPro Development Team**

---

## 🙏 CẢM ƠN

Cảm ơn bạn đã sử dụng HotelPro! 

**⭐ Nếu thấy hữu ích, hãy cho project một star nhé!**

---

## 📞 HỖ TRỢ

Cần hỗ trợ? Xem [SETUP.md](./SETUP.md) để được hướng dẫn chi tiết!

---

**Made with ❤️ in Vietnam 🇻🇳**
