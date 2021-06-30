<template>
  <div class="table">
    <input
      type="text"
      v-model="filterString"
    >
    <label>
      <input
        type="radio"
        value="0"
        v-model="filterType"
      >
      All Books
    </label>
    <label>
      <input
        type="radio"
        value="1"
        v-model="filterType"
      >
      My Books
    </label>
    <label>
      <input
        type="radio"
        value="2"
        v-model="filterType"
      >
      My Rented Books
    </label>
    <label>
      <input
        type="radio"
        value="3"
        v-model="filterType"
      >
      Borrowed Books
    </label>
    <div
      class="list"
    >
      <div
        class="list_label"
        v-text="'Title'"
      />
      <div
        class="list_label"
        v-text="'Author'"
      />
      <div
        class="list_label"
        v-text="'Theme'"
      />
      <div
        class="list_label"
        v-text="'Language'"
      />
      <div
        class="list_label"
        v-text="'Owner'"
      />
      <div
        class="list_label"
        v-text="'Functions'"
      />
      <template
        v-for="(book, index) in filteredBooks"
        :key="index"
      >
        <div
          class="book__title"
          v-html="book.title"
        />
        <div
          class="book__author"
          v-html="book.author"
        />
        <div
          class="book__theme"
          v-html="book.theme"
        />
        <div
          class="book__language"
          v-html="book.language"
        />
        <div
          class="book__owner"
          v-html="book.displayName"
        />
        <div
          class="book__functions"
        >
          <button
            v-if="book.fbId === userFbId"
            v-html="'upravit'"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filterString: null,
      filterType: '0',
    };
  },
  computed: {
    filteredBooks() {
      let { books } = this;
      if (this.filterType === '1') books = books.filter((book) => book.fbId === this.userFbId);
      if (this.filterType === '2') books = books.filter((book) => book.renterId === this.userFbId);
      console.log(books);
      if (!this.filterString) return books;
      const filterStringInLower = this.filterString.toLowerCase();
      return books.filter((book) => book.title.toLowerCase().includes(filterStringInLower)
        || book.author.toLowerCase().includes(filterStringInLower)
        || book.theme.toLowerCase().includes(filterStringInLower)
        || book.language.toLowerCase().includes(filterStringInLower)
        || book.displayName.toLowerCase().includes(filterStringInLower));
    },
    userFbId() {
      return this.$store.state.userData.uid;
    },
  },
};
</script>

<style lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
</style>
