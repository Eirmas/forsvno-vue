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
    <Video
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
import Video from "./StoryVideo.vue";
import StoryImage from "./StoryImage.vue";
import ReplayIcon from "./ReplayIcon.vue";
import CloseIcon from "./CloseIcon.vue";
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
    ReplayIcon,
    CloseIcon
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
    },
    sortFunc: function (a, b) {
      return a.size < b.size ? 1 : -1;
    }
  },
  computed: {
    thumbnail: function () {
      if (this.thumbnailOverride) {
        return this.thumbnailOverride;
      }
      if (this.storyItems[0].type === "video") {
        const resources = this.storyItems[0].qbrick.data.qbrick.asset.resources;
        const thumbnail = resources.filter((v) => v.rel && v.rel === "thumbnail");
        return thumbnail[0].renditions.sort(this.sortFunc)[0].links.href;
      }
      return this.storyItems[0].image;
    }
  }
};
</script>
