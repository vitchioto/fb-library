<template>
  <div class="app">
    <div
      v-if="userId && loaded"
      class="library"
    >
      <Home />
    </div>
    <div
      v-if="!userId"
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
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import Home from '@/views/Home.vue';

export default {
  data() {
    return {
      firebaseObject: null,
      loaded: false,
    };
  },
  components: {
    Home,
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
      firebase.auth().onAuthStateChanged(async (user) => {
        console.log('user', user);
        this.$store.commit('SET_USER_ID', user.uid);
        this.$store.commit('SET_USER_DATA', user.providerData[0]);
        const userToken = await this.$store.dispatch('getAccessToken');
        this.$store.commit('SET_USER_TOKEN', userToken);
        await this.$store.dispatch('getFriends');
        this.loaded = true;
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
          this.$store.dispatch('getFriends');
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
.app {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
