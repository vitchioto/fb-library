<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
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
  },
};
</script>

<style lang="scss">

</style>
