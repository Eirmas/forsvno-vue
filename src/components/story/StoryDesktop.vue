<template>
  <div
    :style="`background-image: url('${thumbnail}');`"
    :class="(isSeen) ? 'story__wrapper-seen story__wrapper' : 'story__wrapper'"
  >
    <div
      v-show="isPlaying"
      class="story__header"
    >
      <template
        v-for="(item, i) in storyItems"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="3.5 3.5 17 17"
            style="vertical-align: top;"
          >
            <line
              style="fill:none;stroke:#FFFFFF;stroke-width:1;stroke-miterlimit:10;"
              x1="7"
              y1="7"
              x2="17"
              y2="17"
            />
            <line
              style="fill:none;stroke:#FFFFFF;stroke-width:1;stroke-miterlimit:10;"
              x1="7"
              y1="17"
              x2="17"
              y2="7"
            />
          </svg>
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
    <Video
      v-else-if="storyItems[currentIndex].type === 'video'"
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
      v-else-if="storyItems[currentIndex].type === 'image'"
      ref="image"
      :key="renderKey"
      :height="height"
      :width="width"
      :on-progress="progress"
      :on-play-complete="playComplete"
      :image="storyItems[currentIndex].image"
    />
  </div>
</template>

<script>
import Video from "./StoryVideo.vue";
import StoryImage from "./StoryImage.vue";
import ReplayIcon from "./ReplayIcon.vue";
import Progress from "./Progress.vue";

export default {
  name: "Story",
  data: () => ({
    isPlaying: false,
    currentIndex: -1,
    height: 448,
    width: 252,
    storyItemProgress: 0,
    renderKey: 0,
    isSeen: false
  }),
  props: {
    title: {
      type: String,
      default: ""
    },
    profilePic: {
      type: String,
      default: ""
    },
    storyItems: {
      type: [Array, Boolean],
      default: false
    },
    thumbnailOverride: {
      type: [String, Boolean],
      default: false
    }
  },
  components: {
    Progress,
    Video,
    StoryImage,
    ReplayIcon
  },
  methods: {
    storyPlay: function () {
      this.isPlaying = true;
      this.playNext();
    },
    storyStop: function () {
      this.isPlaying = false;
      this.currentIndex = -1;
      this.isSeen = true;
    },
    playNext: function () {
      if (this.currentIndex + 1 < this.storyItems.length) {
        this.currentIndex++;
        this.storyItemProgress = 0;
      } else {
        this.storyComplete();
      }
    },
    playPrev: function () {
      if (this.currentIndex - 1 >= 0) {
        this.currentIndex--;
      } else {
        this.renderKey++;
      }
      this.storyItemProgress = 0;
    },
    progress: function (progress) {
      this.storyItemProgress = progress;
    },
    playComplete: function () {
      this.playNext();
    },
    storyComplete: function () {
      this.storyStop();
    }
  },
  computed: {
    thumbnail: function () {
      if (this.thumbnailOverride) {
        return this.thumbnailOverride;
      }
      if (this.storyItems[0].type === "video") {
        const data = this.storyItems[0].qbrick.data;
        const resources = data.qbrick.asset.resources;
        const thumbnail = resources.filter((v) => v.rel && v.rel === "thumbnail");
        return thumbnail[0].renditions.sort((a, b) => (a.size < b.size ? 1 : -1))[0].links.href;
      }
      return this.storyItems[0].image;
    }
  }
};
</script>

<!--<style>-->
<!--.story__wrapper {-->
<!--  width: min-content;-->
<!--  position: relative;-->
<!--  background-size: contain;-->
<!--  background-position: center;-->
<!--  background-color: #191B21;-->
<!--  background-repeat: no-repeat;-->
<!--  margin: 0 1.5rem;-->
<!--}-->
<!--.story__wrapper .gobrain-play {-->
<!--  display: none;-->
<!--}-->
<!--.story__wrapper-seen .story__thumbnail {-->
<!--  background-color: rgba(0, 0, 0, 0.4);-->
<!--}-->
<!--.story__header {-->
<!--  position: absolute;-->
<!--  z-index: 1;-->
<!--  width: 100%;-->
<!--}-->
<!--.story__user-title {-->
<!--  max-width: 200px;-->
<!--  white-space: nowrap;-->
<!--  overflow: hidden;-->
<!--  text-overflow: ellipsis;-->
<!--  color: white;-->
<!--  font-weight: 500;-->
<!--  font-size: .75rem;-->
<!--  margin: 0;-->
<!--  align-self: center;-->
<!--}-->
<!--.story__user {-->
<!--  display: flex;-->
<!--  padding: .5rem;-->
<!--  justify-content: space-between;-->
<!--}-->
<!--.story__user-close {-->
<!--  border: none;-->
<!--  background: transparent;-->
<!--  width: 25px;-->
<!--  height: 25px;-->
<!--  align-self: center;-->
<!--  padding: 0;-->
<!--  z-index: 10;-->
<!--  margin: 0;-->
<!--}-->
<!--.story__user-wrapper {-->
<!--  display: flex;-->
<!--}-->
<!--.story__user-pic {-->
<!--  width: 25px;-->
<!--  height: 25px;-->
<!--  border-radius: 100%;-->
<!--  overflow: hidden;-->
<!--  background-size: cover;-->
<!--  background-position: center;-->
<!--  align-self: center;-->
<!--  margin-right: .5rem;-->
<!--}-->
<!--.story__play {-->
<!--  position: absolute;-->
<!--  top: 50%;-->
<!--  left: 50%;-->
<!--  transform: translate(-50%, -50%) scale(1);-->
<!--  width: 4rem;-->
<!--  height: 4rem;-->
<!--}-->
<!--.story__play:after {-->
<!--  content: "";-->
<!--  position: absolute;-->
<!--  top: 22px;-->
<!--  left: 25px;-->
<!--  width: 0;-->
<!--  height: 0;-->
<!--  border-color: transparent transparent transparent #fff;-->
<!--  border-style: solid;-->
<!--  border-width: 10.5px 0 10.5px 16px;-->
<!--}-->
<!--.story__replay {-->
<!--  width: 64px;-->
<!--  height: 64px;-->
<!--  position: absolute;-->
<!--  top: calc(50% - 32px);-->
<!--  left: calc(50% - 32px);-->
<!--  border: none;-->
<!--  padding: 0;-->
<!--  border-radius: 100%;-->
<!--  background: rgba(25, 27, 33, 0.5);-->
<!--}-->
<!--.story__replay svg {-->
<!--  width: 29px;-->
<!--  height: 26px;-->
<!--  left: 15.5px;-->
<!--  top: 19px;-->
<!--  position: absolute;-->
<!--}-->
<!--.story__play {-->
<!--  outline: none;-->
<!--  padding: 0;-->
<!--  border: none;-->
<!--  border-radius: 50%;-->
<!--  background: rgba(25, 27, 33, 0.5);-->
<!--  opacity: 1;-->
<!--}-->
<!--.story__controller {-->
<!--  position: absolute;-->
<!--  display: flex;-->
<!--  z-index: 1;-->
<!--  width: 100%;-->
<!--  height: calc(100% - 50px);-->
<!--  margin-top: 50px;-->
<!--}-->
<!--.story__controller-left, .story__controller-right {-->
<!--  width: 50%;-->
<!--  height: 100%;-->
<!--  border: none;-->
<!--  background: transparent;-->
<!--}-->
<!--</style>-->
