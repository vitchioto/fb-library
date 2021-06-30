<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <div
        class="form"
      >
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
          @click="updateBook()"
          v-html="'Update'"
        />
        <button
          class="button is-danger"
          @click="deleteBook()"
          v-html="'Delete'"
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
  props: {
    selectedBook: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      author: '',
      language: '',
      theme: '',
      title: '',
    };
  },
  mounted() {
    this.author = this.selectedBook.author;
    this.language = this.selectedBook.language;
    this.theme = this.selectedBook.theme;
    this.title = this.selectedBook.title;
  },
  methods: {
    closeForm() {
      this.$emit('closeForm');
    },
    async deleteBook() {
      await this.$store.dispatch('deleteBook', this.selectedBook.id);
      this.closeForm();
    },
    async updateBook() {
      const book = {
        author: this.author,
        language: this.language,
        theme: this.theme,
        title: this.title,
      };
      await this.$store.dispatch('updateBook', [book, this.selectedBook.id]);
      this.closeForm();
    },
  },
};
</script>

<style lang="scss">
.label {
  color: #fff;
}
</style>
