import { ApiClient, BookApi, IsbnDataApi } from '@ibaneeez/fb-library-server';

export default {
  initApiClient({ commit }, idToken) {
    const apiClient = ApiClient.instance;
    apiClient.basePath = 'https://vitchito-fb-library-api.herokuapp.com';
    apiClient.authentications.openid.accessToken = idToken;
    commit('SET_API_CLIENT', apiClient);
  },
  async deleteBook({ commit }, bookId) {
    const api = new BookApi();

    await api.deleteBook(bookId);
    commit('DELETE_BOOK', bookId);
  },
  getAccessToken() {
    const token = localStorage.getItem('vv_fb_library');
    return token;
  },
  async getBook(_, payload) {
    const api = new IsbnDataApi();

    const response = await api.getISBNData(payload);
    return response;
  },
  async getBooks({ state, commit }) {
    const api = new BookApi();

    const opts = {
      // searchTerm: '',
      // status: null,
      fbAccessToken: state.userToken,
    };

    const response = await api.getBooks(opts);
    console.log('response', response);
    commit('SET_BOOKS', response);
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
    const api = new BookApi();

    const newBook = {
      ownerName: state.userData.displayName,
      ownerFbId: state.userData.uid,
      renterFbId: '',
      renterName: '',
      uid: state.userId,
      ...payload,
    };
    const response = await api.submitBook(newBook);
    newBook.id = response.id;
    commit('ADD_BOOK', newBook);
  },
  async updateBook({ state, commit }, [payload, bookId]) {
    const api = new BookApi();

    const updatedBook = {
      id: bookId,
      ownerName: state.userData.displayName,
      ownerFbId: state.userData.uid,
      uid: state.userId,
      ...payload,
    };
    await api.updateBook(bookId, updatedBook);
    commit('UPDATE_BOOK', [updatedBook, bookId]);
  },
};
