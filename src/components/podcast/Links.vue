<template>
  <div class="podcast__links">
    <template v-for="link in links">
      <a :href="link.link" v-bind:key="link.link">
        <img :src="link.icon" :alt="link.caption">
        <div>
          <h6>{{ link.title }}</h6>
          <p>{{ link.subtitle }}</p>
        </div>
        <img :src="icons.arrowRight" alt="">
      </a>
    </template>
  </div>
</template>
<script>

export default {
  name: "PodcastLinks",
  props: {
    /**
     * Links
     *
     * @values [
     *   {
     *     title: string,
     *     subtitle: string,
     *     link: string,
     *     icon: string
     *   }
     * ] | boolean
     */
    links: {
      type: Array
    },
    /**
     * Object that contains all icons for the forms
     *
     * @values {
     *  arrowRight: string,
     *  play: string,
     *  pause: string,
     *  volume: string
     * }
     */
    icons: {
      type: [Object, Boolean],
      default: false
    }
  }
};
</script>
