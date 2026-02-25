# 🏨 HƯỚNG DẪN CÀI ĐẶT HOTELPRO

## 📋 MỤC LỤC
1. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
2. [Cài đặt từ đầu](#cài-đặt-từ-đầu)
3. [Cấu trúc thư mục](#cấu-trúc-thư-mục)
4. [Chạy ứng dụng](#chạy-ứng-dụng)
5. [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)

---

## ✅ YÊU CẦU HỆ THỐNG

### Phần mềm cần cài đặt:
- **Node.js** version 18.0.0 trở lên
  - Tải tại: https://nodejs.org/
  - Kiểm tra: `node --version`
  
- **npm** hoặc **yarn**
  - npm đi kèm với Node.js
  - Kiểm tra: `npm --version`

- **Code Editor** (khuyến nghị Visual Studio Code)
  - Tải tại: https://code.visualstudio.com/

- **Git** (tùy chọn, để clone project)
  - Tải tại: https://git-scm.com/

---

## 🚀 CÀI ĐẶT TỪ ĐẦU

### **BƯỚC 1: Tạo thư mục project**

Mở Terminal/Command Prompt và chạy:

```bash
# Tạo thư mục mới
mkdir hotelpro
cd hotelpro

# Hoặc nếu bạn đã tải code về:
cd đường/dẫn/tới/hotelpro
```

---

### **BƯỚC 2: Khởi tạo package.json**

Tạo file `package.json` với nội dung sau (hoặc copy từ project):

```bash
# Tạo file package.json tự động
npm init -y
```

Sau đó **thay thế toàn bộ** nội dung file `package.json` bằng nội dung từ file `package.json` trong project này.

---

### **BƯỚC 3: Cài đặt dependencies**

Chạy lệnh sau để cài đặt tất cả package cần thiết:

```bash
npm install
```

**Thời gian:** Khoảng 2-5 phút tùy tốc độ mạng

**Kết quả:** Sẽ tạo thư mục `node_modules/` chứa tất cả thư viện

---

### **BƯỚC 4: Copy các file code**

Sao chép các file/folder sau vào thư mục project:

```
hotelpro/
├── App.tsx                          ✅ Copy
├── index.html                       ✅ Copy
├── vite.config.ts                   ✅ Copy
├── tsconfig.json                    ✅ Copy
├── components/                      ✅ Copy toàn bộ folder
├── styles/                          ✅ Copy toàn bộ folder
└── package.json                     ✅ Đã có từ bước 2
```

---

### **BƯỚC 5: Kiểm tra cấu trúc thư mục**

Đảm bảo cấu trúc như sau:

```
hotelpro/
├── 📁 node_modules/            (tự động tạo sau npm install)
├── 📁 components/
│   ├── Dashboard.tsx
│   ├── RoomManagement.tsx
│   ├── BookingManagement.tsx
│   ├── CheckInOut.tsx
│   ├── ServiceManagement.tsx
│   ├── EmployeeManagement.tsx
│   ├── HousekeepingManagement.tsx
│   ├── RolePermissionManagement.tsx
│   ├── GuestManagement.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Profile.tsx
│   ├── Settings.tsx
│   ├── BookingForm.tsx
│   ├── BookingDetail.tsx
│   ├── CheckoutInvoice.tsx
│   ├── mockData.ts
│   ├── 📁 ui/
│   │   ├── sonner.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ... (60+ components)
│   └── 📁 figma/
│       └── ImageWithFallback.tsx
├── 📁 styles/
│   └── globals.css
├── App.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── package-lock.json           (tự động tạo)
```

---

### **BƯỚC 6: Tạo file main.tsx**

Tạo file `main.tsx` trong thư mục gốc với nội dung:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

### **BƯỚC 7: Chạy ứng dụng**

Chạy lệnh sau để khởi động development server:

```bash
npm run dev
```

**Kết quả:**
```
  VITE v5.4.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### **BƯỚC 8: Mở trình duyệt**

Mở trình duyệt và truy cập:

```
http://localhost:5173
```

**Bạn sẽ thấy trang đăng nhập HotelPro! 🎉**

---

## 🎯 ĐĂNG NHẬP THỬ NGHIỆM

### Tài khoản Admin:
- **Email:** `admin@hotel.com`
- **Password:** (bất kỳ)

### Tài khoản Manager:
- **Email:** `manager@hotel.com`
- **Password:** (bất kỳ)

### Tài khoản Receptionist:
- **Email:** `receptionist@hotel.com`
- **Password:** (bất kỳ)

### Tài khoản Housekeeping:
- **Email:** `housekeeping@hotel.com`
- **Password:** (bất kỳ)

---

## 📦 BUILD CHO PRODUCTION

Khi muốn build ứng dụng để deploy:

```bash
# Build ứng dụng
npm run build

# Kết quả tạo thư mục dist/
# Deploy thư mục dist/ lên server
```

Xem preview build:
```bash
npm run preview
```

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### ❌ Lỗi: "command not found: npm"
**Nguyên nhân:** Chưa cài Node.js
**Giải pháp:** Tải và cài Node.js từ https://nodejs.org/

---

### ❌ Lỗi: "Cannot find module"
**Nguyên nhân:** Thiếu dependencies
**Giải pháp:** 
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Lỗi: "Port 5173 already in use"
**Nguyên nhân:** Cổng đang được sử dụng
**Giải pháp:**
```bash
# Dừng process đang chạy hoặc đổi port
npm run dev -- --port 3000
```

---

### ❌ Lỗi: Import paths không đúng
**Nguyên nhân:** Đường dẫn file sai
**Giải pháp:** Kiểm tra lại đường dẫn import trong các file .tsx

---

### ❌ Lỗi: "Cannot read property of undefined"
**Nguyên nhân:** Thiếu data hoặc component chưa load
**Giải pháp:** Kiểm tra file `mockData.ts` đã được import đúng

---

### ❌ Lỗi: Tailwind CSS không hoạt động
**Nguyên nhân:** Chưa import globals.css
**Giải pháp:** 
1. Kiểm tra `main.tsx` có dòng: `import './styles/globals.css'`
2. Kiểm tra file `styles/globals.css` tồn tại

---

## 🔧 CÔNG CỤ HỖ TRỢ

### VS Code Extensions khuyến nghị:
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Error Lens**
- **Prettier - Code formatter**
- **Auto Rename Tag**

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề khác, vui lòng kiểm tra:

1. ✅ Node.js version >= 18
2. ✅ Tất cả file đã được copy đầy đủ
3. ✅ `npm install` chạy thành công
4. ✅ Không có lỗi trong Console

---

## 🎉 HOÀN THÀNH!

Bây giờ bạn có thể:
- ✅ Khám phá các tính năng
- ✅ Tùy chỉnh giao diện
- ✅ Thêm chức năng mới
- ✅ Kết nối database thật
- ✅ Deploy lên server

**Chúc bạn phát triển thành công! 🚀**
