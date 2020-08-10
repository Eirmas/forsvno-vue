<template>
  <div class="story__progress-wrapper">
    <div
      ref="progress"
      v-for="(item, i) in total"
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

<!--<style>-->
<!--.story__progress {-->
<!--  margin: 6px 3px 0 3px;-->
<!--  width: 100%;-->
<!--  height: 2px;-->
<!--  background: rgba(255, 255, 255, 0.5);-->
<!--  border-radius: 5px;-->
<!--  overflow: hidden;-->
<!--}-->
<!--.story__progress-bar {-->
<!--  background: rgba(255, 255, 255, 1);-->
<!--  transition: width 125ms linear;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->
<!--.story__progress-wrapper {-->
<!--  display: flex;-->
<!--  padding: 0 calc(.5rem - 3px);-->
<!--}-->
<!--</style>-->
