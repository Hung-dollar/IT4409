import React, { useState } from "react";

const emptyUser = () => ({
  name: "",
  username: "",
  email: "",
  address: { street: "", suite: "", city: "" },
  phone: "",
  website: ""
});

export default function AddUser({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(emptyUser);

  function handleChange(event) {
    const { name, value } = event.target;
    if (["street", "suite", "city"].includes(name)) {
      setUser((current) => ({
        ...current,
        address: { ...current.address, [name]: value }
      }));
    } else {
      setUser((current) => ({ ...current, [name]: value }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!user.name.trim() || !user.username.trim()) {
      window.alert("Vui lòng nhập Họ tên và Username.");
      return;
    }
    onAdd({ ...user, name: user.name.trim(), username: user.username.trim() });
    setUser(emptyUser());
    setIsOpen(false);
  }

  return (
    <>
      <button className="button button-primary add-trigger" onClick={() => setIsOpen(true)}>
        <span aria-hidden="true">＋</span> Thêm người dùng
      </button>

      {isOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="add-title">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">THÔNG TIN TÀI KHOẢN</p>
                <h2 id="add-title">Thêm người dùng</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setIsOpen(false)} aria-label="Đóng">×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>Họ tên *<input name="name" value={user.name} onChange={handleChange} required /></label>
                <label>Username *<input name="username" value={user.username} onChange={handleChange} required /></label>
                <label>Email<input name="email" type="email" value={user.email} onChange={handleChange} /></label>
                <label>Số điện thoại<input name="phone" value={user.phone} onChange={handleChange} /></label>
                <label>Đường<input name="street" value={user.address.street} onChange={handleChange} /></label>
                <label>Căn hộ / Phòng<input name="suite" value={user.address.suite} onChange={handleChange} /></label>
                <label>Thành phố<input name="city" value={user.address.city} onChange={handleChange} /></label>
                <label>Website<input name="website" value={user.website} onChange={handleChange} /></label>
              </div>
              <p className="form-note">Các trường có dấu * là bắt buộc.</p>
              <div className="modal-actions">
                <button className="button button-quiet" type="button" onClick={() => setIsOpen(false)}>Hủy</button>
                <button className="button button-primary" type="submit">Lưu người dùng</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}