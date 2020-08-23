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
        :thumbnail-override="story.thumbnailOverride"
        :profile-pic="story.profilePic"
        :story-items="story.storyItems"
      />
    </div>
    <div
      v-else
      :class="['stories__list', (background.color && background.twoTone) ? `stories__list-two-tone-${background.color}` : '']"
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
/**
 * Main component for the story part.
 */

export default {
  name: "Story",
  props: {
    /**
     * Array of stories.
     *
     * @values {
     *    title: string;
     *    profilePic: string;
     *    storyItems: {
     *        type: string;
     *        image: string | Boolean;
     *        video: QBrick | Boolean;
     *    }
     *    thumbnailOverride: string | Boolean;
     * }[] || Boolean;
     */
    stories: {
      type: [Array, Boolean],
      default: false
    },
    /**
     * Title to the component. Lies above the stories
     *
     * @values string
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * Background to the stories component.
     *
     * @values { color: string; twoTone: boolean } || Boolean
     */
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
    /**
     * Width of the story component.
     */
    clientWidth: 0,
    /**
     * Determines if the mobile modal overlay is visible.
     */
    isOpen: false,
    /**
     * The id of the part. This is used to make sure the components only talk to their own children over eventbus emits.
     */
    id: v1(),
    /**
     *  When on mobile and an user clicks a story, this number represents the clicked story to make sure the modal
     *  starts playing the correct story.
     */
    clickedIndex: 0,
    /**
     * Makes sure components re-render properly. Is bound to a component key. When modified; components with their keys bound
     * will re-render. It does not really matter what the value of this number is.
     */
    renderKey: 1000
  }),
  watch: {
    /**
     * Watches the isOpen variable. When changed we update the renderkey and re-check the body overflow.
     */
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
    /**
     * Function used to open the mobile modal.
     * @param obj: { id: string; index: number }
     */
    open: function (obj) {
      if (obj.id === this.id && obj.index !== undefined) {
        this.clickedIndex = obj.index;
        this.isOpen = true;
      }
    },
    /**
     * Function used to close the mobile modal.
     * @param id: string
     */
    close: function (id) {
      if (id === this.id) {
        this.isOpen = false;
      }
    },
    /**
     * Function that triggers on resize events.
     */
    onResize: function () {
      this.updateClientWidth();
      this.updateOverflow();
    },
    /**
     * When the modal is open we have to disable scrolling of the body.
     * We do this to make interaction with the story better and to prevent scrolling
     * of the body.
     * Without this functionality it is harder to navigate the mobile modal.
     */
    updateOverflow: function () {
      document.body.style.overflow = (this.isOpen) ? "hidden" : "unset";
      document.body.style.position = (this.isOpen) ? "fixed" : "unset";
      document.body.style.width = (this.isOpen) ? "100%" : "unset";
    },
    /**
     * Updates the clientWidth variable.
     */
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
