<template>
  <div
    v-if="data.length >= 2 && data.length <= 6"
  >
    <div
      class="container"
    >
      <div
        v-if="isOverflowing"
        class="stepper__arrow"
      >
        <button
          :style="this.currentStep === 0 ? 'visibility: hidden' : ''"
          class="stepper__arrow-left"
          @click="prevStep"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27 18"
            fill="none"
          >
            <path
              d="M0 9.34351H24.5111M17.1553 1.98254L24.7888 9.3435 17.1553 16.7044"
              stroke="#191B21"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </button>
        <button
          :style="this.currentStep === this.data.length - 1 ? 'visibility: hidden' : ''"
          class="stepper__arrow-right"
          @click="nextStep"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27 18"
            fill="none"
          >
            <path
              d="M0 9.34351H24.5111M17.1553 1.98254L24.7888 9.3435 17.1553 16.7044"
              stroke="#191B21"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      ref="wrapper"
      class="stepper__inner-wrapper"
      @scroll.prevent
      @wheel="scroll"
      @touchstart="touch($event, true)"
      @touchmove="touchMove"
      @touchend="touch($event, false)"
    >
      <div
        :style="isOverflowing ? `left: calc(50% - ${112.5 + ((currentStep * lineWidth) + (currentStep * 16))}px)` : ''"
        class="stepper__items"
      >
        <template
          v-for="(item, i) in computedData"
        >
          <div
            v-if="!(i % 2)"
            :key="i"
            :class="['stepper__dot', item.active ? 'stepper__dot-active' : '']"
            :style="`left: ${(100 / (data.length - 1)) * (i / 2)}%`"
          >
            <div
              class="stepper__dot-label"
            >
              {{ item.text }}
            </div>
          </div>
          <div
            v-else-if="i < computedData.length - 1"
            :key="i"
            :class="['stepper__line', (i < (lastActiveStep * 2)) ? 'stepper__line-normal' : 'stepper__line-dash']"
          />
        </template>
      </div>
    </div>
    <div
      v-if="isOverflowing"
      class="container"
    >
      <div
        class="stepper__progress-bar"
      >
        <div
          :style="`width: ${((this.currentStep + 1) / this.data.length) * 100}%`"
          class="stepper__progress-bar-inner"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stepper",
  data: () => ({
    /**
     * This object is used to store the swipe position. It's used to determine the direction the user is swiping.
     */
    swipePosition: {
      x: 0,
      y: 0
    },
    /**
     * Tells weather the users swipe direction was in a horizontal or vertical direction. Will be undefined until user
     * interacts with the stepper.
     */
    isHorizontal: undefined,
    /**
     * Boolean to tell if an animation is ongoing. Used to disable user from interacting with stepper during animations.
     */
    isTransitioning: false,
    /**
     * The width of a line. (The line in between the points)
     */
    lineWidth: 225,
    /**
     * The index of the current step. Used when stepper is overflowing and we want to keep a point in the center of the screen.
     */
    currentStep: 0,
    /**
     * Tells weather the stepper is overflowing or not.
     */
    isOverflowing: false
  }),
  props: {
    data: {
      /**
       * @values {
       *   text: string;
       *   isActive: Boolean;
       * }[] || Boolean
       */
      type: [Array, Boolean],
      default: false
    }
  },
  computed: {
    /**
     * Returns the index of the last active step. Used for finding out where to draw a dashed line.
     * @returns {number}
     */
    lastActiveStep: function () {
      let lastActiveKey = 0;
      for (let i = 0; i < this.data.length; i++) {
        lastActiveKey = (this.data[i].active) ? i : lastActiveKey;
      }
      return lastActiveKey;
    },
    /**
     * Returns the array the template will use to draw the stepper. To make it possible to draw both points and lines
     * in the same loop we've duplicated the array in a sense. In the template loop -> odd index iterations will draw lines
     * and even index iterations will draw points.
     */
    computedData: function () {
      const v = [];
      for (let i = 0; i < this.data.length; i++) {
        v.push(this.data[i]);
        v.push(this.data[i]);
      }
      return v;
    }
  },
  methods: {
    /**
     * Scroll event function. Determines which direction to go.
     * @param e
     */
    scroll: function (e) {
      if (e.deltaX !== 0) {
        e.preventDefault();
      }
      const treshold = 80;
      if (e.deltaX < treshold * -1) {
        this.prevStep();
      } else if (e.deltaX > treshold) {
        this.nextStep();
      }
    },
    /**
     * This function makes it possible to scroll up and down when starting from the stepper.
     * It prevents the default behaviour of the scroll only if user is swiping in a horizontal motion.
     */
    touchMove: function (e) {
      if (this.isHorizontal === undefined) {
        const x = Math.abs(this.swipePosition.x - e.changedTouches[0].clientX);
        const y = Math.abs(this.swipePosition.y - e.changedTouches[0].clientY);
        this.isHorizontal = x + 1 > y;
      }
      if (this.isHorizontal === true) {
        e.preventDefault();
      }
    },
    /**
     * Used by touchStart and touchEnd event listener.
     * If used by touchStart event, it sets the position of the mouse.
     * If used by touchEnd event, it uses the start position and current position to calculate which direction to step.
     * @param e
     * @param swipeStart
     */
    touch: function (e, swipeStart) {
      if (swipeStart) {
        this.swipePosition = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        };
      } else {
        if (this.isHorizontal === true) {
          if ((this.swipePosition.x - e.changedTouches[0].clientX) < 0) {
            this.prevStep();
          } else {
            this.nextStep();
          }
        }
        this.isHorizontal = undefined;
      }
    },
    /**
     * Updates the line width variable.
     */
    updateLineWidth: function () {
      if (this.$refs.wrapper) {
        const width = (this.$refs.wrapper.clientWidth - 225 - (16 * this.data.length)) / (this.data.length - 1);
        this.lineWidth = (width > 225) ? width : 225;
      }
    },
    /**
     * Goes to the next step in the stepper.
     * It will only go to the previous step is no transition is active.
     */
    nextStep: function () {
      if (this.$refs.wrapper && !this.isTransitioning && (this.currentStep < this.data.length - 1)) {
        this.activateTransition();
        this.currentStep++;
      }
    },
    /**
     * Goes to the previous step in the stepper.
     * It will only go to the previous step is no transition is active.
     */
    prevStep: function () {
      if (this.$refs.wrapper && !this.isTransitioning && (this.currentStep !== 0)) {
        this.activateTransition();
        this.currentStep--;
      }
    },
    /**
     * Activates transition. Sets the isTransitioning boolean to true followed by a 500ms timeout to set it back to false.
     */
    activateTransition: function () {
      this.isTransitioning = true;
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },
    /**
     * On resize event function.
     */
    onResize: function () {
      this.checkOverflowing();
      this.updateLineWidth();
    },
    /**
     * Checks if the stepper is overflowing. If not, it will display the whole stepper.
     * If not, it will show the navigation arrows and center the current point.
     */
    checkOverflowing: function () {
      if (this.$refs.wrapper) {
        // eslint-disable-next-line
        this.$refs.wrapper.classList.add("container");
        const dots = this.data.length;
        const length = (dots * 16) + ((dots - 1) * 225) + 225;
        this.isOverflowing = this.$refs.wrapper.clientWidth < length;
        if (this.isOverflowing) {
          this.$refs.wrapper.classList.remove("container");
        }
      }
    }
  },
  mounted() {
    this.checkOverflowing();
    this.updateLineWidth();
    window.addEventListener("resize", this.onResize);
  }
};
</script>
