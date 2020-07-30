<template>
  <div
    v-if="data"
    class="diagram__legend"
  >
    <div
      v-for="(item, i) in data"
      class="diagram__legend-item"
      :key="i"
    >
      <div
        :style="`background-color: ${colors[i]}`"
        class="diagram__legend-item-color"
      />
      <div
        class="diagram__legend-item-text"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Legend",
  props: {
    data: {
      type: [Array, Boolean],
      default: false
    },
    colors: {
      type: [Array, Boolean],
      default: false
    }
  }
};
</script>

<style scoped>
.diagram__legend {
  max-width: 680px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.diagram__legend-item {
  display: flex;
  padding: 0.5rem;
  align-items: center;
}
.diagram__legend-item-color {
  width: 1rem;
  height: 1rem;
  min-width: 1rem;
  min-height: 1rem;
  border-radius: 100%;
  margin-right: .75rem
}
.diagram__legend-item-text {
  font-weight: 600;
}
</style>
