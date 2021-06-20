<template>
  <div class="table">
    <input
      type="text"
      v-model="filterString"
    >
    <div
      class="list"
    >
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
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [
        {
          title: 'Nazov knihy',
          author: 'Stephen King',
          theme: 'Dobrodruzna',
          language: 'slovenský',
        },
        {
          title: 'daco dalsie',
          author: 'George R.R. Martin',
          theme: 'Dobrodruzna',
          language: 'český',
        },
        {
          title: 'Ina kniha',
          author: 'Stephen King',
          theme: 'vedecka',
          language: 'slovenský',
        },
      ],
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
  grid-template-columns: repeat(4, 1fr);
}
</style>
