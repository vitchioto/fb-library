<template>
  <div>
    <div
      class="form"
    >
      <label>
        ISBN
        <input
          type="text"
          v-model="isbn"
        >
      </label>
      <label>
        Title
        <input
          type="text"
          v-model="title"
        >
      </label>
      <label>
        Author
        <input
          type="text"
          v-model="author"
        >
      </label>
      <label>
        Theme
        <input
          type="text"
          v-model="theme"
        >
      </label>
      <label>
        Language
        <input
          type="text"
          v-model="language"
        >
      </label>
      <button
        @click="submitBook()"
        v-html="'Submit'"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: '',
      isbn: '',
      language: '',
      theme: '',
      title: '',
    };
  },
  methods: {
    submitBook() {
      const book = {
        author: this.author,
        language: this.language,
        theme: this.theme,
        title: this.title,
      };
      this.$store.dispatch('submitBook', book);
    },
  },
};
</script>

<style lang="scss">

</style>
