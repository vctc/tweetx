import React, { useEffect, useContext, useState } from "react";
import "./profile.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SingleFeed from "../Feed/SingleFeed";
import SingleUser from "../Users/SingleUser";
import { FaEnvelopeOpen } from "react-icons/fa";
import { FirebaseContext } from "../../Firebase";
import { FaUserTimes } from "react-icons/fa";
import Loading from "../../UI/Loading/Loading";
import uuid from "react-uuid";

const Profile = () => {
  const { firebase, authUser } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const showLoading = () => {
    setLoading(true);
  };
  const hideLoading = () => {
    setLoading(false);
  };

  const [userData, setUserdata] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    if (authUser) {
      showLoading();
      async function getUserInfo() {
        await firebase.db
          .doc(`/users/${authUser.uid}`)
          .onSnapshot(handleUserSnapshot);
      }
      const handleUserSnapshot = snapshot => {
        setInfo(snapshot.data());
      };
      getUserInfo();
      firebase.getProfileData(authUser.uid).then(data => {
        setUserdata(data);
        hideLoading();
      });
    }
  }, [authUser]);

  useEffect(() => {
    let followersTemp = [];
    let followingTemp = [];
    if (userData) {
      userData.users.map(user => {
        if (info.followers.includes(user.userId)) {
          followersTemp.push(user);
        }
        if (info.following.includes(user.userId)) {
          followingTemp.push(user);
        }

        return 0;
      });
    }

    setFollowers(followersTemp);
    setFollowing(followingTemp);
  }, [userData, info]);

  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <div className="profile">
      <div className="profile__user">
        <span className="profile__user__avatar" />
        <div className="profile__user__info">
          {userData && userData.info && <p>{userData.info.name}</p>}
          <span className="count">
            {" "}
            <span>{`Posts: ${userData?.tweets?.length}`}</span>
            <span>{` Followers: ${followers.length}`} </span>
            <span> {` Following: ${following.length} `}</span>
          </span>
        </div>
      </div>
      <Tabs className="profile__tabs">
        <TabList>
          <Tab>
            <FaEnvelopeOpen className="icon" />
            <span>Post</span>
          </Tab>
          <Tab>
            <FaEnvelopeOpen className="icon" />
            <span>Followers</span>
          </Tab>
          <Tab>
            <FaEnvelopeOpen className="icon" />
            <span>Following</span>
          </Tab>
        </TabList>

        <TabPanel>
          {userData?.tweets?.length === 0 && (
            <div className="no-users">
              <FaUserTimes />
              <span>No tweets to display</span>
            </div>
          )}
          {userData?.tweets?.map(tweet => (
            <SingleFeed
              key={uuid()}
              message={tweet.message}
              time={tweet.createdAt}
              name={tweet.createdBy}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {followers.length === 0 && (
            <div className="no-users">
              <FaUserTimes />
              <span>Currently no followers</span>
            </div>
          )}
          {followers.map(follower => (
            <SingleUser
              key={uuid()}
              userId={follower.userId}
              name={follower.name}
              followers={info.following}
              noBorder
              followingCount={follower.following.length}
            />
          ))}
        </TabPanel>

        <TabPanel>
          {following.length === 0 && (
            <div className="no-users">
              <FaUserTimes />
              <span>Currently no people you follow</span>
            </div>
          )}

          {following.map(follower => (
            <SingleUser
              key={uuid()}
              userId={follower.userId}
              name={follower.name}
              noBorder
              following
              followingCount={follower.following.length}
            />
          ))}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Profile;
