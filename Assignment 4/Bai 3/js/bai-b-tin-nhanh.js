/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------
const oTimKiem = document.getElementById("o-tim-kiem");
const danhSach = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem() {
	const tatCa = danhSach.querySelectorAll("li");
	const dangHien = danhSach.querySelectorAll("li:not(.an)");
	boDem.textContent = `Đang hiển thị ${dangHien.length}/${tatCa.length} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value;
	const tuKhoaThuong = tuKhoa.toLowerCase();
	let soKhop = 0;

	for (const muc of danhSach.querySelectorAll("li")) {
		const vanBan = muc.querySelector("h3").textContent + " " + muc.querySelector("p").textContent;
		const khop = vanBan.toLowerCase().includes(tuKhoaThuong); // từ khoá rỗng -> luôn khớp
		muc.classList.toggle("an", !khop);
		if (khop) {
			soKhop++;
		}
	}

	if (soKhop === 0) {
		// textContent -> từ khoá hiện nguyên văn, không bị diễn giải thành HTML
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
		khongThay.classList.remove("an");
	} else {
		khongThay.classList.add("an");
	}
	capNhatBoDem();
}
oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
// (event delegation: tin đăng sau này cũng dùng được mà không phải đăng ký thêm)
danhSach.addEventListener("click", (e) => {
	if (!e.target.classList.contains("more")) {
		return; // bấm vào tiêu đề, đoạn văn, khoảng trống... -> không làm gì
	}
	const nut = e.target;
	const doan = nut.parentNode.querySelector("p");
	const dangMo = doan.classList.toggle("day-du");
	nut.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;

	if (tieuDe.trim() === "" || noiDung.trim() === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const muc = document.createElement("li");
	const ngay = document.createElement("span");
	const h3 = document.createElement("h3");
	const p = document.createElement("p");
	const nut = document.createElement("button");

	ngay.className = "time";
	ngay.textContent = homNay();
	h3.textContent = tieuDe;     // textContent: hiện nguyên văn, không chạy <img>, <script>
	p.textContent = noiDung;
	nut.type = "button";
	nut.className = "more";
	nut.textContent = "Read more >>";

	muc.append(ngay, h3, p, nut);
	danhSach.prepend(muc);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";

	locTin(); // áp dụng bộ lọc đang gõ cho tin mới + cập nhật bộ đếm
});

// Bộ đếm đúng ngay khi tải trang.
locTin();
