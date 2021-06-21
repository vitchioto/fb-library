<template>
  <div class="app">
    <div
      v-if="userId"
      class="library"
    >
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/my-books">My Books</router-link> |
        <router-link to="/my-rented-books">My Rented Books</router-link>
      </div>
      <router-view/>
    </div>
    <div
      v-else
      class="log-in-page"
    >
      <button @click="logIn()">
        Log In
      </button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

export default {
  data() {
    return {
      firebaseObject: null,
    };
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    },
  },
  created() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyDdXezs1XBtANM9KDPjZ794ciGVud1spBY',
      authDomain: 'vv-library.firebaseapp.com',
      projectId: 'vv-library',
      storageBucket: 'vv-library.appspot.com',
      messagingSenderId: '936690418524',
      appId: '1:936690418524:web:2a5b1554b9a9245a153799',
      measurementId: 'G-KG8R6NNTYR',
    };
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.firebaseObject = firebase;

    this.loadUser();
  },
  methods: {
    loadUser() {
      firebase.auth().onAuthStateChanged((user) => {
        this.$store.commit('SET_USER_ID', user.uid);
        this.$store.dispatch('getAccessToken').then((userToken) => {
          this.$store.commit('SET_USER_TOKEN', userToken);
        });
      });
    },
    logIn() {
      const provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_friends');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const { accessToken } = result.credential;
          const userId = result.user.uid;

          this.$store.commit('SET_USER_ID', userId);
          this.$store.dispatch('submitAccessToken', accessToken);
        })
        .catch((error) => {
          // Handle Errors here.
          console.error('error', error);
        });
    },
  },
};
</script>

<style lang="scss">

</style>
