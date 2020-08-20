<template>
  <div
    ref="fullscreen"
    class="story__fullscreen story__fullscreen-active"
  >
    <div
      ref="wrapper"
      :style="`width:${dimensions.width}px;height:${dimensions.height}px`"
      class="story__fullscreen-wrapper"
    >
      <div
        ref="scene"
        class="story__fullscreen-scene"
      >
        <div
          ref="innerScene"
          :style="`transform: translateZ(-${sceneWidth / 2}px) rotateY(0deg)`"
          class="story__fullscreen-scene-wrapper"
        >
          <div
            v-if="storiesIndex - 1 >= 0"
            :style="`transform: rotateY(-90deg) translateZ(${sceneWidth / 2}px)`"
            class="story__fullscreen-container-dummy story__fullscreen-right"
          >
            <FullscreenStory
              :key="storiesIndex - 1"
              :story="stories[storiesIndex - 1]"
              :index="storiesIndex - 1"
              :id="id"
            />
          </div>
          <div
            ref="container"
            :style="`transform: rotateY(0deg) translateZ(${sceneWidth / 2}px)`"
            class="story__fullscreen-container story__fullscreen-front"
          >
            <FullscreenStory
              :key="storiesIndex"
              :story="stories[storiesIndex]"
              :on-story-complete="storyComplete"
              :index="storiesIndex"
              :id="id"
              autoplay
            />
          </div>
          <div
            v-if="storiesIndex + 1 < stories.length"
            :style="`transform: rotateY(90deg) translateZ(${sceneWidth / 2}px)`"
            class="story__fullscreen-container-dummy story__fullscreen-left"
          >
            <FullscreenStory
              :key="storiesIndex + 1"
              :story="stories[storiesIndex + 1]"
              :index="storiesIndex + 1"
              :id="id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../../event-bus.es6";
import FullscreenStory from "./FullscreenStory.vue";

/**
 * The modal component for mobile stories.
 * This components makes swiping and clicking possible with cool 3D effects.
 * The components has 3 "slides" where we can insert stories.
 */
export default {
  name: "StoryMobileFullscreen",
  components: {
    FullscreenStory
  },
  data: () => ({
    /**
     * The calculated dimensions of the containers.
     * The dimensions will always be in 9:16 format.
     */
    dimensions: {
      width: 0,
      height: 0
    },
    /**
     * Determines weather the user is currently interacting with the modal.
     * (This in the form of mouseMove events)
     */
    dragEnabled: false,
    /**
     * Here we store the MouseEvent data
     * It is undefined when user is not interacting with the modal.
     * @type: MouseEvent
     */
    dragData: undefined,
    /**
     * Determines which direction the user is draging.
     *
     * @type: String | undefined // String is either "X" or "Y"
     */
    dragAxis: undefined,
    /**
     *  The width of the scene. (this.$refs.scene)
     *  The scene is the container for a single slide.
     */
    sceneWidth: 0,
    /**
     * The number representing the current story displayed. (Not the story item index)
     */
    storiesIndex: 0,
    /**
     * Determines weather a interaction cooldown is active.
     * When true the user cant interact much with the modal.
     * Is used to prevent user from interacting when animations are happening.
     */
    isCooldownActive: false
  }),
  props: {
    /**
     * ID of the story part.
     */
    id: {
      type: String,
      default: ""
    },
    /**
     * The stories to display.
     */
    stories: {
      type: [Array, Boolean],
      default: false
    },
    /**
     * The index of the clicked story before opening the modal.
     * We use this to play the story the user clicked.
     */
    clickedIndex: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.storiesIndex = this.clickedIndex;
    this.updateWrapperWidth();
    window.addEventListener("mousedown", this.mouseDown);
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("mouseup", this.mouseUp);
    window.addEventListener("touchstart", this.touchDown, { passive: false });
    window.addEventListener("touchmove", this.touchMove, { passive: false });
    window.addEventListener("touchend", this.touchUp, { passive: false });
    window.addEventListener("touchcancel", this.touchUp, { passive: false });
    window.addEventListener("resize", this.resize);
  },
  mounted() {
    this.updateSceneWidth();
  },
  methods: {
    /**
     * Function for the touchDown event
     * This functions soul purpose is to translate the TouchEvent into the data we need from MouseEvent
     * @param e: TouchEvent
     */
    touchDown: function (e) {
      e.preventDefault();
      this.mouseDown({
        pageX: e.changedTouches[0].pageX,
        pageY: e.changedTouches[0].pageY,
        target: e.target
      });
    },
    /**
     * MouseDown event function. Also used by the touchDown function.
     * @param e: MouseEvent | { pageX: number; pageY: number; target: Element | undefined }
     */
    mouseDown: function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (this.checkTargetIsContainer(e)) {
        this.dragEnabled = true;
        this.dragData = e;
      }
    },
    /**
     * Function for the touchMove event
     * This functions soul purpose is to translate the TouchEvent into the data we need from MouseEvent
     * @param e: TouchEvent
     */
    touchMove: function (e) {
      e.preventDefault();
      this.mouseMove({
        pageX: e.changedTouches[0].pageX,
        pageY: e.changedTouches[0].pageY
      });
    },
    /**
     * MouseMove event function. Also used by the touchMove function.
     * @param e: MouseEvent | { pageX: number; pageY: number; }
     */
    mouseMove: function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (this.dragEnabled) {
        if (this.dragAxis) {
          this[`animate${this.dragAxis}`](e);
        } else {
          const x = this.dragData.pageX - e.pageX;
          const y = this.dragData.pageY - e.pageY;
          if (Math.abs(x) + Math.abs(y) > 20 && (Math.abs(x) !== Math.abs(y))) {
            this.dragAxis = (Math.abs(x) > Math.abs(y)) ? "X" : "Y";
          }
        }
      }
    },
    /**
     * Function for the touchUp event
     * This functions soul purpose is to translate the TouchEvent into the data we need from MouseEvent
     * @param e: TouchEvent
     */
    touchUp: function (e) {
      e.preventDefault();
      this.mouseUp({
        pageX: e.changedTouches[0].pageX,
        pageY: e.changedTouches[0].pageY
      });
    },
    /**
     * MouseUp event function. Also used by the touchUp function.
     * @param e: MouseEvent | { pageX: number; pageY: number; }
     */
    mouseUp: function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      this.dragEnabled = false;
      if (this.dragAxis) {
        this[`finish${this.dragAxis}`](e);
      } else {
        this.checkClick(e);
      }
      this.dragAxis = undefined;
      this.dragData = undefined;
    },
    /**
     * Function to play the next story.
     * It also handles animations.
     */
    storyNext: function () {
      if (!this.isDelayActive) {
        this.isDelayActive = true;
        this.hideDummy();
        this.showDummy("story__fullscreen-left");
        this.nextSlide();
        setTimeout(() => {
          this.hideDummy();
          this.storiesIndex++;
          this.isDelayActive = false;
        }, 500);
      }
    },
    /**
     * Function to play the previous story.
     * It also handles animations.
     */
    storyPrev: function () {
      if (!this.isDelayActive) {
        this.isDelayActive = true;
        this.hideDummy();
        this.showDummy("story__fullscreen-right");
        this.prevSlide();
        setTimeout(() => {
          this.hideDummy();
          this.storiesIndex--;
          this.isDelayActive = false;
        }, 500);
      }
    },
    /**
     * Function responsible for animating to the next slide.
     * If there is no next slide, it will close the modal.
     */
    nextSlide: function () {
      if (this.$refs.innerScene) {
        if (this.storiesIndex + 1 < this.stories.length) {
          EventBus.$emit("story__fs-thumbnail", { id: this.id, onMain: true });
          this.$refs.innerScene.animate([
            {
              transform: `translateZ(-${this.sceneWidth / 2}px) rotateY(-90deg)`
            }
          ], {
            duration: 500,
            easing: "ease-out"
          });
          setTimeout(() => {
            this.$refs.innerScene.style.transform = `translateZ(-${this.sceneWidth / 2}px) rotateY(0deg)`;
            this.hideDummy();
          }, 500);
        } else {
          this.close();
        }
      }
    },
    /**
     * Function responsible for animating to the previous slide.
     * If there is no previous slide, it will close the modal.
     */
    prevSlide: function () {
      if (this.$refs.innerScene) {
        if (this.storiesIndex > 0) {
          EventBus.$emit("story__fs-thumbnail", { id: this.id, onMain: true });
          this.$refs.innerScene.animate([
            {
              transform: `translateZ(-${this.sceneWidth / 2}px) rotateY(90deg)`
            }
          ], {
            duration: 500,
            easing: "ease-out"
          });
          setTimeout(() => {
            this.$refs.innerScene.style.transform = `translateZ(-${this.sceneWidth / 2}px) rotateY(0deg)`;
            this.hideDummy();
          }, 500);
        } else {
          this.close();
        }
      }
    },
    /**
     * This function makes the slides look like a 3D cube when swiping the x-axis.
     * It will only trigger through the mouseMove function when the user is interacting with the modal.
     *
     * @param e: MouseEvent | { pageX: number }
     */
    animateX: function (e) {
      if (this.$refs.innerScene && this.$refs.fullscreen) {
        const offset = e.pageX - this.dragData.pageX;
        const total = (this.sceneWidth / 2) + (window.innerWidth / 2);
        const deg = (offset / total) * 90;
        const opacity = Math.abs(offset);
        if (deg < 0) {
          this.hideDummy();
          this.showDummy("story__fullscreen-left");
          if (this.storiesIndex + 1 < this.stories.length) {
            this.$refs.innerScene.style.transform = `translateZ(-${this.sceneWidth / 2}px) rotateY(${(deg < -90) ? -90 : deg}deg)`;
            this.$refs.fullscreen.style.opacity = "100%";
          } else {
            this.$refs.innerScene.style.transform = `translateZ(-${this.sceneWidth / 2}px) rotateY(${((deg < -90) ? -90 : deg) / 2}deg)`;
            this.$refs.fullscreen.style.opacity = `${Math.ceil((1 - ((opacity / window.innerWidth))) * 100)}%`;
          }
        } else {
          this.hideDummy();
          this.showDummy("story__fullscreen-right");
          if (this.storiesIndex - 1 >= 0) {
            this.$refs.innerScene.style.transform = `translateZ(-${this.sceneWidth / 2}px) rotateY(${(deg > 90) ? 90 : deg}deg)`;
            this.$refs.fullscreen.style.opacity = "100%";
          } else {
            this.$refs.innerScene.style.transform = `translateZ(-${this.sceneWidth / 2}px) rotateY(${((deg > 90) ? 90 : deg) / 2}deg)`;
            this.$refs.fullscreen.style.opacity = `${Math.ceil((1 - ((opacity / window.innerWidth))) * 100)}%`;
          }
        }
      }
    },
    /**
     * This function makes the modals opacity fade and move in the Y-axis.
     * It will only trigger through the mouseMove function when the user is interacting with the modal.
     *
     * @param e: MouseEvent | { pageY: number }
     */
    animateY: function (e) {
      if (this.$refs.innerScene && this.$refs.fullscreen) {
        this.hideDummy();
        const offset = (e.pageY - this.dragData.pageY >= 0) ? (e.pageY - this.dragData.pageY) / 2.5 : 0;
        this.$refs.scene.style.top = `${offset}px`;
        const threshold = 20;
        const widthOffset = (1 - (offset / window.innerHeight)) * threshold;
        this.$refs.scene.style.width = `${(100 - threshold) + (widthOffset)}%`;
        this.$refs.scene.style.height = `${(100 - threshold) + (widthOffset)}%`;
        this.$refs.scene.style.left = `${(100 - ((100 - threshold) + (widthOffset))) / 2}%`;
        this.$refs.fullscreen.style.opacity = `${Math.ceil((1 - (2 * (offset / window.innerHeight))) * 100)}%`;
      }
    },
    /**
     * This function triggers when the user lets go after interacting with the modal for the X-axis.
     * It determines what should happen and animates to modal to either go to next/previous slide or
     * stay on the current one.
     * If it determines to go to next/previous slide but there is none - it will close.
     *
     * @param e: MouseEvent | { pageX: number }
     */
    finishX: function (e) {
      const offset = e.pageX - this.dragData.pageX;
      const total = (this.sceneWidth / 2) + (window.innerWidth / 2);
      const deg = (offset / total) * 80;
      if (deg < 0) {
        if (this.storiesIndex + 1 < this.stories.length) {
          if (deg < -30) {
            this.storyNext();
          } else {
            this.keepOpen();
          }
        } else if (deg > -20) {
          this.keepOpen();
        } else {
          this.close();
        }
      } else if (this.storiesIndex - 1 >= 0) {
        if (deg > 30) {
          this.storyPrev();
        } else {
          this.keepOpen();
        }
      } else if (deg < 20) {
        this.keepOpen();
      } else {
        this.close();
      }
    },
    /**
     * This function triggers when the user lets go after interacting with the modal for the Y-axis.
     * It determines what should happen and animates to modal to either close or stay open.
     *
     * @param e: MouseEvent | { pageY: number }
     */
    finishY: function (e) {
      if (e.pageY - this.dragData.pageY > (0.2 * window.innerHeight)) {
        this.close();
      } else {
        this.keepOpen();
      }
    },
    /**
     * Closes the modal with awesome animations.
     */
    close: function () {
      const duration = 250;
      if (this.$refs.scene) {
        this.$refs.scene.animate([
          {
            top: "100%",
            left: "50%",
            width: "0%",
            heigth: "0%"
          }
        ], {
          duration: duration,
          easing: "ease-out"
        });
        this.$refs.fullscreen.animate([
          {
            opacity: "0%"
          }
        ], {
          duration: duration,
          easing: "ease-out"
        });
      }
      setTimeout(() => {
        if (this.$refs.scene) {
          this.$refs.scene.style.top = "100%";
          this.$refs.scene.style.left = "50%";
          this.$refs.scene.style.width = "0%";
          this.$refs.scene.style.height = "0%";
        }
        if (this.$refs.fullscreen) {
          this.$refs.fullscreen.style.opacity = "0%";
        }
        this.hideDummy();
        EventBus.$emit("story__fullscreen-close", this.id);
      }, duration);
    },
    /**
     * Keeps the modal open and on the current slide with awesome animations.
     */
    keepOpen: function () {
      EventBus.$emit("story__fs-thumbnail", { id: this.id, onMain: false });
      const duration = 250;
      this.$refs.scene.animate([
        {
          top: "0%",
          left: "0%",
          width: "100%",
          height: "100%"
        }
      ], {
        duration: duration,
        easing: "ease-out"
      });
      this.$refs.fullscreen.animate([
        {
          opacity: "100%"
        }
      ], {
        duration: duration,
        easing: "ease-out"
      });
      this.$refs.innerScene.animate([
        {
          transform: `translateZ(-${this.sceneWidth / 2}px) rotateY(0deg)`
        }
      ], {
        duration: duration,
        easing: "ease-out"
      });
      setTimeout(() => {
        this.$refs.scene.style.top = "0%";
        this.$refs.scene.style.left = "0%";
        this.$refs.scene.style.width = "100%";
        this.$refs.scene.style.height = "100%";
        this.$refs.innerScene.style.transform = `translateZ(-${this.sceneWidth / 2}px) rotateY(0deg)`;
        this.$refs.fullscreen.style.opacity = "100%";
        this.hideDummy();
      }, duration);
    },
    /**
     * The callback function when a story is complete.
     * We also use this function as a callback if a user clicks on the left side of the
     * story to go to the previous story. If so -> next parameter will be false.
     *
     * @param next: Boolean
     */
    storyComplete: function (next) {
      if (next) {
        this.storyNext();
      } else {
        this.storyPrev();
      }
    },
    /**
     * A dummy is one of the two sides of the 3D cube. They dont have to be visible at all times
     * so we have the ability to show and hide them.
     * We can choose which one of the dummies to display by passing the dummys classname.
     *
     * @param className: String // "story__fullscreen-left" | "story__fullscreen-right"
     */
    showDummy: function (className) {
      if (this.$refs.innerScene) {
        const dummies = this.$refs.innerScene.querySelectorAll(`.${className}`);
        dummies.forEach((v) => {
          if (v) {
            // eslint-disable-next-line
            v.style.visibility = "visible";
          }
        });
      }
    },
    /**
     * A dummy is one of the two sides of the 3D cube. They dont have to be visible at all times
     * so we have the ability to show and hide them.
     * This functions hides all dummies. Must have class ".story__fullscreen-container-dummy"
     */
    hideDummy: function () {
      if (this.$refs.innerScene) {
        const dummies = this.$refs.innerScene.querySelectorAll(".story__fullscreen-container-dummy");
        dummies.forEach((v) => {
          // eslint-disable-next-line
          v.style.visibility = "hidden";
        });
      }
    },
    /**
     * When clicking on the slide we check if the user clicked on the left or right side of the slide.
     * We do this to determine weather to go to the next or previous story item.
     *
     * @param e: MouseEvent
     */
    checkClick: function (e) {
      if (this.checkTargetIsContainer(e)) {
        const target = this.$refs.container.getClientRects()[0];
        const offsetX = e.pageX - target.left;
        if ((offsetX / target.width) > 0.5) {
          EventBus.$emit("story__fs-next", { id: this.id, index: this.storiesIndex });
        } else {
          EventBus.$emit("story__fs-prev", { id: this.id, index: this.storiesIndex });
        }
      }
    },
    /**
     * Checks if the user clicked inside the container (this.$refs.container)
     *
     * @param e: MouseEvent
     * @returns Boolean
     */
    checkTargetIsContainer: function (e) {
      if (this.$refs.container) {
        const target = this.$refs.container.getClientRects()[0];
        const offsetX = e.pageX - target.left;
        const offsetY = e.pageY - target.top;
        return (offsetX > 0 && offsetX < target.width && offsetY > 0 && offsetY < target.height);
      }
      return false;
    },
    /**
     * Function triggered for resize events.
     */
    resize: function () {
      this.updateWrapperWidth();
      this.updateSceneWidth();
    },
    /**
     * Updates the dimensions object.
     */
    updateWrapperWidth: function () {
      if ((window.innerWidth / window.innerHeight) < (9 / 16)) {
        this.dimensions = {
          width: window.innerWidth,
          height: window.innerWidth / (9 / 16)
        };
      } else {
        this.dimensions = {
          width: window.innerHeight * (9 / 16),
          height: window.innerHeight
        };
      }
    },
    /**
     * Updates the scene width variable.
     */
    updateSceneWidth: function () {
      if (this.$refs.scene) {
        this.sceneWidth = this.$refs.scene.clientWidth;
      }
    }
  },
  watch: {
    /**
     * Checks if the storiesIndex variable is invalid.
     * If so -> close the modal.
     */
    storiesIndex: function () {
      if (this.storiesIndex > this.stories.length - 1 || this.storiesIndex < 0) {
        this.close();
      }
    },
    /**
     * When the user interacts with the modal and the code has determined which axis user is
     * draging, it will tell the current story to toggle pause or play.
     */
    dragAxis: function () {
      EventBus.$emit("story__fs-toggle", {
        pause: this.dragAxis !== undefined,
        id: this.id,
        index: this.storiesIndex
      });
    }
  },
  beforeDestroy() {
    EventBus.$emit("story__fullscreen-close", this.id);
    window.removeEventListener("mousedown", this.mouseDown);
    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("mouseup", this.mouseUp);
    window.removeEventListener("touchstart", this.touchDown);
    window.removeEventListener("touchmove", this.touchMove);
    window.removeEventListener("touchend", this.touchUp);
    window.removeEventListener("touchcancel", this.touchUp);
    window.removeEventListener("resize", this.resize);
  }
};
</script>
