<template>
  <div class="home">
    <List
      v-if="books"
      :books="books"
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
    this.books = await this.$store.dispatch('getBooks');
  },
};
</script>
