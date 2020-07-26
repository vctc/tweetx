import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./feed.scss";

const SingleFeed = ({ noBorder, message, time, name }) => {
  return (
    <div className={`single__feed__container ${noBorder ? "no-border" : ""}`}>
      <div className="single__feed">
        <span className="single__feed__avatar" />

        <span className="single__feed__name">{name}</span>
        <span className="single__feed__time">
          {formatDistanceToNow(new Date(time))} ago
        </span>
      </div>
      <p className="single__feed__container__para">{message}</p>
    </div>
  );
};

export default SingleFeed;
