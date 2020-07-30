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
      class="stepper__inner-wrapper"
      ref="wrapper"
      @scroll.prevent
      @wheel.prevent="scroll"
      @touchstart.prevent="touch($event, true)"
      @touchmove.prevent
      @touchend.prevent="touch($event, false)"
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
            :class="['stepper__line', (i < (step * 2)) ? 'stepper__line-normal' : 'stepper__line-dash']"
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
    swipePosition: 0,
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
    step: function () {
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
      const treshold = 80;
      if (e.deltaX < treshold * -1) {
        this.prevStep();
      } else if (e.deltaX > treshold) {
        this.nextStep();
      }
    },
    touch: function (e, swipeStart) {
      if (swipeStart) {
        this.swipePosition = e.changedTouches[0].clientX;
      } else if ((this.swipePosition - e.changedTouches[0].clientX) < 0) {
        this.prevStep();
      } else {
        this.nextStep();
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

<style scoped>
.stepper__inner-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.stepper__inner-wrapper::-webkit-scrollbar {
  display: none;
}
.stepper__items {
  left: 0;
  transition: left 0.5s ease-in-out;
  -webkit-transition: left 0.5s ease-in-out;
  -o-transition: left 0.5s ease-in-out;
  -moz-transition: left 0.5s ease-in-out;
  display: flex;
  padding: 5em calc(225px / 2) 3em calc(225px / 2);
  position: relative;
  align-items: center;
}
.stepper__dot {
  min-width: 1em;
  width: 1em;
  height: 1em;
  background-color: #ffffff;
  border: 2px solid #191b21;
  border-radius: 100%;
}
.stepper__dot-active {
  background-color: #191b21;
}
.stepper__dot-label {
  font-weight: 600;
  position: relative;
  white-space: nowrap;
  overflow-x: hidden;
  font-size: 1.125rem;
  width: 225px;
  text-overflow: ellipsis;
  top: -50px;
  left: calc(-225px / 2);
  text-align: center;
}
.stepper__line {
  width: 100%;
  min-width: 225px;
  height: 2px;
  background-color: #191b21;
}
.stepper__line-dash {
  display: block;
  background-image: linear-gradient(to right, #191b21 66%, #ffffff 0%);
  background-position: bottom;
  background-size: 1.25rem;
  background-repeat: repeat-x;
}
.stepper__arrow {
  display: flex;
  padding: 2rem 0 0 0;
  justify-content: flex-end;
}
.stepper__arrow-left svg, .stepper__arrow-right svg {
  width: 24px;
  height: 16px;
}
.stepper__arrow-left {
  transform: scale(-1, 1);
}
.stepper__arrow-left, .stepper__arrow-right {
  border: none;
  background: transparent;
  margin-left: 1em;
  padding: 0;
}
.stepper__progress-bar {
  width: 10rem;
  margin: 0 auto 2rem auto;
  height: 2px;
  background: rgba(25,27,33,.4);
  display: flex;
  align-items: center;
}
.stepper__progress-bar-inner {
  height: 4px;
  background: #191b21;
  width: 0;
  transition: width 0.5s ease-in-out;
  -webkit-transition: width 0.5s ease-in-out;
  -o-transition: width 0.5s ease-in-out;
  -moz-transition: width 0.5s ease-in-out;
}
.stepper__wrapper {
  padding: 5rem 0;
}
@media (max-width: 991px) {
  .stepper__wrapper {
    padding: 3rem 0;
  }
}
</style>
