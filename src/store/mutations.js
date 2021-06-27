export default {
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
};
