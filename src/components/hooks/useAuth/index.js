import { useState, useEffect } from "react";

import firebase from "../../Firebase";

function useAuth() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
        localStorage.removeItem("tweetxUser");
      }
    });
    return () => unsubscribe();
  }, []);

  return authUser;
}

export default useAuth;
