<template>
  <div class="quiz__carousel-content">
    <div class="quiz_-carousel-content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselContent",
  props: {
    step: Number
  }
};
</script>
