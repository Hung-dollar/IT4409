import React, { useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import AddUser from "./components/AddUser.jsx";
import ResultTable from "./components/ResultTable.jsx";

export default function App() {
  // State được đặt tại cha vì cả SearchForm/AddUser và ResultTable cần phối hợp.
  const [kw, setKeyword] = useState("");
  const [newUser, setNewUser] = useState(null);

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">REACT CRUD · BÀI THỰC HÀNH</p>
          <h1>Quản lý người dùng</h1>
          <p className="subtitle">Tìm kiếm, thêm, chỉnh sửa và xóa người dùng trong một giao diện.</p>
        </div>
        <span className="header-mark" aria-hidden="true">RU</span>
      </header>

      <section className="toolbar" aria-label="Công cụ quản lý người dùng">
        <SearchForm value={kw} onChangeValue={setKeyword} />
        <AddUser onAdd={setNewUser} />
      </section>

      <ResultTable keyword={kw} user={newUser} onAdded={() => setNewUser(null)} />
      <footer>React · useState · useEffect · Props · State Lifting</footer>
    </main>
  );
}