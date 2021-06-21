<template>
  <div class="my-books">
    <h1>My Books</h1>
    <List />
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
};
</script>
