export default {
  ADD_BOOK(state, payload) {
    state.books.push(payload);
  },
  DELETE_BOOK(state, bookId) {
    const bookIndex = state.books.findIndex((item) => item.id === bookId);
    console.log(bookIndex);
    state.books.splice(bookIndex, 1);
  },
  SET_BOOKS(state, payload) {
    state.books = payload;
  },
  SET_FRIEND_IDS(state, payload) {
    state.friendIds = payload;
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },
  SET_USER_ID(state, payload) {
    state.userId = payload;
  },
  SET_USER_TOKEN(state, payload) {
    state.userToken = payload;
  },
  UPDATE_BOOK(state, [payload, bookId]) {
    const book = state.books.find((item) => item.id === bookId);
    book.author = payload.author;
    book.language = payload.language;
    book.theme = payload.theme;
    book.title = payload.title;
  },
};
