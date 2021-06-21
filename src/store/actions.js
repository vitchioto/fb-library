import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  async getAccessToken({ state }) {
    const app = firebase.app();
    const db = firebase.firestore(app);
    let token;

    const querySnapshot = await db.collection('fbAccessTokens').where('uid', '==', state.userId).get();
    querySnapshot.forEach((doc) => {
      const record = doc.data();
      token = record.token;
    });
    return token;
  },
  submitAccessToken({ state }, payload) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      const app = firebase.app();
      const db = firebase.firestore(app);

      db.collection('fbAccessTokens').add({
        uid: state.userId,
        token: payload,
      });
    });
  },
  async submitBook({ state }, payload) {
    const app = firebase.app();
    const db = firebase.firestore(app);

    console.log(payload);
    await db.collection('fbAccessTokens').add({
      uid: state.userId,
      ...payload,
    });
  },
};
