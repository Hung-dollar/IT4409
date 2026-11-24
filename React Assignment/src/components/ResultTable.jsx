import React, { useEffect, useMemo, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`Máy chủ trả về HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (active) setUsers(data);
      })
      .catch(() => {
        if (active) setError("Không tải được dữ liệu mẫu. Hãy kiểm tra kết nối mạng rồi tải lại trang.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  // App gửi user mới xuống đây. Cập nhật mảng bất biến, sau đó báo App xóa tín hiệu.
  useEffect(() => {
    if (!user) return;
    setUsers((previous) => {
      const nextId = previous.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
      return [...previous, { ...user, id: nextId }];
    });
    onAdded();
  }, [user, onAdded]);

  const filteredUsers = useMemo(() => {
    const query = keyword.trim().toLocaleLowerCase();
    if (!query) return users;
    return users.filter((item) =>
      (item.name || "").toLocaleLowerCase().includes(query) ||
      (item.username || "").toLocaleLowerCase().includes(query)
    );
  }, [users, keyword]);

  function startEditing(item) {
    setEditing({
      ...item,
      address: { street: "", suite: "", city: "", ...(item.address || {}) }
    });
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    if (["street", "suite", "city"].includes(name)) {
      setEditing((current) => ({
        ...current,
        address: { ...current.address, [name]: value }
      }));
    } else {
      setEditing((current) => ({ ...current, [name]: value }));
    }
  }

  function saveEdit(event) {
    event.preventDefault();
    if (!editing.name.trim() || !editing.username.trim()) {
      window.alert("Họ tên và Username không được để trống.");
      return;
    }
    setUsers((previous) => previous.map((item) => item.id === editing.id ? editing : item));
    setEditing(null);
  }

  function removeUser(id) {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    setUsers((previous) => previous.filter((item) => item.id !== id));
  }

  if (loading) return <section className="state-panel"><span className="spinner" />Đang tải danh sách người dùng...</section>;
  if (error) return <section className="state-panel error-panel"><strong>Có lỗi xảy ra</strong><p>{error}</p><button className="button button-quiet" onClick={() => window.location.reload()}>Thử lại</button></section>;

  return (
    <section className="table-card">
      <div className="table-heading">
        <div>
          <h2>Danh sách người dùng</h2>
          <p>Dữ liệu hiển thị: {filteredUsers.length} / {users.length} người dùng</p>
        </div>
        <span className="count-pill">{filteredUsers.length} kết quả</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>ID</th><th>Họ tên</th><th>Username</th><th>Email</th><th>Địa chỉ</th><th>Số điện thoại</th><th>Thao tác</th></tr>
          </thead>
          <tbody>
            {filteredUsers.map((item) => (
              <tr key={item.id}>
                <td className="id-cell">{item.id}</td>
                <td><strong>{item.name || "—"}</strong></td>
                <td><span className="username">@{item.username || "—"}</span></td>
                <td>{item.email || "—"}</td>
                <td>{[item.address?.street, item.address?.suite, item.address?.city].filter(Boolean).join(", ") || "—"}</td>
                <td>{item.phone || "—"}</td>
                <td><div className="row-actions">
                  <button className="button button-small button-quiet" onClick={() => startEditing(item)}>Sửa</button>
                  <button className="button button-small button-danger" onClick={() => removeUser(item.id)}>Xóa</button>
                </div></td>
              </tr>
            ))}
            {filteredUsers.length === 0 && <tr><td colSpan="7" className="empty-cell">Không tìm thấy người dùng phù hợp.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setEditing(null);
        }}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="edit-title">
            <div className="modal-heading">
              <div><p className="eyebrow">ID: {editing.id}</p><h2 id="edit-title">Chỉnh sửa người dùng</h2></div>
              <button className="icon-button" type="button" onClick={() => setEditing(null)} aria-label="Đóng">×</button>
            </div>
            <form onSubmit={saveEdit}>
              <div className="form-grid">
                <label>Họ tên *<input name="name" value={editing.name || ""} onChange={handleEditChange} required /></label>
                <label>Username *<input name="username" value={editing.username || ""} onChange={handleEditChange} required /></label>
                <label>Email<input name="email" type="email" value={editing.email || ""} onChange={handleEditChange} /></label>
                <label>Số điện thoại<input name="phone" value={editing.phone || ""} onChange={handleEditChange} /></label>
                <label>Đường<input name="street" value={editing.address.street || ""} onChange={handleEditChange} /></label>
                <label>Căn hộ / Phòng<input name="suite" value={editing.address.suite || ""} onChange={handleEditChange} /></label>
                <label>Thành phố<input name="city" value={editing.address.city || ""} onChange={handleEditChange} /></label>
                <label>Website<input name="website" value={editing.website || ""} onChange={handleEditChange} /></label>
              </div>
              <div className="modal-actions">
                <button className="button button-quiet" type="button" onClick={() => setEditing(null)}>Hủy</button>
                <button className="button button-primary" type="submit">Lưu thay đổi</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}