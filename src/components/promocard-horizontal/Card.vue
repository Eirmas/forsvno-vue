<template>
  <li
    class="promocard-horizontal__card"
  >
    <div
      class="promocard-horizontal__card-head"
    >
      <span>{{ card.title }}</span>
    </div>
    <div
      class="promocard-horizontal__card-body"
    >
      <div
        class="promocard-horizontal__card-body-wrapper"
      >
        <div
          v-if="card.decoration"
          class="promocard-horizontal__card-decoration"
        >
          <img
            :src="card.decoration.icon.src"
            alt="ikon"
          >
          <div
            v-if="card.decoration.caption"
            class="promocard-horizontal__card-decoration-caption"
          >
            <span>{{ card.decoration.caption }}</span>
          </div>
        </div>
        <span>{{ card.text }}</span>
      </div>
    </div>
    <div
      class="promocard-horizontal__card-footer"
    />
  </li>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: {
      type: [Object, Boolean],
      default: false
    }
  }
};
</script>
