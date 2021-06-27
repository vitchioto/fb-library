<template>
  <div class="home">
    <List
      v-if="books"
      :books="books"
    />
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
