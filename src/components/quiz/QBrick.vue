<template>
  <div
    ref="wrapper"
    style="width:100%;"
  >
    <div
      ref="player"
    />
    <div
      v-if="!play"
      class="quiz__video-thumbnail"
      @click="onPlayButtonClick"
    >
      <img
        ref="thumbnail"
        :src="thumbnail"
        style="width: 100%"
        alt="thumbnail"
      />
      <div
        class="quiz__video-thumbnail-play"
      />
    </div>
  </div>
</template>

<script>
import { v1 } from "uuid";
import EventBus from "../../event-bus.es6";

export default {
  name: "QBrick",
  props: {
    config: {
      type: [String, Boolean],
      default: false
    },
    qbrick: {
      type: [Object, Boolean],
      default: false
    }
  },
  data: () => ({
    widget: undefined,
    play: false,
    width: 0
  }),
  mounted() {
    EventBus.$on("quiz__next", this.onResize);
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onResize: function () {
      this.play = false;
      if (this.widget) {
        this.widget.pause();
        this.widget.destroy();
      }
      if (this.$refs.player) {
        this.$refs.player.innerHTML = "";
      }
      this.widget = undefined;
    },
    onPlayButtonClick: function () {
      this.width = this.$refs.thumbnail.clientWidth;
      this.play = true;
      this.create();
    },
    create: function () {
      // eslint-disable-next-line
      this.widget = GoBrain.create(this.$refs.player, this.embedSettings)
    },
    getFormat: function () {
      const data = this.qbrick.data;
      const resources = data.qbrick.asset.resources;
      const video = resources.filter((v) => v.type && v.type === "video");
      if (video.length > 0 && video[0].renditions.length > 0) {
        const videoData = video[0].renditions.sort((a, b) => (a.size < b.size ? 1 : -1))[0].videos;
        if (videoData && videoData.height && videoData.width) {
          return {
            width: videoData.width,
            height: videoData.height
          };
        }
      }
      return {
        width: 448,
        height: 252
      };
    }
  },
  computed: {
    thumbnail: function () {
      const data = this.qbrick.data;
      const resources = data.qbrick.asset.resources;
      const image = resources.filter((v) => v.rel && v.rel === "thumbnail");
      if (image.length > 0 && image[0].renditions.length > 0) {
        const imageData = image[0].renditions.sort((a, b) => (a.size < b.size ? 1 : -1))[0];
        return imageData.links.href;
      }
      return "";
    },
    embedSettings: function () {
      return {
        autoplay: true,
        widgetId: v1(),
        config: this.config || this.qbrick.data.qbrick.html["data-gobrain-config"],
        data: this.qbrick.data.qbrick.html["data-gobrain-data"],
        width: this.width,
        height: this.width * (this.getFormat().height / this.getFormat().width),
        repeat: false
      };
    }
  },
  beforeDestroy() {
    EventBus.$off("quiz__next", this.onResize);
    window.removeEventListener("resize", this.onResize);
    if (this.widget) {
      this.widget.pause();
      this.widget.destroy();
    }
  }
};
</script>
