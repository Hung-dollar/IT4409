# React CRUD – Quản lý người dùng

## Chạy ứng dụng trên máy
1. Cài Node.js bản LTS.
2. Mở terminal tại thư mục dự án.
3. Chạy `npm install`.
4. Chạy `npm run dev` rồi mở URL mà Vite in ra (thường là `http://localhost:5173`).

## Build kiểm tra trước khi triển khai
```bash
npm run build
npm run preview
```
Bản triển khai tĩnh được tạo trong thư mục `dist/`.

## Đưa ứng dụng lên host miễn phí (Netlify)
1. Đẩy toàn bộ thư mục dự án lên một repository GitHub.
2. Trong Netlify, chọn **Add new site → Import an existing project** và kết nối repository.
3. Build command: `npm run build`; Publish directory: `dist`.
4. Nhấn Deploy, chờ trạng thái Published và mở URL `https://....netlify.app` để kiểm tra.
5. Điền URL triển khai vào phần “Link trang kết quả” trong báo cáo.

Ứng dụng tải dữ liệu ban đầu từ JSONPlaceholder, nên cần Internet. Các thao tác thêm/sửa/xóa thực hiện ở state phía trình duyệt, không được lưu bền vững lên API.
