import React from "react";
import "./menu-item.scss";
const MenuItem = ({ title, imageUrl, size }) => (
  <div
    style={{ backgroundImage: `url(${imageUrl})` }}
    className={`${size} menu-item`}
  >
    <div
      className="background-image"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
    <div className="content">
      <div className="title">{title}</div>
      <div className="subtitle">Shop now</div>
    </div>
  </div>
);

export default MenuItem;
