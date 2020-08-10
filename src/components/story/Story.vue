<template>
  <div
    ref="wrapper"
    class="stories__wrapper-inner"
  >
    <div class="container">
      <h2>{{ title }}</h2>
    </div>
    <div
      v-if="clientWidth > 991"
      class="stories__list"
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
        :key="fsKey"
        :stories="stories"
        :id="id"
        :clicked-index="fsIndex"
      />
    </div>
    <div class="grey-light">
      <div class="stories__title-wrapper">
        <div
          v-for="(story, i) in stories"
          :key="i"
          class="stories__title"
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
    fsIndex: 0,
    fsKey: 1000
  }),
  watch: {
    isOpen: function () {
      this.updateOverflow();
      this.fsKey++;
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
        this.fsIndex = obj.index;
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
      if (this.isOpen) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
      } else {
        document.body.style.overflow = "unset";
        document.body.style.position = "unset";
        document.body.style.width = "unset";
      }
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

<!--<style>-->
<!--.stories__wrapper-inner {-->
<!--  text-align: center;-->
<!--  padding: 5rem 0;-->
<!--  position: relative;-->
<!--}-->
<!--.stories__wrapper-inner h2 {-->
<!--  font-size: 2rem;-->
<!--  margin-bottom: 6rem;-->
<!--  font-weight: 500;-->
<!--  max-width: 42rem;-->
<!--  margin-left: auto;-->
<!--  margin-right: auto;-->
<!--}-->
<!--.stories__list {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  background: linear-gradient(180deg, transparent 50%, #f5f7f8 50%);-->
<!--}-->
<!--.stories__title {-->
<!--  width: 252px;-->
<!--  overflow-wrap: break-word;-->
<!--  word-break: break-word;-->
<!--  -webkit-hyphens: auto;-->
<!--  -ms-hyphens: auto;-->
<!--  hyphens: auto;-->
<!--  margin: 1.5rem;-->
<!--  font-weight: 500;-->
<!--  font-size: 1.125rem;-->
<!--  line-height: 1.4;-->
<!--}-->
<!--.stories__title-wrapper {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  padding-bottom: 5rem;-->
<!--}-->
<!--@media (max-width: 991px) {-->
<!--  .stories__title {-->
<!--    width: 90px;-->
<!--    margin: 1rem;-->
<!--    margin-top: .6rem;-->
<!--    font-size: .875rem;-->
<!--    line-height: 1.4;-->
<!--  }-->
<!--}-->
<!--@media (max-width: 767px) {-->
<!--  .stories__wrapper-inner {-->
<!--    padding: 2rem 0;-->
<!--  }-->
<!--}-->
<!--@media (max-width: 366px) {-->
<!--  .stories__title {-->
<!--    margin: .25rem;-->
<!--  }-->
<!--}-->
<!--</style>-->
