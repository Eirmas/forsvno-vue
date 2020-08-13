<template>
  <div
    ref="wrapper"
    :class="['stories__wrapper-inner', (background.color && !background.twoTone) ? background.color : '']"
  >
    <div class="container">
      <h2>{{ title }}</h2>
    </div>
    <div
      v-if="clientWidth > 991"
      :class="['stories__list', (background.color && background.twoTone) ? `stories__list-two-tone-${background.color}` : '']"
    >
      <StoryDesktop
        v-for="(story, i) in stories"
        :key="i"
        :title="story.title"
        :thumbnail-override="story.thumbnail"
        :profile-pic="story.profilePic"
        :story-items="story.storyItems"
      />
    </div>
    <div
      v-else
      class="stories__list"
    >
      <StoryMobile
        v-for="(story, i) in stories"
        :key="i"
        :title="story.title"
        :profile-pic="story.profilePic"
        :story-items="story.storyItems"
        :index="i"
        :id="id"
      />
      <StoryMobileFullscreen
        v-if="isOpen"
        :key="renderKey"
        :stories="stories"
        :id="id"
        :clicked-index="clickedIndex"
      />
    </div>
    <div :class="(background.color && background.twoTone) ? background.color : ''">
      <div class="stories__title-wrapper">
        <div
          v-for="(story, i) in stories"
          :key="i"
          :class="['stories__title',(clientWidth < 991) ? 'stories__title-break' : '']"
        >
          {{ story.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v1 } from "uuid";
import EventBus from "../../event-bus.es6";
import StoryDesktop from "./StoryDesktop.vue";
import StoryMobile from "./StoryMobile.vue";
import StoryMobileFullscreen from "./StoryMobileFullscreen.vue";

export default {
  name: "Story",
  props: {
    stories: {
      type: [Array, Boolean],
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    background: {
      type: [Object, Boolean],
      default: false
    }
  },
  components: {
    StoryDesktop,
    StoryMobile,
    StoryMobileFullscreen
  },
  data: () => ({
    clientWidth: false,
    isOpen: false,
    id: v1(),
    clickedIndex: 0,
    renderKey: 1000
  }),
  watch: {
    isOpen: function () {
      this.updateOverflow();
      this.renderKey++;
    }
  },
  created() {
    this.updateOverflow();
    EventBus.$on("story__fullscreen-open", this.open);
    EventBus.$on("story__fullscreen-close", this.close);
  },
  mounted() {
    this.updateClientWidth();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    open: function (obj) {
      if (obj.id === this.id && obj.index !== undefined) {
        this.clickedIndex = obj.index;
        this.isOpen = true;
      }
    },
    close: function (id) {
      if (id === this.id) {
        this.isOpen = false;
      }
    },
    onResize: function () {
      this.updateClientWidth();
      this.updateOverflow();
    },
    updateOverflow: function () {
      document.body.style.overflow = (this.isOpen) ? "hidden" : "unset";
      document.body.style.position = (this.isOpen) ? "fixed" : "unset";
      document.body.style.width = (this.isOpen) ? "100%" : "unset";
    },
    updateClientWidth: function () {
      if (this.$refs.wrapper) {
        this.clientWidth = this.$refs.wrapper.clientWidth;
      }
    }
  },
  beforeDestroy() {
    EventBus.$off("story__fullscreen-open", this.open);
    EventBus.$off("story__fullscreen-close", this.close);
    this.isOpen = false;
    this.updateOverflow();
  }
};
</script>
