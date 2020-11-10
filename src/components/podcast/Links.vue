<template>
  <div class="podcast__links">
    <a href="#">
      <img :src="spotifyIcon" alt="">
      <div>
        <h6>Når liver blir forandret</h6>
        <p>Lytt til epiosde 1 i Spotify</p>
      </div>
      <img :src="arrowRightIcon" alt="">
    </a>
    <a href="#">
      <img :src="appleIcon" alt="">
      <div>
        <h6>Når liver blir forandret</h6>
        <p>Lytt til epiosde 1 i Podkaster (itunes)</p>
      </div>
      <img :src="arrowRightIcon" alt="">
    </a>
    <a href="#">
      <img :src="castboxIcon" alt="">
      <div>
        <h6>Når liver blir forandret</h6>
        <p>Lytt til epiosde 1 i Castbox</p>
      </div>
      <img :src="arrowRightIcon" alt="">
    </a>

  </div>
</template>

<script>

export default {
  name: "PodcastLinks",
  props: {

  },
  data: () => ({
    spotifyIcon: require("@/assets/images/facebook.svg"),
    appleIcon: require("@/assets/images/instagram.svg"),
    castboxIcon: require("@/assets/images/twitter.svg"),
    arrowRightIcon: require("@/assets/images/arrow-right.svg")
  }),
  watch: {

  },
  methods: {
  }
};
</script>
<style lang="scss">
.podcast__links {
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 0;
    border-bottom: 1px solid gray;
    text-decoration: none;
    img {
      height: 30px;
    }
    img:last-child{
      width: 20px;
    }
    div {
      margin-left: 1rem;
      flex-basis: 100%;
      * {
        margin: 0
      }
      h6 {
        font-size: large;
      }
      p {
        font-size: smaller;
      }
    }
  }
}
</style>
