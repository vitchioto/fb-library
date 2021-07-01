<template>
  <div class="list">
    <header class="list-header">
      <div class="control has-icons-right">
        <input
          class="input"
          type="text"
          v-model="filterString"
        >
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <div class="list-filters">
        <label class="radio">
          <input
            type="radio"
            value="0"
            v-model="filterType"
          >
          All Books
        </label>
        <label class="radio">
          <input
            type="radio"
            value="1"
            v-model="filterType"
          >
          My Books
        </label>
        <label class="radio">
          <input
            type="radio"
            value="2"
            v-model="filterType"
          >
          My Rented Books
        </label>
        <label class="radio">
          <input
            type="radio"
            value="3"
            v-model="filterType"
          >
          Borrowed Books
        </label>
      </div>
      <button
        class="button is-primary"
        @click="openAddForm()"
        v-html="'Add book'"
      />
    </header>
    <div
      v-if="filteredBooks && filteredBooks.length"
      class="list-table"
    >
      <div
        class="list-label"
        v-text="'Title'"
      />
      <div
        class="list-label"
        v-text="$t('author')"
      />
      <div
        class="list-label"
        v-text="'Theme'"
      />
      <div
        class="list-label"
        v-text="'Language'"
      />
      <div
        class="list-label"
        v-text="'Owner'"
      />
      <div
        class="list-label"
        v-text="'Rented by'"
      />
      <div
        class="list-label"
        v-text="'Functions'"
      />
      <div
        v-for="(book, index) in filteredBooks"
        :key="index"
        class="book"
        @click="toggleBookDetails(index)"
      >
        <div class="book-top">
          <div
            class="book-title"
            v-html="book.title"
          />
          <div
            class="book-author"
            v-html="book.author"
          />
          <div class="book-icon icon is-small is-right">
            <i
              class="fas fa-chevron-down"
              :class="{'book-icon--rotate': openDetails.includes(index)}"
            />
          </div>
        </div>
        <div
          class="book-details"
          :class="{'book-details--open': openDetails.includes(index)}"
        >
          <div
            class="book-theme"
            data-label="Theme: "
            v-html="book.theme"
          />
          <div
            class="book-language"
            data-label="Lang: "
            v-html="book.language"
          />
          <div
            class="book-owner"
            data-label="Owner: "
            v-html="book.ownerName"
          />
          <div
            class="book-renter"
            data-label="Renter: "
            v-html="book.renterName"
          />
          <div
            class="book-functions"
          >
            <button
              v-if="book.ownerFbId === userFbId"
              class="button is-primary is-light is-small"
              @click="openUpdateForm(book.id)"
              v-html="'upravit'"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="table-empty"
      v-html="'No Books'"
    />
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
      openDetails: [],
    };
  },
  computed: {
    filteredBooks() {
      let { books } = this;
      if (this.filterType === '1') books = books.filter((book) => book.ownerFbId === this.userFbId);
      if (this.filterType === '2') books = books.filter((book) => book.renterFbId === this.userFbId);
      if (this.filterType === '3') books = books.filter((book) => book.ownerFbId === this.userFbId && book.renterFbId);
      if (!this.filterString) return books;
      const filterStringInLower = this.filterString.toLowerCase();
      return books.filter((book) => book.title.toLowerCase().includes(filterStringInLower)
        || book.author.toLowerCase().includes(filterStringInLower)
        || book.theme.toLowerCase().includes(filterStringInLower)
        || book.language.toLowerCase().includes(filterStringInLower)
        || book.ownerName.toLowerCase().includes(filterStringInLower));
    },
    userFbId() {
      return this.$store.state.userData.uid;
    },
  },
  methods: {
    openAddForm() {
      this.$emit('openAddForm');
    },
    toggleBookDetails(id) {
      const index = this.openDetails.findIndex((item) => item === id);
      if (index === -1) {
        this.openDetails.push(id);
      } else {
        this.openDetails.splice(index, 1);
      }
    },
    openUpdateForm(id) {
      this.$emit('openUpdateForm', id);
    },
  },
};
</script>

<style lang="scss">
.list {
  &-filters {
    .radio {
      margin: 0 5px 0 0;
    }
  }

  &-label {
    display: none;
  }

  &-table {
    padding: 20px 0;
  }
}

.book {
  border: 1px solid #efefef;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;

  &-top {
    display: grid;
    grid-template-columns: auto 30px;
  }

  &-author {
    order: 2;
  }

  &-icon {
    transform: rotateZ(0);

    &--rotate {
      transform: rotateZ(180deg);
      transition: transform .5s;
    }
  }

  &-details {
    display: none;

    &--open {
      display: block;
    }
  }

  &-theme, &-language, &-owner, &-renter {
    &::before {
      content: attr(data-label);
    }
  }
}

@media only screen and (min-width: 600px) {
  .book {
    display: contents;

    &-top {
      display: contents;
    }

    &-title {
      align-items: center;
      border-bottom: 1px solid #333;
      display: flex;
      padding: 10px;
    }

    &-author {
      align-items: center;
      border-bottom: 1px solid #333;
      display: flex;
      order: unset;
      padding: 10px;
    }

    &-icon {
      display: none;
    }

    &-details {
      display: contents;
    }

    &-theme, &-language, &-owner, &-renter {
      align-items: center;
      border-bottom: 1px solid #333;
      display: flex;
      padding: 10px;

      &::before {
        content: unset;
      }
    }

    &-functions {
      align-items: center;
      border-bottom: 1px solid #333;
      display: flex;
      padding: 10px;
    }
  }
  .list {
    &-header {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    &-label {
      border-bottom: 1px solid #333;
      display: block;
      font-weight: 700;
      padding: 10px;
    }

    &-table {
      display: grid;
      grid-template-columns: auto auto max-content max-content auto auto max-content;
      padding: 30px 0;
    }
  }
}
</style>
