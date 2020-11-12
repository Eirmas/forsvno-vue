<template>
  <div
    class="podcast__wrapper-inner"
  >
    <h1>Episode 1</h1>
    <div class="podcast__element">
      <div class="podcast__inner-container">
        <div class="podcast__article-img">
          <img :src="cover" alt="">
        </div>
      </div>
      <div class="podcast__inner-container">
        <div class="podcast__article">
          <h4>Når livet blir forandret</h4>
          <p>
              På bakken i Gao dukker det opp en uanmeldt passasjer. Geir må ta en avgjørelse. Og Tom står like ved når det smeller.
              Fram til november 2019 er norske soldater på oppdrag i Mali. Der deltar de i det som omtales som verdens farligste FN-oppdrag. Del 2 av 2.
          </p>
          <a href="#">
            <img :src="arrowRightIcon" alt="">Les hele historien til Helge
          </a>
        </div>
      </div>
    </div>

    <div class="podcast__element">
      <div class="podcast__inner-container">
        <h4 class="podcast__player-header">VÅRE HISTORIER - EN PODKAST FRA FORSVARET</h4>
        <Player />
      </div>
      <div class="podcast__inner-container">
        <h4>STRØMMING</h4>
        <Links />
      </div>
    </div>
  </div>
</template>

<script>
import Player from "./Player.vue";
import Links from "./Links.vue";

export default {
  name: "Podcast",
  props: {

  },
  components: {
    Player,
    Links
  },
  data: () => ({
    cover: require("@/assets/images/man.jpg"),
    arrowRightIcon: require("@/assets/images/arrow-right.svg")
  }),
  watch: {

  },
  methods: {
  }
};
</script>
<style lang="scss">
.podcast__wrapper-inner {
  background: #F5F7F8;
  padding-bottom: 4rem;
  h1 {
    text-align: center;
    font-size: 42px;
    padding: 4rem 0 6rem 0;
    font-weight: 500;
  }
  .podcast__element {
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .podcast__inner-container{
      width: 480px;
      margin: 1rem 4rem;
      .podcast__article {
         h4 {
          font-size: 24px;
          font-weight: 500;
          letter-spacing: normal;
          line-height: 26px;
        }
        p {
          font-size: 18px;
          font-weight: 400;
          line-height: 30.5px;
        }
        a{
          font-size: 18px;
          line-height: 30px;
          img{
            width: 25px;
            margin-right: 1.5rem;
          }
        }
      }
      .podcast__article-img {
        img {
          width: 100%;
        }
      }
      h4 {
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 1rem;
        letter-spacing: 0.24em;
      }
      .podcast__player-header {
        margin-left: 1.5rem;
      }
    }
  }
}
</style>
