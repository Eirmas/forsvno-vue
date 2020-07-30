<template>
  <div :class="['info-box__wrapper-inner', backgroundColor]">
    <div class="container">
      <h2 class="info-box__title">{{ title }}</h2>
      <div :class="['row', isImageLeft ? '' : 'info-box__reverse']">
        <div class="info-box__image col-lg-6">
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
  padding-bottom: 2.75rem;
  font-size: 2.625rem;
  font-weight: 500;
}
.info-box__reverse {
  flex-direction: row-reverse;
}
.info-box__wrapper-inner {
  padding: 3rem 0;
}
.info-box__image {
  align-self: center;
}
.info-box__wrapper {
  padding: 5rem 0;
}
@media (max-width: 991px) {
  .info-box__wrapper {
    padding: 2rem 0;
  }
}
</style>
