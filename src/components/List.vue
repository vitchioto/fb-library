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
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th
            class="list_label"
            v-text="'Title'"
          />
          <th
            class="list_label"
            v-text="'Author'"
          />
          <th
            class="list_label"
            v-text="'Theme'"
          />
          <th
            class="list_label"
            v-text="'Language'"
          />
          <th
            class="list_label"
            v-text="'Owner'"
          />
          <th
            class="list_label"
            v-text="'Functions'"
          />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(book, index) in filteredBooks"
          :key="index"
        >
          <td
            class="book__title"
            v-html="book.title"
          />
          <td
            class="book__author"
            v-html="book.author"
          />
          <td
            class="book__theme"
            v-html="book.theme"
          />
          <td
            class="book__language"
            v-html="book.language"
          />
          <td
            class="book__owner"
            v-html="book.displayName"
          />
          <td
            class="book__functions"
          >
            <button
              v-if="book.fbId === userFbId"
              v-html="'upravit'"
            />
          </td>
        </tr>
      </tbody>
    </table>
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

</style>
