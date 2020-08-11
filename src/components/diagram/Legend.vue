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
