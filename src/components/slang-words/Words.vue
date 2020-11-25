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
                  v-model="searchTerm"
                  type="text"
                  name="search-words"
                >
                <MagGlassIcon
                  class="slang-words__search-icon"
                />
            </div>
            <p>
              Antall forkortelser: {{ searchResults.length }}
            </p>
        </div>
        <div
          class="slang-words__list"
        >
          <table>
              <thead
                v-if="paginatedResults.length !== 0"
              >
                <th>Forkortelse</th>
                <th>Beskrivelse</th>
              </thead>
              <tbody
                v-if="items">
                <tr
                  v-for="item in paginatedResults"
                  :key="item.word+item.description.slice(0, 10)"
                >
                  <td>{{ item.word }}</td>
                  <td>{{ item.description }}</td>
                </tr>
              </tbody>
          </table>
            <p
              v-if="paginatedResults.length === 0"
            >
              Ingen resultater
            </p>
            <div
              v-if="searchResults.length > index"
              class="slang-words__pagination"
            >
              <p>Viser {{ paginatedResults.length }} av {{ items.length }} resultater</p>
                  <div
                    class="slang-words__progress-bar"
                  >
                      <div
                          :style="`width: calc(${paginatedResults.length} / ${items.length} * 100%);`"
                          class="slang-words__progress-bar-inner"
                      />
                  </div>
              <button
                @click="index += paginationLimit"
                class="btn-square border-draw search__more"
              >
                Vis flere
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
    /*
     * String containing the current search term
     */
    searchTerm: "",
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
    paginationIndex: {
      type: Number,
      default: 30
    },
    /**
     * Number of new elements when paginating
     *
     * @value number
     */
    paginationLimit: {
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
    }
  },
  mounted() {
    /* const articleTop = document.getElementsByClassName("article__top")[0];
    if (this.removeTop && articleTop) {
      articleTop.parentNode.removeChild(articleTop);
    } */
  },
  computed: {
    /*
     * Returns a filtered list with all elements containing search word
     */
    searchResults() {
      return this.items.filter((item) => item.word.includes(this.searchTerm) || item.description.includes(this.searchTerm));
    },
    /*
     * Returns a list of the first nth number of elements in the search results array
     */
    paginatedResults() {
      return this.searchResults.slice(0, this.index);
    }
  },
  created() {
    this.index = this.paginationIndex;
  }
};
</script>
