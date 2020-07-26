import React, { useState, useContext, useEffect } from "react";
import "./feed.scss";
import Button from "../../UI/Button";
import SingleFeed from "./SingleFeed";
import TweetPad from "./TweetPad";
import { FirebaseContext } from "../../Firebase";
import { FaFolderMinus } from "react-icons/fa";
import Loading from "../../UI/Loading/Loading";
import uuid from "react-uuid";

const Feed = ({ history }) => {
  const { firebase, authUser } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);
  const showLoading = () => {
    setLoading(true);
  };
  const hideLoading = () => {
    setLoading(false);
  };
  const [toWrite, setToWrite] = useState(false);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (authUser) {
      showLoading();
      getTweets();
    }
  }, [authUser]);

  const getTweets = async () => {
    const userDetails = await firebase.db.doc(`/users/${authUser.uid}`).get();
    firebase.db
      .collection("tweets")
      .where("userId", "in", [...userDetails.data().following, authUser.uid])
      .orderBy("createdAt", "desc")
      .onSnapshot(handleSnapshot);
  };

  const handleSnapshot = snapshot => {
    const tweetsFb = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setTweets(tweetsFb);
    hideLoading();
  };
  const handleToWrite = () => {
    setToWrite(true);
  };
  const handleCancel = () => {
    setToWrite(false);
  };

  const handleSubmit = async message => {
    if (!authUser) {
      history.push("/login");
    } else {
      const tweet = {
        message,
        createdAt: new Date().toISOString(),
        createdBy: authUser.displayName,
        userId: authUser.uid
      };
      try {
        await firebase.db.collection("/tweets").add(tweet);
        setToWrite(false);
      } catch (err) {}
    }
  };

  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <div className="feed">
      {!toWrite && (
        <Button onClick={handleToWrite} className="feed__button" type="button">
          Write
        </Button>
      )}
      {toWrite && (
        <TweetPad handleCancel={handleCancel} handleSubmit={handleSubmit} />
      )}
      {tweets.length === 0 && !toWrite && (
        <div className="feed__no-tweets">
          <FaFolderMinus />
          <span>No tweets to display</span>
        </div>
      )}
      {tweets.length > 0 &&
        tweets.map(tweet => (
          <SingleFeed
            key={uuid()}
            message={tweet.message}
            time={tweet.createdAt}
            name={tweet.createdBy}
          />
        ))}
    </div>
  );
};

export default Feed;
