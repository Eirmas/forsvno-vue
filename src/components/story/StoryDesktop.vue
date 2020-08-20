<template>
  <div
    :style="`background-image: url('${thumbnail}');`"
    :class="(isSeen) ? 'story__wrapper-seen story__wrapper' : 'story__wrapper'"
  >
    <div
      v-if="currentIndex === -1"
      :style="`width:${width}px;height:${height}px;`"
      class="story__thumbnail"
    >
      <button
        :class="isSeen ? 'story__replay' : 'story__play'"
        @click="storyPlay()"
      >
        <ReplayIcon v-if="isSeen"/>
      </button>
    </div>
    <div
      v-show="isPlaying"
      class="story__header"
    >
      <template
        v-for="(_item, i) in storyItems"
      >
        <Progress
          v-if="i === currentIndex"
          :key="i"
          :total="storyItems.length"
          :progress="storyItemProgress"
          :current-index="currentIndex"
        />
      </template>
      <div class="story__user">
        <div class="story__user-wrapper">
          <div
            :style="`background-image: url('${profilePic}');`"
            class="story__user-pic"
          />
          <p class="story__user-title">{{ title }}</p>
        </div>
        <button
          class="story__user-close"
          @click="storyStop"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
    <div
      v-if="currentIndex > -1"
      class="story__controller"
    >
      <button
        class="story__controller-left"
        @click="playPrev"
      />
      <button
        class="story__controller-right"
        @click="playNext"
      />
    </div>
    <StoryVideo
      v-if="currentIndex !== -1 && storyItems[currentIndex].type === 'video'"
      ref="qbrick"
      :key="renderKey"
      :qbrick="storyItems[currentIndex].qbrick"
      :on-progress="progress"
      :on-play-complete="playComplete"
      :autoplay="true"
      :height="height"
      :width="width"
    />
    <StoryImage
      v-if="currentIndex !== -1 && storyItems[currentIndex].type === 'image'"
      ref="image"
      :key="renderKey"
      :height="height"
      :width="width"
      :on-progress="progress"
      :autoplay="true"
      :on-play-complete="playComplete"
      :image="storyItems[currentIndex].image"
    />
  </div>
</template>

<script>
import StoryVideo from "./StoryVideo.vue";
import StoryImage from "./StoryImage.vue";
import ReplayIcon from "./ReplayIcon.vue";
import CloseIcon from "./CloseIcon.vue";
import Progress from "./Progress.vue";

/**
 * Part for displaying stories on a desktop (window.innerWidth > 991px).
 */
export default {
  name: "Story",
  data: () => ({
    /**
     * Determines if the story is playing.
     * When false -> thumbnail and play/replay button is displayed.
     * When true -> story is playing.
     */
    isPlaying: false,
    /**
     * Index of the current story item.
     */
    currentIndex: -1,
    /**
     * Height of the story frame.
     */
    height: 448,
    /**
     * Width of the story frame.
     */
    width: 252,
    /**
     * The progress of the story.
     * Represents a number between 0 and 1.
     */
    storyItemProgress: 0,
    /**
     * A renderKey is used to update components to make sure they re-initialize correctly.
     * It's bound to the StoryVideo and StoryImage component key. When changed it makes the component re-render.
     */
    renderKey: 0,
    /**
     * Variable that determines weather the story has been seen by the user.
     * When false -> A replay button and overlay is displayed when not playing.
     * When true -> A play button and no overlay is displayed when not playing.
     */
    isSeen: false
  }),
  props: {
    /**
     * String that appears underneath the story frame.
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * String with url to a profile picture
     */
    profilePic: {
      type: String,
      default: ""
    },
    /**
     * Array that holds the story items.
     * @values {
     *   type: string; // "image"|"video"
     *   video: object | undefined;
     *   image: string | undefined;
     * }[]
     */
    storyItems: {
      type: [Array, Boolean],
      default: false
    },
    /**
     * Optional field to override the thumbnail showing.
     */
    thumbnailOverride: {
      type: [String, Boolean],
      default: false
    }
  },
  components: {
    Progress,
    StoryVideo,
    StoryImage,
    ReplayIcon,
    CloseIcon
  },
  methods: {
    /**
     * Starts playing the story. Removes play button and thumbnail
     */
    storyPlay: function () {
      this.isPlaying = true;
      this.playNext();
    },
    /**
     * Stops playing the story. Sets story to "seen" to display replay button
     */
    storyStop: function () {
      this.isPlaying = false;
      this.currentIndex = -1;
      this.isSeen = true;
    },
    /**
     * Goes to the next story item in the story.
     * If there is no next item, the story is complete and stops.
     */
    playNext: function () {
      if (this.currentIndex + 1 < this.storyItems.length) {
        this.currentIndex++;
      } else {
        this.storyStop();
      }
      this.renderKey++;
      this.storyItemProgress = 0;
    },
    /**
     * Goes to the previous story item in the story.
     * If there is no previous story item, the current one replays due to the
     * update of the renderKey.
     */
    playPrev: function () {
      if (this.currentIndex - 1 >= 0) {
        this.currentIndex--;
      }
      this.renderKey++;
      this.storyItemProgress = 0;
    },
    /**
     * This function is passed as a onProgress callback to the StoryVideo/StoryImage component.
     * It's responsible for updating the progress of the current story item to update the
     * progress bar.
     *
     * @param progress: number
     */
    progress: function (progress) {
      this.storyItemProgress = progress;
    },
    /**
     * This function is passed to the story items onPlayComplete callback.
     * This function makes sure the next story items plays when the current one is complete.
     */
    playComplete: function () {
      this.playNext();
    },
    /**
     * This is the sortfunction to finding the thumbnail of best quality.
     * It had to be extracted to its own function due to a infitite loop bug.
     */
    sortFunc: function (a, b) {
      return a.size < b.size ? 1 : -1;
    }
  },
  computed: {
    /**
     * This computed property return a thumbnail url
     * @returns {string}
     */
    thumbnail: function () {
      if (this.thumbnailOverride) {
        return this.thumbnailOverride;
      }
      if (this.storyItems[0].type === "video") {
        const resources = this.storyItems[0].qbrick.data.qbrick.asset.resources;
        const thumbnail = resources.filter((v) => v.rel && v.rel === "thumbnail");
        return thumbnail[0].renditions.sort(this.sortFunc)[0].links.href;
      }
      return this.storyItems[0].image || "";
    }
  }
};
</script>
