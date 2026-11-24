import React from "react";
export default function SearchForm({ value, onChangeValue }) {
  return (
    <label className="search-control">
      <span>Tìm kiếm người dùng</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChangeValue(event.target.value)}
        placeholder="Nhập họ tên hoặc username..."
        aria-label="Tìm theo họ tên hoặc username"
      />
    </label>
  );
}