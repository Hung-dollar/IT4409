# Tài liệu giải thích Design Choices

Áp dụng cho 3 file mới/refactor: `register.html`, `media.html`, `index_new.html`
(dựa trên template gốc **Blakletterpress**, tái sử dụng `css/style.css` và bộ ảnh/font có sẵn).

## 1. Nguyên tắc chung

- **Không tạo layout riêng.** Cả 3 trang đều giữ nguyên khung `#page > #header + #contents(#main + #sidebar) + #footer` giống `index.html`, `about.html`, `news.html`, `blog.html`. Người dùng chuyển trang sẽ không thấy "giật" vì menu, sidebar, footer luôn ở đúng vị trí quen thuộc.
- **Không sửa CSS gốc.** Mọi id/class hiện có (`#main`, `#sidebar`, `#navigation`, `#posts`, `#connect`, `#featured`...) được giữ nguyên 100%. CSS mới chỉ được **thêm vào cuối** `css/style.css`, không đụng tới rule cũ → không có rủi ro vỡ layout các trang hiện tại.
- **Tối giản (minimalist):** không thêm hiệu ứng, animation, màu sắc lạ. Bảng màu, font chữ dùng lại đúng những gì template gốc đã có (nâu be `#7e501c`, `#525252`, nền `#fdf6ea`...), chỉ bổ sung 1-2 màu chức năng (xanh lá cho nút submit, đỏ nhạt cho dấu `*` bắt buộc) để không phá vỡ tổng thể.

## 2. register.html — Trang đăng ký

| Quyết định | Lý do |
|---|---|
| Dùng `<fieldset>` + `<legend>` để nhóm 3 khối: *Thông tin tài khoản*, *Thông tin cá nhân*, *Tuỳ chọn nhận tin* | Đúng ngữ nghĩa HTML cho form dài, giúp người dùng (và trình đọc màn hình) dễ theo dõi, khớp với bản thiết kế minh họa. |
| Dùng đúng kiểu `<input>` theo dữ liệu: `email`, `password`, `tel`, `date`, `number` thay vì `text` cho tất cả | Trình duyệt tự bật bàn phím phù hợp (số, ngày...) và tự validate định dạng cơ bản (ví dụ email phải có `@`) mà không cần viết JavaScript. |
| Thêm `required`, `minlength="8"`, `pattern="0[0-9]{9}"` | Thực hiện đúng ràng buộc trong bản mô tả ("mật khẩu tối thiểu 8 ký tự", "SĐT 10 số bắt đầu bằng 0") bằng HTML5 validation thuần, không cần JS. |
| 2 nút `Đăng ký` (`type="submit"`) và `Nhập lại` (`type="reset"`) | Đúng như minh họa, dùng `type="reset"` có sẵn của HTML để xoá trắng form thay vì phải viết script riêng. |
| `action="#"` | Đây là trang tĩnh minh họa, chưa có backend xử lý — để `#` tránh gây hiểu nhầm là form đã submit được lên server thật. |
| CSS form mới đặt trong khối riêng, có comment phân cách rõ ràng trong `style.css` | Dễ tìm, dễ maintain, không lẫn với CSS gốc của template. |

## 3. media.html — Trang đa phương tiện & semantic HTML5

| Quyết định | Lý do |
|---|---|
| `<article class="body">` bọc toàn bộ nội dung | Đây là một bài viết độc lập (có thể đứng riêng, chia sẻ, đọc lại), đúng ngữ nghĩa `<article>` hơn `<div class="body">` gốc. |
| Mỗi phần con dùng `<section>` + `<h2>` riêng (Giới thiệu, Video, Podcast, Địa điểm, Hình ảnh) | Mỗi phần đều có chủ đề & tiêu đề riêng biệt — dùng `<section>` giúp cấu trúc tài liệu rõ ràng, hỗ trợ SEO (search engine hiểu bố cục nội dung) và outline/accessibility. |
| `<figure>` + `<figcaption>` cho mọi ảnh có chú thích | Nhóm ảnh và caption thành một khối ngữ nghĩa duy nhất, thay vì `<img>` + `<p>` rời rạc như minh họa gốc. |
| `<time datetime="2026-04-22">` cho ngày đăng | Cho máy (search engine, RSS reader) đọc được ngày dạng chuẩn ISO, trong khi người dùng vẫn thấy `22/04/2026` quen thuộc. |
| `<video controls poster="...">` và `<audio controls>` | Đây là 2 thẻ HTML5 media chuẩn, không cần plugin (Flash) như các template cũ. `poster` cho video giúp trang không bị "trống" khi video chưa tải/chưa có file thật. |
| `<iframe>` nhúng Google Maps qua `output=embed` | Không cần API key, không cần JavaScript, chỉ 1 dòng HTML — phù hợp yêu cầu "cơ bản" của bài tập. |
| Không tạo trang riêng ngoài khung layout cũ | Sidebar/nav/footer giữ nguyên như các trang khác — đúng yêu cầu "Không dựng một trang có layout riêng". |

> **Lưu ý:** `media/intro.mp4` và `media/podcast.mp3` là **đường dẫn minh họa** (file media thật chưa có trong bộ tài nguyên). Khi triển khai thật, chỉ cần thay đường dẫn `src` trỏ tới file video/audio thật là chạy được ngay, không cần sửa cấu trúc HTML.

## 4. index_new.html — Refactor sang semantic HTML5

Mục tiêu: **giữ nguyên 100% bố cục & nội dung** của `index.html`, chỉ đổi *tên thẻ bao ngoài* để cải thiện SEO/accessibility cơ bản.

| Thẻ cũ | Thẻ mới | Lý do |
|---|---|---|
| `<div id="header">` | `<header id="header">` | Đây đúng là phần đầu trang (logo, slogan, tìm kiếm). |
| `<div id="main">` | `<main id="main">` | Nội dung chính, duy nhất của trang. |
| `<div class="body">` (trong #main) | `<article class="body">` | Là một bài giới thiệu độc lập, có thể đứng riêng. |
| `<div id="sidebar">` | `<aside id="sidebar">` | Nội dung phụ, liên quan nhưng tách biệt với nội dung chính. |
| `<div id="navigation">` | `<nav id="navigation">` | Khối menu điều hướng chính. |
| `<div class="section">` (×2, quanh #connect, #posts) | `<section class="section">` | Mỗi khối là một phần nội dung có chủ đề riêng trong sidebar. |
| `<div id="footer">` | `<footer id="footer">` | Phần chân trang, thông tin bản quyền. |

- **Vì sao không đổi `#contents`, `#gallery`, `#posts`, `#connect`?** Đây là các `<div>` thuần làm nhiệm vụ **bố cục/khung chứa** (layout wrapper, cần cho CSS float/background sprite), không mang ý nghĩa nội dung riêng biệt để chọn một thẻ semantic phù hợp hơn `<div>` — đổi không mang lại lợi ích, chỉ rủi ro thêm.
- **Vì sao không đổi id/class?** Vì `css/style.css` chọn phần tử theo `id`/`class`, không theo tên thẻ (`#header`, `.body`...) — nên đổi tên thẻ mà giữ nguyên id/class thì CSS áp dụng lại y hệt, không cần sửa file CSS, không có rủi ro vỡ giao diện.
- **Thêm `<meta name="description">`**: cải thiện SEO cơ bản (kết quả tìm kiếm Google sẽ hiển thị mô tả rõ ràng thay vì tự lấy đoạn text ngẫu nhiên).

## 5. Kiểm thử đã thực hiện

- Validate cấu trúc HTML bằng `html5lib` (strict mode) — cả 3 file đều **parse không lỗi**.
- Render trực quan bằng `wkhtmltoimage` và so sánh với ảnh minh họa trong đề bài — bố cục khớp.
- So sánh ảnh chụp `index_new.html` với `index.html` gốc — nội dung/bố cục giống hệt nhau.
