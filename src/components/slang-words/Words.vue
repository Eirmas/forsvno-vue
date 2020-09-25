<template>
    <div class="slang-words__wrapper">
        <div class="page-top__wrapper hug-top bg bg-beige-light">
            <h1>{{ header }}</h1>
            <p v-html="subheader"></p>
            <div>
                <input :placeholder="inputPlaceholder" v-model="searchTerm" type="text" name="search-words" >
                <MagGlassIcon class="slang-words__search-icon"/>
            </div>
            <p>Antall forkortelser: {{ searchResults.length }}</p>
        </div>
        <div class="slang-words__list">
            <table>
                <thead v-if="paginatedResults.length !== 0">
                    <th>{{ table1Header }}</th>
                    <th>{{ table2Header }}</th>
                </thead>
                <tbody v-if="items">
                    <tr v-for="item in paginatedResults" :key="item.word+item.description.slice(0, 10)">
                        <td>{{ item.word }}</td>
                        <td>{{ item.description }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-if="paginatedResults.length === 0">Ingen resultater</p>
            <div v-if="searchResults.length > index" class="slang-words__pagination">
                <p>Viser {{ paginatedResults.length }} av {{ items.length }} resultater</p>
                    <div class="slang-words__progress-bar">
                        <div
                            :style="`width: calc(${paginatedResults.length} / ${items.length} * 100%);`"
                            class="slang-words__progress-bar-inner"
                        />
                    </div>
                <button @click="index += paginationLimit" class="btn-square border-draw search__more">Vis flere</button>
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
  }
};
</script>
