<template>
  <div class="home">
    <List
      v-if="books"
      :books="books"
      @open-add-form="toggleAddBookForm()"
      @open-update-form="toggleUpdateBookForm"
    />
    <AddBook
      v-if="showAddBook"
      @close-form="toggleAddBookForm()"
    />
    <UpdateBook
      v-if="showUpdateBook"
      :selected-book="selectedBook"
      @close-form="toggleUpdateBookForm()"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AddBook from '@/components/AddBook.vue';
import UpdateBook from '@/components/UpdateBook.vue';
import List from '@/components/List.vue';

export default {
  name: 'Home',
  components: {
    AddBook,
    UpdateBook,
    List,
  },
  data() {
    return {
      bookId: null,
      showAddBook: false,
      showUpdateBook: false,
    };
  },
  computed: {
    books() {
      return this.$store.state.books;
    },
    selectedBook() {
      if (!this.books || !this.bookId) return null;
      return this.books.find((book) => book.id === this.bookId);
    },
  },
  created() {
    this.$store.dispatch('getBooks');
    console.log('aaa', this.books);
  },
  methods: {
    toggleAddBookForm() {
      this.showAddBook = !this.showAddBook;
    },
    toggleUpdateBookForm(bookId) {
      if (bookId) this.bookId = bookId;
      this.showUpdateBook = !this.showUpdateBook;
    },
  },
};
</script>
