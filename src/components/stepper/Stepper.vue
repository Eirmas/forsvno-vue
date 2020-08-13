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
    swipePosition: {
      x: 0,
      y: 0
    },
    isHorizontal: undefined,
    isTransitioning: false,
    lineWidth: 225,
    currentStep: 0,
    isOverflowing: false
  }),
  props: {
    data: {
      type: [Array, Boolean],
      default: false
    }
  },
  computed: {
    lastActiveStep: function () {
      let lastActiveKey = 0;
      for (let i = 0; i < this.data.length; i++) {
        lastActiveKey = (this.data[i].active) ? i : lastActiveKey;
      }
      return lastActiveKey;
    },
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
    touchMove: function (e) {
      if (this.isHorizontal === undefined) {
        const x = Math.abs(this.swipePosition.x - e.changedTouches[0].clientX);
        const y = Math.abs(this.swipePosition.y - e.changedTouches[0].clientY);
        this.isHorizontal = x > y;
      }
      if (this.isHorizontal === true) {
        e.preventDefault();
      }
    },
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
    updateLineWidth: function () {
      if (this.$refs.wrapper) {
        const width = (this.$refs.wrapper.clientWidth - 225 - (16 * this.data.length)) / (this.data.length - 1);
        this.lineWidth = (width > 225) ? width : 225;
      }
    },
    nextStep: function () {
      if (this.$refs.wrapper && !this.isTransitioning && (this.currentStep < this.data.length - 1)) {
        this.activateTransition();
        this.currentStep++;
      }
    },
    prevStep: function () {
      if (this.$refs.wrapper && !this.isTransitioning && (this.currentStep !== 0)) {
        this.activateTransition();
        this.currentStep--;
      }
    },
    activateTransition: function () {
      this.isTransitioning = true;
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },
    onResize: function () {
      this.checkOverflowing();
      this.updateLineWidth();
    },
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
