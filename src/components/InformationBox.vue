<template>
  <div :class="[backgroundColor, 'info-box__inner-wrapper']">
    <div class="container">
      <h3 class="info-box__title h3">{{ title }}</h3>
      <div :class="['row', isImageLeft ? '' : 'info-box__reverse']">
        <div class="col-lg-6">
          <v-img :src="image"/>
        </div>
        <div class="col-lg-6" v-html="text"/>
      </div>
    </div>
  </div>
</template>

<script>
import vuetify from "../plugins/vuetify.es6";

export default {
  vuetify: vuetify,
  props: {
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    image: {
      type: [String, Boolean],
      default: false
    },
    isImageLeft: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss">
.info-box__title {
  text-align: center;
  padding-bottom: 1em;
  font-weight: 600;
}
.info-box__inner-wrapper {
  padding: 2em 0;
}
.info-box__reverse {
  flex-direction: row-reverse;
}
</style>
