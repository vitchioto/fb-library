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
            :class="{'is-danger':
              errorMaxLength.includes('title') || errorRequired.includes('title')}"
            :placeholder="$t('placeholderTitle')"
            v-model="title"
          >
        </label>
        <div
          v-if="errorMaxLength.includes('title')"
          class="error"
          v-html="$t('errorMaxLength')"
        />
        <div
          v-if="errorRequired.includes('title')"
          class="error"
          v-html="$t('errorRequired')"
        />
        <label class="label">
          {{ $t('author') }}
          <input
            type="text"
            class="input"
            :class="{'is-danger':
              errorMaxLength.includes('author') || errorRequired.includes('author')}"
            :placeholder="$t('placeholderAuthor')"
            v-model="author"
          >
        </label>
        <div
          v-if="errorMaxLength.includes('author')"
          class="error"
          v-html="$t('errorMaxLength')"
        />
        <div
          v-if="errorRequired.includes('author')"
          class="error"
          v-html="$t('errorRequired')"
        />
        <label class="label">
          {{ $t('theme') }}
          <input
            type="text"
            class="input"
            :class="{'is-danger': errorMaxLength.includes('theme')}"
            :placeholder="$t('placeholderTheme')"
            v-model="theme"
          >
        </label>
        <div
          v-if="errorMaxLength.includes('theme')"
          class="error"
          v-html="$t('errorMaxLength')"
        />
        <label class="label">
          {{ $t('language') }}
          <input
            type="text"
            class="input"
            :class="{'is-danger':
              errorMaxLength.includes('language') || errorRequired.includes('language')}"
            :placeholder="$t('placeholderLanguage')"
            v-model="language"
          >
        </label>
        <div
          v-if="errorMaxLength.includes('language')"
          class="error"
          v-html="$t('errorMaxLength')"
        />
        <div
          v-if="errorRequired.includes('language')"
          class="error"
          v-html="$t('errorRequired')"
        />
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
      errorMaxLength: [],
      errorRequired: [],
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
      const isValid = this.validate();
      if (isValid) {
        const book = {
          author: this.author,
          language: this.language,
          theme: this.theme,
          title: this.title,
        };
        await this.$store.dispatch('submitBook', book);
        this.closeForm();
      }
    },
    validate() {
      this.errorMaxLength = [];
      this.errorRequired = [];
      if (!this.author.length) this.errorRequired.push('author');
      if (!this.language.length) this.errorRequired.push('language');
      if (!this.title.length) this.errorRequired.push('title');

      if (this.author.length > 100) this.errorMaxLength.push('author');
      if (this.language.length > 100) this.errorMaxLength.push('language');
      if (this.theme.length > 100) this.errorMaxLength.push('theme');
      if (this.title.length > 100) this.errorMaxLength.push('title');

      return !(this.errorMaxLength.length + this.errorRequired.length);
    },
  },
};
</script>

<style lang="scss">
.label {
  color: #fff;
}

.error {
  color: hsl(348, 100%, 61%);
  margin-bottom: 10px;
}
</style>
