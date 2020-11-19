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
            :href="link.url"
          >
            <img
              :src="icons.arrowRight"
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
      <div class="podcast__inner-container podcast__sm-player">
        <h4 class="podcast__player-header">{{ audio.header }}</h4>
        <Player
          :title="audio.title"
          :subHeader="audio.subheader"
          :description="audio.description"
          :cover="audio.cover"
          :service="audio.service"
          :icons="icons"
        />
      </div>
      <div class="podcast__inner-container">
        <h4>{{ linksHeader }}</h4>
        <Links
          :links="links"
          :icons="icons"
        />
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
    },
    /**
     * Object that contains all icons for the forms
     *
     * @values {
     *  arrow-right: string,
     *  play: string,
     *  pause: string,
     *  volume: string
     * }
     */
    icons: {
      type: [Object, Boolean],
      default: false
    }
  },
  components: {
    Player,
    Links
  }
};
</script>
