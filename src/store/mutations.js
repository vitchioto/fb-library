export default {
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
