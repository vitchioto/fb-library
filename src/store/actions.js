import firebase from 'firebase/app';
import 'firebase/firestore';

const server = require('@ibaneeez/fb-library-server');

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
  async getBooks2({ state }) {
    const defaultClient = server.ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: openid
    console.log('defaultClient.authentications', defaultClient.authentications);
    const { openid } = defaultClient.authentications;
    openid.accessToken = state.userData.uid;

    const api = new server.BookApi();
    const opts = {
      searchTerm: 'searchTerm_example', // {String}
      lent: true, // {Boolean}
      borrowed: true, // {Boolean}
    };

    api.getBooks(opts, (error, data, response) => {
      console.log('response', response);
      if (error) {
        console.error(error);
      } else {
        console.log(`API called successfully. Returned data: ${data}`);
      }
    });
  },
  async getBooks({ state, commit }) {
    const app = firebase.app();
    const db = firebase.firestore(app);
    const friendIds = state.friends.map((item) => item.id);
    const ids = [...friendIds, state.userData.uid];
    const books = [];

    let querySnapshot;

    const startPosition = state.lastDoc || 0;

    const { filterString } = state;
    if (filterString) {
      if (state.filterType === 1) {
        querySnapshot = await db.collection('books')
          .where('ownerFbId', '==', state.userData.uid)
          .where('title', '>=', filterString)
          .where('title', '<', `${filterString}ako\uf8ff`)
          .orderBy('title')
          .startAfter(startPosition)
          .limit(state.pageSize)
          .get();
      } else if (state.filterType === 2) {
        querySnapshot = await db.collection('books')
          .where('ownerFbId', '==', state.userData.uid)
          .where('renterFbId', '!=', '')
          .orderBy('renterFbId')
          .startAfter(startPosition)
          .limit(state.pageSize)
          .get();
      } else if (state.filterType === 3) {
        querySnapshot = await db.collection('books')
          .where('renterFbId', '==', state.userData.uid)
          .orderBy('title')
          .startAfter(startPosition)
          .limit(state.pageSize)
          .get();
      } else {
        querySnapshot = await db.collection('books')
          .where('ownerFbId', 'in', ids)
          .where('title', '>=', filterString)
          .where('title', '<', `${filterString}ako\uf8ff`)
          .orderBy('title')
          .startAfter(startPosition)
          .limit(state.pageSize)
          .get();
      }
    } else if (state.filterType === 1) {
      querySnapshot = await db.collection('books')
        .where('ownerFbId', '==', state.userData.uid)
        .orderBy('title')
        .startAfter(startPosition)
        .limit(state.pageSize)
        .get();
    } else if (state.filterType === 2) {
      querySnapshot = await db.collection('books')
        .where('ownerFbId', '==', state.userData.uid)
        .where('renterFbId', '!=', '')
        .orderBy('renterFbId')
        .startAfter(startPosition)
        .limit(state.pageSize)
        .get();
    } else if (state.filterType === 3) {
      querySnapshot = await db.collection('books')
        .where('renterFbId', '==', state.userData.uid)
        .orderBy('title')
        .startAfter(startPosition)
        .limit(state.pageSize)
        .get();
    } else {
      querySnapshot = await db.collection('books')
        .where('ownerFbId', 'in', ids)
        .orderBy('title')
        .startAfter(startPosition)
        .limit(state.pageSize)
        .get();
    }
    querySnapshot.forEach((doc) => {
      const record = doc.data();
      record.id = doc.id;
      books.push(record);
    });
    if (startPosition) {
      commit('ADD_BOOKS', books);
    } else {
      commit('SET_BOOKS', books);
    }
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    commit('SET_LAST_DOCUMENT', lastDoc);
    state.isMoreDocuments = books.length === state.pageSize;
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
