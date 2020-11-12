<template>
  <div class="podcast__links">
    <a href="#">
      <img :src="spotifyIcon" alt="">
      <div>
        <h6>Når livet blir forandret</h6>
        <p>Lytt til epiosde 1 i Spotify</p>
      </div>
      <img :src="arrowRightIcon" alt="">
    </a>
    <a href="#">
      <img :src="appleIcon" alt="">
      <div>
        <h6>Når livet blir forandret</h6>
        <p>Lytt til epiosde 1 i Apple Podcasts</p>
      </div>
      <img :src="arrowRightIcon" alt="">
    </a>
    <a href="#">
      <img :src="castboxIcon" alt="">
      <div>
        <h6>Når livet blir forandret</h6>
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
    spotifyIcon: require("@/assets/images/spotify.svg"),
    appleIcon: require("@/assets/images/apple-podcasts.svg"),
    castboxIcon: require("@/assets/images/castbox.svg"),
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
  }
}
</style>
