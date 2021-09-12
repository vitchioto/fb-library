import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  async deleteBook({ commit }, bookId) {
    const app = firebase.app();
    const db = firebase.firestore(app);

    await db.collection('books').doc(bookId).delete();
    commit('DELETE_BOOK', bookId);
  },
  getAccessToken() {
    const token = localStorage.getItem('vv_fb_library');
    return token;
  },
  async getBook(_, payload) {
    const response = await fetch(`https://api.vladovic.sk/getbook.php?isbn=${payload}`);
    const data = await response.json();
    return data;
  },
  async getBooks({ state, commit }) {
    const app = firebase.app();
    const db = firebase.firestore(app);
    const friendIds = state.friends.map((item) => item.id);
    const ids = [...friendIds, state.userData.uid];
    const books = [];

    const startPosition = state.lastDoc || 0;

    const querySnapshot = await db.collection('books')
      .where('ownerFbId', 'in', ids)
      .orderBy('title')
      .startAfter(startPosition)
      .limit(state.pageSize)
      .get();
    querySnapshot.forEach((doc) => {
      const record = doc.data();
      record.id = doc.id;
      books.push(record);
    });
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    state.lastDoc = lastDoc;
    state.isMoreDocuments = books.length === state.pageSize;
    commit('SET_BOOKS', books);
    state.loadingInProgress = false;
    return books;
  },
  async getFriends({ state, commit }) {
    const token = state.userToken;
    const response = await fetch(`https://graph.facebook.com/me/friends?limit=5000&access_token=${token}`);
    const data = await response.json();
    if (!data.data || !data.data.length) return;
    const friends = data.data.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    commit('SET_FRIENDS', friends);
  },
  submitAccessToken(_, payload) {
    localStorage.setItem('vv_fb_library', payload);
  },
  async submitBook({ state, commit }, payload) {
    const app = firebase.app();
    const db = firebase.firestore(app);

    const newBook = {
      ownerName: state.userData.displayName,
      ownerFbId: state.userData.uid,
      renterFbId: '',
      renterName: '',
      uid: state.userId,
      ...payload,
    };
    const bookEntry = await db.collection('books').add(newBook);
    newBook.id = bookEntry.id;
    commit('ADD_BOOK', newBook);
  },
  async updateBook({ commit }, [payload, bookId]) {
    const app = firebase.app();
    const db = firebase.firestore(app);

    await db.collection('books').doc(bookId).update({
      author: payload.author,
      language: payload.language,
      renterFbId: payload.renterFbId,
      renterName: payload.renterName,
      theme: payload.theme,
      title: payload.title,
    });
    commit('UPDATE_BOOK', [payload, bookId]);
  },
};
