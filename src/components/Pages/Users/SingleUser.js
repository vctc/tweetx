import React, { useContext } from "react";
import Button from "../../UI/Button";
import "./users.scss";
import { FirebaseContext } from "../../Firebase";

const SingleUser = ({
  noBorder,
  name,
  userId,
  followers = [],
  following,
  followingCount
}) => {
  const { authUser, firebase } = useContext(FirebaseContext);

  const renderFollowButton = () => {
    if (following || followers.includes(userId)) {
      return (
        <Button
          onClick={handleFollow}
          className="single__user__button"
          type="button"
          ui="no-border"
          disabled
        >
          Following
        </Button>
      );
    } else {
      return (
        <Button
          onClick={handleFollow}
          className="single__user__button"
          type="button"
        >
          Follow
        </Button>
      );
    }
  };
  const handleFollow = () => {
    const userRef = firebase.db.collection("users").doc(authUser.uid);
    const followerRef = firebase.db.collection("users").doc(userId);
    userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const following = doc.data().following;
          const followingId = userId;
          const updateFollowing = [...following, followingId];
          userRef.update({ following: updateFollowing });
        }
      })
      .catch(err => {});
    followerRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const followers = doc.data().followers;
          const followerId = authUser.uid;
          const updateFollowers = [...followers, followerId];
          followerRef.update({ followers: updateFollowers });
        }
      })
      .catch(err => {});
  };
  return (
    <div className={`single__user ${noBorder ? "no-border" : ""}`}>
      <span className="single__user__avatar" />
      <div className="single__user__main">
        <p className="single__user__main__name">{name}</p>

        <span className="single__user__main__follow">
          {followingCount} following
        </span>
      </div>
      {renderFollowButton()}
    </div>
  );
};

export default SingleUser;
