<template>
  <div
    class="app"
    :class="{'app--logged-out': !userId && loaded}"
  >
    <div class="container">
      <div
        v-if="userId && loaded"
        class="library"
      >
        <router-view />
      </div>
      <div
        v-if="!userId && loaded"
        class="logged-out-page"
      >
        <h1
          v-html="$t('headline')"
        />
        <button
          class="button is-white is-outlined"
          @click="logIn()"
          v-html="$t('logInButton')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
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

    window.addEventListener('scroll', () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5
        && this.$store.state.isMoreDocuments
        && !this.$store.stateloadingInProgress) {
        this.$store.stateloadingInProgress = true;
        this.$store.dispatch('getBooks');
      }
    },
    {
      passive: true,
    });
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
$primary: #1877f2;

@import '../node_modules/bulma/sass/utilities/initial-variables.sass';
@import '../node_modules/bulma/sass/utilities/derived-variables.sass';
@import '../node_modules/bulma/sass/utilities/controls.sass';
@import '../node_modules/bulma/sass/utilities/extends.sass';
@import '../node_modules/bulma/sass/elements/button.sass';
@import '../node_modules/bulma/sass/elements/icon.sass';
@import '../node_modules/bulma/sass/components/modal.sass';
@import '../node_modules/bulma/sass/form/shared.sass';
@import '../node_modules/bulma/sass/form/select.sass';
@import '../node_modules/bulma/sass/form/input-textarea.sass';
@import '../node_modules/bulma/sass/form/checkbox-radio.sass';
@import '../node_modules/bulma/sass/form/tools.sass';
@import '../node_modules/bulma/sass/base/minireset.sass';
@import '../node_modules/bulma/sass/base/generic.sass';

@font-face {
  font-family: 'OpenSans';
  src: url('/font/OpenSans-Regular.ttf')  format('truetype');
}

.app {
  &--logged-out {
    background: #1877f2;
    color: #fff;
  }
}

.container {
  font-family: 'OpenSans', sans-serif;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px 10px;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.logged-out-page {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}
</style>
