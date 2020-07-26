import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./config";

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await newUser.user.updateProfile({ displayName: name });

    const userCredentials = {
      name: newUser.user.displayName,
      email: newUser.user.email,
      createdAt: new Date().toISOString(),
      userId: newUser.user.uid,
      followers: [],
      following: []
    };

    const userAdded = await this.db
      .collection("users")
      .doc(newUser.user.uid)
      .set(userCredentials);

    return userAdded;
  }

  async logout() {
    return await this.auth.signOut();
  }

  async reset(email) {
    return await this.auth.sendPasswordResetEmail(email);
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async getProfileData(userId) {
    let profileData = {};
    const userDetails = await this.db.doc(`/users/${userId}`).get();
    profileData.info = userDetails.data();

    const users = await this.db.collection("users").get();

    profileData.users = users.docs.map(doc => doc.data());

    const tweets = await this.db
      .collection("tweets")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    profileData.tweets = tweets.docs.map(doc => doc.data());

    return profileData;
  }
}

const firebase = new Firebase();

export default firebase;
