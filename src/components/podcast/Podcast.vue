<template>
  <div
    class="podcast__wrapper-inner"
  >
    <h1>{{ title }}</h1>
    <div class="podcast__element">
      <div class="podcast__inner-container">
        <div class="podcast__article-img">
          <img :src="image" alt=""> <!-- Husk alt -->
        </div>
      </div>
      <div class="podcast__inner-container">
        <div class="podcast__article underline-draw__root underline-reverse">
          <h4>{{ subtitle }}</h4>
          <p>{{ ingress }}</p>
          <a
            :href="link.link"
          >
            <img
              :src="arrowRightIcon"
              alt="Pil høyre"
            ><span
              class="underline-draw__target"
            >{{ link.text }}
            </span>
          </a>
        </div>
      </div>
    </div>

    <div class="podcast__element">
      <div class="podcast__inner-container">
        <h4 class="podcast__player-header">{{ audio.header }}</h4>
        <Player
          :title="audio.title"
          :subHeader="audio.subheader"
          :description="audio.description"
          :cover="audio.cover"
          :service="audio.service"
        />
      </div>
      <div class="podcast__inner-container">
        <h4>{{ linksHeader }}</h4>
        <Links :links="links"/>
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
    /**
     * Title
     *
     * @values string
     */
    title: {
      type: String
    },
    /**
     * Image
     *
     * @values string
     */
    image: {
      type: String
    },
    /**
     * Subtitle
     *
     * @values string
     */
    subtitle: {
      type: String
    },
    /**
     * Ingress
     *
     * @values string
     */
    ingress: {
      type: String
    },
    /**
     * Link
     *
     * @values object
     */
    link: {
      type: Object
    },
    /**
     * Audio content
     *
     * @values object
     */
    audio: {
      type: Object
    },
    /**
     * Links header
     *
     * @values string
     */
    linksHeader: {
      type: String
    },
    /**
     * Links
     *
     * @values [
     *  {
     *    link: string,
     *    title: string,
     *    subtitle: string,
     *    icon: string
     *  }
     * ]
     */
    links: {
      type: Array
    }
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
          line-height: 32px;
          text-decoration: none;
          img{
            height: 17px;
            margin-right: 1.5rem;
            transition: all .2s ease;
          }
        }
        a:hover img{
          transform: translateX(10%);
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
        text-transform: uppercase;
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
