<template>
  <div class="my-books">
    <h1>My Rented Books</h1>
    <List />
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue';

export default {
  name: 'Home',
  components: {
    List,
  },
};
</script>
