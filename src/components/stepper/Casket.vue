<template>
  <div>
    <!-- Navigation -->
    <div
      class="container"
    >
      <div
        v-if="data.isOverflowing"
        class="stepper__arrow"
      >
        <button
          :style="data.currentStep === 0 && 'visibility: hidden'"
          class="stepper__arrow-left"
          @click="moveTo(data.currentStep - 1)"
        >
          <img :src="arrowRight" alt="Pil til venstre">
        </button>
        <button
          :style="data.currentStep === numSteps - 1 && 'visibility: hidden'"
          class="stepper__arrow-right"
          @click="moveTo(data.currentStep + 1)"
        >
          <img :src="arrowRight" alt="Pil til høyre">
        </button>
      </div>
    </div>
    <!-- Content -->
    <div
      ref="wrapper"
      class="stepper__casket-wrapper"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div
        ref="content"
        :id="`stepper__casket-content-${id}`"
        :style="`transform: translate3d(calc(50% - 112.5px - ${initialStep * minLength}px), 0px, 0px)`"
      >
        <slot />
      </div>
    </div>
    <!-- Progress bar -->
    <div
      v-if="data.isOverflowing"
      class="container"
    >
      <div
        class="stepper__progress-bar"
      >
        <div
          ref="progress"
          :id="`stepper__casket-progress-${id}`"
          :style="`width: ${((data.currentStep + 1) / numSteps) * 100}%`"
          class="stepper__progress-bar-inner"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import gsap from "gsap";
import { Data } from "./types";

@Component({
  name: "Casket"
})
export default class Casket extends Vue {
  @Prop() private initialStep!: number

  @Prop() private minLength!: number

  @Prop() private numSteps!: number

  @Prop() private arrowRight!: string

  @Prop() private id!: string;

  $refs!: {
    wrapper: HTMLDivElement;
    content: HTMLDivElement;
    progress: HTMLDivElement;
  }

  data: Data = {
    isOverflowing: false,
    currentStep: 0,
    swipePosition: {
      x: 0,
      y: 0
    },
    isHorizontal: undefined,
    temporaryStep: undefined,
    isTransitioning: false
  }

  created() {
    this.data.currentStep = this.initialStep;
  }

  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  onTouchStart = (e: TouchEvent): void => {
    this.data.swipePosition = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
  }

  onTouchMove = (e: TouchEvent): void => {
    if (this.data.isHorizontal === undefined) {
      const x = Math.abs(this.data.swipePosition.x - e.changedTouches[0].clientX);
      const y = Math.abs(this.data.swipePosition.y - e.changedTouches[0].clientY);
      this.data.isHorizontal = x > y;
    }
    if (this.data.isHorizontal && !this.data.isTransitioning) {
      e.preventDefault();
      const x: number = this.data.swipePosition.x - e.changedTouches[0].clientX;
      let step: number = this.data.currentStep + (x / this.minLength);
      if (step < 0) {
        step = 0;
      } else if (step > this.numSteps - 1) {
        step = this.numSteps - 1;
      }
      this.$refs.content.style.transform = `translate3d(calc(50% - 112.5px - ${step * this.minLength}px), 0px, 0px)`;
      this.$refs.progress.style.width = `${((step + 1) / this.numSteps) * 100}%`;
      this.data.temporaryStep = step;
    }
  }

  moveTo = (step: number, duration = 0.3): void => {
    if (this.$refs.content && this.$refs.progress && !this.data.isTransitioning) {
      this.data.isTransitioning = true;
      const tl: gsap.core.Timeline = gsap.timeline();

      let currentStep = this.data.currentStep;
      if (this.data.temporaryStep !== undefined) {
        currentStep = this.data.temporaryStep;
      }

      let newStep: number;
      if (step < 0) {
        newStep = 0;
      } else if (step > this.numSteps - 1) {
        newStep = this.numSteps - 1;
      } else {
        newStep = step;
      }

      tl.fromTo(`#stepper__casket-content-${this.id}`, {
        transform: `translate3d(calc(50% - 112.5px - ${currentStep * this.minLength}px), 0px, 0px)`
      }, {
        transform: `translate3d(calc(50% - 112.5px - ${newStep * this.minLength}px), 0px, 0px)`,
        duration: duration,
        ease: "easeInOut"
      });
      tl.fromTo(`#stepper__casket-progress-${this.id}`, {
        width: `${((currentStep + 1) / this.numSteps) * 100}%`
      }, {
        width: `${((newStep + 1) / this.numSteps) * 100}%`,
        duration: duration,
        ease: "easeInOut",
        onComplete: () => {
          this.data.currentStep = newStep;
          this.data.isTransitioning = false;
          this.data.temporaryStep = undefined;
        }
      }, `-=${duration}`);
    }
  }

  onTouchEnd = (): void => {
    if (this.data.isHorizontal === true && !this.data.isTransitioning) {
      this.moveTo(this.findClosest());
    }
    this.data.isHorizontal = undefined;
  }

  findClosest = (): number => {
    if (this.data.temporaryStep !== undefined) {
      return Math.round(this.data.temporaryStep);
    }
    this.data.temporaryStep = undefined;
    return this.data.currentStep;
  }

  onResize = (): void => {
    this.checkOverflow();
    if (this.data.isOverflowing) {
      this.moveTo(this.data.currentStep, 0);
    } else if (this.$refs.content) {
      this.$refs.content.style.transform = "unset";
    }
  }

  checkOverflow = (): void => {
    if (this.$refs.wrapper) {
      this.$refs.wrapper.classList.add("container");
      this.data.isOverflowing = this.$refs.wrapper.clientWidth < this.minLength * this.numSteps;
      if (this.data.isOverflowing) {
        this.$refs.wrapper.classList.remove("container");
      }
    }
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
}
</script>
