<template>
  <div class="list">
    <header class="list-header">
      <div class="control has-icons-right">
        <input
          class="input"
          type="text"
          :placeholder="`Nefunguje :/ $t('placeholderSearch')`"
          v-model="filterString"
        >
        <span
          class="icon is-small is-right search-icon"
          @click="search()"
        >
          <i
            class="fas fa-search"
          />
        </span>
      </div>
      <div class="list-filters">
        <label
          class="radio"
        >
          <input
            type="radio"
            value="0"
            v-model="filterType"
            @click="setFilterType(0)"
          >
          {{ $t('filterAllBooks') }}
        </label>
        <label
          class="radio"
        >
          <input
            type="radio"
            value="1"
            v-model="filterType"
            @click="setFilterType(1)"
          >
          {{ $t('filterMyBooks') }}
        </label>
        <label
          class="radio"
        >
          <input
            type="radio"
            value="2"
            v-model="filterType"
            @click="setFilterType(2)"
          >
          {{ $t('filterMyRentedBooks') }}
        </label>
        <label
          class="radio"
        >
          <input
            type="radio"
            value="3"
            v-model="filterType"
            @click="setFilterType(3)"
          >
          {{ $t('filterMyBorrowedBooks') }}
        </label>
      </div>
      <button
        class="button is-primary"
        @click="openAddForm()"
        v-html="$t('addABook')"
      />
    </header>
    <div
      v-if="!friends.length"
      class="list-info"
      v-html="$t('noFriendsMessage')"
    />
    <div
      v-if="filteredBooks && filteredBooks.length"
      class="list-table"
    >
      <div
        class="list-label"
        v-text="$t('title')"
      />
      <div
        class="list-label"
        v-text="$t('author')"
      />
      <div
        class="list-label"
        v-text="$t('theme')"
      />
      <div
        class="list-label"
        v-text="$t('language')"
      />
      <div
        class="list-label"
        v-text="$t('owner')"
      />
      <div
        class="list-label"
        v-text="$t('rentedBy')"
      />
      <div
        class="list-label"
        v-text="$t('functions')"
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
            :data-label="`${$t('theme')}: `"
            v-html="book.theme"
          />
          <div
            class="book-language"
            :data-label="`${$t('language')}: `"
            v-html="book.language"
          />
          <div
            class="book-owner"
            :data-label="`${$t('owner')}: `"
            v-html="book.ownerName"
          />
          <div
            class="book-renter"
            :data-label="`${$t('rentedBy')}: `"
            v-html="book.renterName"
          />
          <div
            class="book-functions"
          >
            <button
              v-if="book.ownerFbId === userFbId"
              class="button is-primary is-light is-small"
              @click="openUpdateForm(book.id)"
              v-html="$t('edit')"
            />
          </div>
        </div>
      </div>
      <div
        v-if="loadingInProgress"
        class="loader"
      >
        <div
          class="fas fa-spinner fa-pulse"
        />
      </div>
    </div>
    <div
      v-else
      class="list-empty"
      v-html="$t('noBoooks')"
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
      return this.books;
      /*
      const filterStringInLower = this.filterString.toLowerCase();
      return books.filter((book) => book.title.toLowerCase().includes(filterStringInLower)
        || book.author.toLowerCase().includes(filterStringInLower)
        || book.theme.toLowerCase().includes(filterStringInLower)
        || book.language.toLowerCase().includes(filterStringInLower)
        || book.ownerName.toLowerCase().includes(filterStringInLower));
        */
    },
    friends() {
      return this.$store.state.friends;
    },
    loadingInProgress() {
      return this.$store.state.loadingInProgress;
    },
    userFbId() {
      return this.$store.state.userData.uid;
    },
  },
  methods: {
    openAddForm() {
      this.$emit('openAddForm');
    },
    openUpdateForm(id) {
      this.$emit('openUpdateForm', id);
    },
    search() {
      this.$store.commit('SET_FILTER_STRING', this.filterString);
      this.$store.commit('SET_LAST_DOCUMENT', 0);
      this.$store.dispatch('getBooks');
    },
    setFilterType(type) {
      this.$store.commit('SET_FILTER_TYPE', type);
      this.$store.commit('SET_LAST_DOCUMENT', 0);
      this.$store.dispatch('getBooks');
    },
    toggleBookDetails(id) {
      const index = this.openDetails.findIndex((item) => item === id);
      if (index === -1) {
        this.openDetails.push(id);
      } else {
        this.openDetails.splice(index, 1);
      }
    },
  },
};
</script>

<style lang="scss">
.search-icon {
  cursor: pointer;
  pointer-events: all !important;
}

.list {
  &-filters {
    .radio {
      margin: 0 5px 0 0;
    }
  }

  &-label {
    display: none;
  }

  &-header {
    padding-bottom: 20px;
  }

  &-info {
    font-size: 14px;
    padding-bottom: 20px;
  }

  &-table {
    padding-bottom: 20px;
  }

  &-empty {
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

.loader {
  grid-column: span 7;
  text-align: center;
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
    }

    &-empty {
      padding: 30px 0;
    }
  }
}
</style>
