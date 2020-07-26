import React, { useState } from "react";
import "./feed.scss";
import Button from "../../UI/Button";

const TweetPad = ({ handleCancel, handleSubmit }) => {
  const [tweet, setTweet] = useState("");
  const handleType = e => {
    if (e.target.value.length > 280) {
      return false;
    } else {
      setTweet(e.target.value);
    }
  };
  return (
    <>
      <div className="tweetpad">
        <textarea value={tweet} onChange={handleType} />
      </div>
      <div className="controls">
        <span className="moreText">
          {280 - tweet.length} <i>characters left</i>
        </span>
        <div>
          <Button
            onClick={() => {
              handleSubmit(tweet);
            }}
            className="tweetpad__button"
          >
            Tweet
          </Button>
          <Button
            onClick={() => {
              handleCancel();
            }}
            ui="flat"
            className="tweetpad__button"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default TweetPad;
