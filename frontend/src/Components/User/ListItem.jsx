import React from "react";

export default function ListItem({ name, gender, role }) {
  return (
    <div className="card">
      <span>{name}</span> <span>{gender}</span> <span>{role}</span>{" "}
    </div>
  );
}
