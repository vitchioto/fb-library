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
  async getBooks({ state, commit }) {
    const app = firebase.app();
    const db = firebase.firestore(app);
    const ids = [...state.friendIds, state.userData.uid];
    const books = [];

    const querySnapshot = await db.collection('books').where('fbId', 'in', ids).get();
    querySnapshot.forEach((doc) => {
      const record = doc.data();
      record.id = doc.id;
      books.push(record);
    });
    commit('SET_BOOKS', books);
    return books;
  },
  async getFriends({ state, commit }) {
    const token = state.userToken;
    const response = await fetch(`https://graph.facebook.com/me/friends?limit=5000&access_token=${token}`);
    const data = await response.json();
    const friendIds = data.data.map((item) => item.id);
    commit('SET_FRIEND_IDS', friendIds);
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
    await db.collection('books').add({
      displayName: state.userData.displayName,
      fbId: state.userData.uid,
      uid: state.userId,
      ...payload,
    });
  },
  async updateBook({ commit }, [payload, bookId]) {
    const app = firebase.app();
    const db = firebase.firestore(app);

    console.log(payload);
    await db.collection('books').doc(bookId).update({
      author: payload.author,
      language: payload.language,
      theme: payload.theme,
      title: payload.title,
    });
    commit('UPDATE_BOOK', [payload, bookId]);
  },
};
