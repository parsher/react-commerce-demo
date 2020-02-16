import React from "react";
import { withRouter } from "react-router-dom";

import "./menu-item.scss";
const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
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

export default withRouter(MenuItem); // provide history, match... router props
