<template>
  <div class="home">
    <List
      v-if="books"
      :books="books"
    />
    <button
      @click="toggleAddBookForm()"
      v-html="'Add book'"
    />
    <AddBook
      v-if="showAddBook"
      @close-form="toggleAddBookForm()"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AddBook from '@/components/AddBook.vue';
import List from '@/components/List.vue';

export default {
  name: 'Home',
  components: {
    AddBook,
    List,
  },
  data() {
    return {
      books: null,
      showAddBook: false,
    };
  },
  async created() {
    this.books = await this.$store.dispatch('getBooks');
  },
  methods: {
    toggleAddBookForm() {
      this.showAddBook = !this.showAddBook;
    },
  },
};
</script>
