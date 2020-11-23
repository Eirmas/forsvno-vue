<template>
  <div class="podcast__links">
    <template v-for="link in links">
      <a :href="link.link" v-bind:key="link.link">
        <img :src="link.icon" alt="">
        <div>
          <h6>{{ link.title }}</h6>
          <p>{{ link.subtitle }}</p>
        </div>
        <img :src="arrowRightIcon" alt="">
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
    }
  },
  data: () => ({
    arrowRightIcon: require("@/assets/images/arrow-right.svg")
  })
};
</script>
<style lang="scss">
.podcast__links {
  display: flex;
  justify-content: stretch;
  height: calc(100% - 3.375rem);
  flex-direction: column;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 0;
    border-bottom: 1px solid gray;
    text-decoration: none;
    img {
      min-width: 40px;
      max-width: 40px;
    }
    img:last-child{
      min-width: 25px;
      max-width: 25px;
      transition: all .2s ease;
    }
    div {
      margin-left: 1rem;
      flex-basis: 100%;
      * {
        margin: 0
      }
      h6 {
        font-size: 22px;
        font-weight: 500;
        line-height: 169.2%;
      }
      p {
        font-size: 16px;
        line-height: 169.2%;
      }
    }
  }
  a:hover {
    text-decoration: none;
    div {
      h6 {
        text-decoration: underline;
      }
    }
    img:last-child {
      transform: translateX(10%);
    }
  }
}
</style>
