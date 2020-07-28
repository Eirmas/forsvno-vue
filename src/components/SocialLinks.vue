<template>
  <div
    :class="['social-links', (backgroundColor) ? backgroundColor : '']"
  >
    <div class="social-links__container">
      <div
        v-html="title"
      />
      <div
        v-if="items"
        class="social-links__items-wrapper"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          class="social-links__item"
        >
          <a
            :href="item.href"
            :target="(newTab) ? '_blank' : '_self'"
          >
            <div
              v-if="item.icon && item.href"
              :style="`background-image: url('${item.icon}')`"
              class="social-links__icon"
            />
          </a>
          <div
            v-if="item.text"
            class="social-links__text underline-draw"
          >
            <a
              :href="item.href"
              :target="(newTab) ? '_blank' : '_self'"
            >
              {{ item.text }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      type: [Array, Boolean],
      default: false
    },
    newTab: {
      type: [Boolean],
      default: true
    },
    backgroundColor: {
      type: [String, undefined],
      default: undefined
    }
  }
};
</script>
