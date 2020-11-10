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
        <h4>VÅRE HISTORIER - EN PODKAST FRA FORSVARET</h4>
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
  h1 {
    text-align: center;
    font-size: 42px;
    padding: 2rem;
    font-weight: bold;
  }
  .podcast__element {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .podcast__inner-container{
      width: 400px;
      margin: 1rem 4rem;
      .podcast__article {
         h4 {
          font-size: 24px;
        }
        a{
          font-size: 18px;
          img{
            width: 20px;
            margin-right: .5rem;
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
      }
    }
  }
}
</style>
