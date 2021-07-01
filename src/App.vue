<template>
  <div class="app">
    <div
      v-if="userId && loaded"
      class="library"
    >
      <router-view />
    </div>
    <div
      v-if="!userId && loaded"
      class="log-out-page"
    >
      <button
        class="button is-primary"
        @click="logIn()"
        v-html="$t('logInButton')"
      />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      firebaseObject: null,
      loaded: false,
    };
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    },
  },
  created() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDdXezs1XBtANM9KDPjZ794ciGVud1spBY',
      authDomain: 'vv-library.firebaseapp.com',
      projectId: 'vv-library',
      storageBucket: 'vv-library.appspot.com',
      messagingSenderId: '936690418524',
      appId: '1:936690418524:web:2a5b1554b9a9245a153799',
      measurementId: 'G-KG8R6NNTYR',
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.firebaseObject = firebase;

    this.loadUser();
  },
  methods: {
    loadUser() {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          this.$store.commit('SET_USER_ID', user.uid);
          this.$store.commit('SET_USER_DATA', user.providerData[0]);
          const userToken = await this.$store.dispatch('getAccessToken');
          this.$store.commit('SET_USER_TOKEN', userToken);
          await this.$store.dispatch('getFriends');
          this.$store.dispatch('getBooks');
        }
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
        })
        .catch((error) => {
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
  padding: 20px 10px;
}

.log-out-page {
  text-align: center;
}
</style>
