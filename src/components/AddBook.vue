<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <div
        class="form"
      >
        <label class="label">
          ISBN
          <input
            type="text"
            class="input"
            v-model="isbn"
          >
        </label>
        <label class="label">
          Title
          <input
            type="text"
            class="input"
            v-model="title"
          >
        </label>
        <label class="label">
          Author
          <input
            type="text"
            class="input"
            v-model="author"
          >
        </label>
        <label class="label">
          Theme
          <input
            type="text"
            class="input"
            v-model="theme"
          >
        </label>
        <label class="label">
          Language
          <input
            type="text"
            class="input"
            v-model="language"
          >
        </label>
        <button
          class="button is-primary"
          @click="submitBook()"
          v-html="'Submit'"
        />
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="closeForm()"
    />
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
    closeForm() {
      this.$emit('closeForm');
    },
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
.label {
  color: #fff;
}
</style>
