<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <div
        class="form"
      >
        <div class="select">
          <select
            v-model="renterFbId"
          >
            <option
              value=""
              v-html="$t('nobody')"
            />
            <option
              v-for="friend in friends"
              :key="friend.id"
              :value="friend.id"
              v-html="friend.name"
            />
          </select>
        </div>
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
        <div class="buttons">
          <button
            class="button is-primary"
            @click="updateBook()"
            v-html="$t('edit')"
          />
          <button
            class="button is-danger"
            @click="deleteBook()"
            v-html="$t('delete')"
          />
        </div>
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
      renterFbId: '',
      theme: '',
      title: '',
    };
  },
  computed: {
    friends() {
      return this.$store.state.friends;
    },
  },
  mounted() {
    this.author = this.selectedBook.author;
    this.language = this.selectedBook.language;
    this.renterFbId = this.selectedBook.renterFbId;
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
      let renterFbId = '';
      let renterName = '';
      if (this.renterFbId) {
        const renter = this.friends.find((item) => item.id === this.renterFbId);
        renterFbId = renter.id;
        renterName = renter.name;
      }
      const book = {
        author: this.author,
        language: this.language,
        renterFbId,
        renterName,
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
