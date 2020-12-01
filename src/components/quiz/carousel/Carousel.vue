<template>
  <div class="quiz__carousel">
    <div
      ref="items"
      class="quiz__carousel-items"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    model: {
      type: Number,
      default: 0
    }
  },
  watch: {
    model: function () {
      if (this.$refs.items) {
        this.$refs.items.style.transform = `translateX(-${this.model * 100}%)`;
      }
    }
  }
};
</script>
