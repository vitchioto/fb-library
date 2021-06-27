<template>
  <div class="table">
    <input
      type="text"
      v-model="filterString"
    >
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
          v-if="true"
          class="book__functions"
        >
          <button>b</button>
          <button>r</button>
          <button>e</button>
          <button>d</button>
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
    };
  },
  computed: {
    filteredBooks() {
      if (!this.filterString) return this.books;
      const filterStringInLower = this.filterString.toLowerCase();
      return this.books.filter((book) => book.title.toLowerCase().includes(filterStringInLower)
        || book.author.toLowerCase().includes(filterStringInLower)
        || book.theme.toLowerCase().includes(filterStringInLower)
        || book.language.toLowerCase().includes(filterStringInLower));
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
