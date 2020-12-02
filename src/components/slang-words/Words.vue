<template>
    <div
      class="slang-words__wrapper article__top"
    >
        <div
          class="page-top__wrapper hug-top bg beige-light"
        >
            <h1>
              {{ header }}
            </h1>
            <p
              v-html="subheader"
            ></p>
            <div>
                <input
                  :placeholder="inputPlaceholder"
                  v-model="searchString"
                  type="text"
                  name="search-words"
                >
                <MagGlassIcon
                  class="slang-words__search-icon"
                />
            </div>
            <p>
              {{ `${localize["slang_words.number_of_entries"]}: ${numberEntriesInSearch}` }}
            </p>
        </div>
        <div
          class="slang-words__list"
        >
          <table>
              <thead
                v-if="numberEntriesInSearch !== 0"
              >
                <th>{{ localize["slang_words.abbreviation"] }}</th>
                <th>{{ localize["slang_words.description"] }}</th>
              </thead>
              <tbody
                v-if="items">
                <tr
                  v-for="item in updateSlangWords"
                  :key="item.word+item.description.replace(' ', '_')"
                >
                  <td>{{ item.word }}</td>
                  <td>{{ item.description }}</td>
                </tr>
              </tbody>
          </table>
            <p
              v-if="numberEntriesInSearch === 0"
            >
              {{ localize["slang_words.no_results"] }}
            </p>
            <div
              v-if="numberEntriesInSearch > index"
              class="slang-words__pagination"
            >
              <p>{{ localize["slang_words.pagination_text"].replace("{0}", index).replace("{1}", items.length) }}</p>
                  <div
                    class="slang-words__progress-bar"
                  >
                      <div
                          :style="`width: calc(${index} / ${items.length} * 100%);`"
                          class="slang-words__progress-bar-inner"
                      />
                  </div>
              <button
                @click="index += maxEntries"
                class="btn-square border-draw search__more"
              >
                {{ localize["slang_words.show_more"] }}
              </button>
            </div>
        </div>
    </div>
</template>

<script>
import MagGlassIcon from "./MagGlassIcon.vue";

export default {
  name: "Words",
  components: {
    MagGlassIcon
  },
  data: () => ({
<<<<<<< HEAD
    searchTerm: "",
    index: 0
  }),
  props: {
    header: { type: String, default: "" },
    subheader: { type: String, default: "" },
    inputPlaceholder: { type: String, default: "" },
    table1Header: { type: String, default: "" },
    table2Header: { type: String, default: "" },
    paginationIndex: { type: Number, default: 30 },
    paginationLimit: { type: Number, default: 15 },
    items: {
      word: String,
      description: String
    }
  },
  computed: {
    searchResults() {
      return this.items.filter((item) => item.word.includes(this.searchTerm) || item.description.includes(this.searchTerm));
    },
    paginatedResults() {
      return this.searchResults.slice(0, this.index);
    }
  },
  created() {
    this.index = this.paginationIndex;
=======
    /*
     * String containing the current search term
     */
    searchString: "",
    /*
     * A changable version of paginationIndex
     */
    index: 0
  }),
  props: {
    /**
     * Header
     *
     * @value string
     */
    header: {
      type: String,
      default: ""
    },
    /**
     * Subheader text
     *
     * @value string
     */
    subheader: {
      type: String,
      default: ""
    },
    /**
     * Search field placeholder
     *
     * @value string
     */
    inputPlaceholder: {
      type: String,
      default: ""
    },
    /**
     * Number of visible elements before pagination
     *
     * @value number
     */
    maxEntries: {
      type: Number,
      default: 30
    },
    /**
     * Number of new elements when paginating
     *
     * @value number
     */
    entriesStep: {
      type: Number,
      default: 15
    },
    /**
     * Words and descriptions
     *
     * @values {
     *   word: string,
     *   description: string
     * }[]
     */
    items: {
      word: String,
      description: String
    },
    /**
     * Localization
     *
     * @values {
     *   key: string,
     * }
     */
    localize: {
      type: Object
    }
  },
  methods: {
    /*
     * Returns a filtered list with all elements containing search word
     */
    filterWords: function () {
      const result = this.items.map((v) => ({
        prioritised: v.word.toLowerCase().search(this.searchString.toLowerCase()),
        secondary: v.description.toLowerCase().search(this.searchString.toLowerCase()),
        slang: v
      }));
      const prioritisedSorted = result.filter((v) => v.prioritised !== -1).sort((a, b) => (a.prioritised > b.prioritised ? 1 : -1));
      const secondarySorted = result.filter((v) => v.secondary !== -1).sort((a, b) => (a.secondary > b.secondary ? 1 : -1));
      return [...prioritisedSorted, ...secondarySorted.filter((v) => !prioritisedSorted.includes(v))].map((v) => v.slang);
    }
  },
  computed: {
    updateSlangWords: function () {
      if (!this.searchString) {
        return [...this.items].sort((a, b) => (a.word > b.word ? 1 : -1)).slice(0, this.index);
      }
      return this.filterWords().slice(0, this.index);
    },
    /*
     * Returns a list of the first nth number of elements in the search results array
     */
    numberEntriesInSearch: function () {
      if (this.searchString === "") {
        return this.items.length;
      }
      return this.filterWords().length;
    }
  },
  created() {
    this.index = this.maxEntries;
>>>>>>> slang-words
  }
};
</script>
