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
export default {
  name: "Progress",
  props: {
    total: {
      type: Number,
      default: 0
    },
    progress: {
      type: Number,
      default: 0
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getProgressWidth: function (index) {
      if (index === this.currentIndex) {
        return this.progress * 100;
      }
      return (index < this.currentIndex) ? "100" : "0";
    }
  }
};
</script>
