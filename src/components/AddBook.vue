<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <div
        class="form"
      >
        <label class="label">
          {{ $t('isbn') }}
          <input
            type="text"
            class="input"
            :placeholder="$t('placeholderIsbn')"
            v-model="isbn"
          >
        </label>
        <label class="label">
          {{ $t('title') }}
          <input
            type="text"
            class="input"
            :placeholder="$t('placeholderTitle')"
            v-model="title"
          >
        </label>
        <label class="label">
          {{ $t('author') }}
          <input
            type="text"
            class="input"
            :placeholder="$t('placeholderAuthor')"
            v-model="author"
          >
        </label>
        <label class="label">
          {{ $t('theme') }}
          <input
            type="text"
            class="input"
            :placeholder="$t('placeholderTheme')"
            v-model="theme"
          >
        </label>
        <label class="label">
          {{ $t('language') }}
          <input
            type="text"
            class="input"
            :placeholder="$t('placeholderLanguage')"
            v-model="language"
          >
        </label>
        <button
          class="button is-primary"
          @click="submitBook()"
          v-html="$t('submit')"
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
    async submitBook() {
      const book = {
        author: this.author,
        language: this.language,
        theme: this.theme,
        title: this.title,
      };
      await this.$store.dispatch('submitBook', book);
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
