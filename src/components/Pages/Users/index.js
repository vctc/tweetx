import React, { useState, useEffect, useContext } from "react";
import SingleUser from "./SingleUser";
import "./users.scss";
import { FirebaseContext } from "../../Firebase";
import { FaUserTimes } from "react-icons/fa";
import Loading from "../../UI/Loading/Loading";
import uuid from "react-uuid";

const Users = () => {
  const { firebase, authUser } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);
  const showLoading = () => {
    setLoading(true);
  };
  const hideLoading = () => {
    setLoading(false);
  };
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  const getUsers = () => {
    firebase.db.collection("users").onSnapshot(handleSnapshot);
  };

  const handleSnapshot = snapshot => {
    const usersFb = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    usersFb.map(user => {
      if (user.id === authUser?.uid) {
        setFollowing(user.following);
      }
      return 0;
    });
    setUsers(usersFb.filter(user => user.id !== authUser?.uid));
    hideLoading();
  };

  useEffect(() => {
    if (authUser) {
      showLoading();
      getUsers();
    }
  }, [authUser]);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <div className="users__container">
      <div className="users">
        {users.length === 0 && (
          <div className="no-users">
            <FaUserTimes />
            <span>No users to display</span>
          </div>
        )}
        {users.length > 0 &&
          users.map(user => (
            <SingleUser
              key={uuid()}
              userId={user.userId}
              followers={following}
              name={user.name}
              followingCount={user.following.length}
            />
          ))}
      </div>
    </div>
  );
};

export default Users;
