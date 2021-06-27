<template>
  <div class="my-books">
    <h1>My Books</h1>
    <List
      v-if="books"
      :books="books"
      :show-functions="true"
    />
    <AddBook />
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
    };
  },
  async created() {
    this.books = await this.$store.dispatch('getMyBooks');
  },
};
</script>
