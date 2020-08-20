<template>
  <div class="story__progress-wrapper">
    <div
      ref="progress"
      v-for="(_item, i) in total"
      :key="i"
      class="story__progress"
    >
      <div
        :style="`width: ${getProgressWidth(i)}%`"
        class="story__progress-bar"
      />
    </div>
  </div>
</template>

<script>
/**
 * Isolated component for displaying the progress bar in the top of the story frame.
 */
export default {
  name: "Progress",
  props: {
    /**
     * The number of story items.
     */
    total: {
      type: Number,
      default: 0
    },
    /**
     * The progress of the current story item.
     * Represents a number between 0 and 1.
     */
    progress: {
      type: Number,
      default: 0
    },
    /**
     * The index of the current story item.
     */
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * Returns the progress width of a single story item bar.
     *
     * @param index: number
     * @returns number
     */
    getProgressWidth: function (index) {
      if (index === this.currentIndex) {
        return this.progress * 100;
      }
      return (index < this.currentIndex) ? 100 : 0;
    }
  }
};
</script>
