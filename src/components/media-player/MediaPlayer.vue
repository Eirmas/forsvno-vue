<template>
  <div
    class="media-player__wrapper-inner"
  >
    <h1>{{ title }}</h1>
    <div
      class="media-player__element"
    >
      <div
        class="media-player__inner-container"
      >
        <div
          class="media-player__article-img"
        >
          <img
            :src="image"
          >
        </div>
      </div>
      <div
        class="media-player__inner-container"
      >
        <div
          class="media-player__article underline-draw__root underline-reverse"
        >
          <h4>
            {{ subtitle }}
          </h4>
          <p>
            {{ ingress }}
          </p>
          <a
            :href="link.url"
          >
            <img
              :src="icons.arrowRight"
              alt="Pil høyre"
            >
            <span
              class="underline-draw__target"
            >
              {{ link.text }}
            </span>
          </a>
        </div>
      </div>
    </div>

    <div
      class="media-player__element"
    >
      <div
        class="media-player__inner-container media-player__sm-player"
      >
        <h4
          class="media-player__player-header"
        >
          {{ mediaHeader }}
        </h4>
        <Player
          :title="audio.title"
          :header="audio.header"
          :description="audio.description"
          :cover="audio.cover"
          :src="audio.src"
          :waveData="audio.waveData"
          :icons="icons"
        />
      </div>
      <div
        class="media-player__inner-container"
      >
        <h4>
          {{ linksHeader }}
        </h4>
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
     * Media header
     *
     * @values string
     */
    mediaHeader: {
      type: String
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
    },
    server: String
  },
  components: {
    Player,
    Links
  }
};
</script>
