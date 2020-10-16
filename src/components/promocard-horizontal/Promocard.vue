<template>
  <div
    v-if="items.length >= 3"
    class="container promocard-horizontal__container"
  >
    <div
      class="promocard-horizontal__header"
    >
      <span>{{ title }}</span>
      <div
        class="promocard-horizontal__navigation"
      >
        <button
          class="promocard-horizontal__navigation-left"
          @click="prevCard"
        >
          <img
            v-if="icons.arrow"
            :src="icons.arrow"
          >
          <p v-else>Forrige</p>
        </button>
        <button
          class="promocard-horizontal__navigation-right"
          data-target="1"
          @click="nextCard"
        >
          <img
            v-if="icons.arrow"
            :src="icons.arrow"
          >
          <p v-else>Neste</p>
        </button>
      </div>
    </div>
    <div
      ref="container"
      class="promocard-horizontal__body"
    >
      <ol
        ref="carousel"
        class="promocard-horizontal__card-wrapper"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove($event, $event)"
        @mouseup="onMouseUp($event, $event)"
        @mouseleave="onMouseUp"
        @touchstart="onMouseDown({ clientX: $event.changedTouches[0].clientX, clientY: $event.changedTouches[0].clientY }, $event)"
        @touchmove="onMouseMove({ clientX: $event.changedTouches[0].clientX, clientY: $event.changedTouches[0].clientY }, $event)"
        @touchend="onMouseUp"
      >
        <Card :card="items[items.length - 2]" aria-hidden="true"/>
        <Card :card="items[items.length - 1]" aria-hidden="false"/>
        <Card v-for="(item, i) in items" :card="item" :key="i" aria-hidden="false"/>
        <Card :card="items[0]" aria-hidden="false"/>
        <Card :card="items[1]" aria-hidden="true"/>
      </ol>
    </div>
    <div
      class="promocard-horizontal__footer"
    >
      <div
        class="promocard-horizontal__progress-bar"
      >
        <div
          ref="progress"
          :style="`width: calc(100% / ${this.items.length}); left: ${100 * (this.progressLeft / this.items.length)}%`"
          class="promocard-horizontal__progress-bar-inner"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "Promocard",
  components: {
    Card
  },
  data: () => ({
    /**
     * Progressbar left offset
     */
    progressLeft: 0,
    /**
     * Animation duration
     */
    duration: 200,
    /**
     * Current card index
     */
    currentStep: 0,
    /**
     * Starting position of swipe or mouse drag
     */
    startPosition: { x: 0, y: 0 },
    /**
     * Determines if an animation is ongoing
     */
    isAnimating: false,
    /**
     * Determines if the user is currently interacting with the part
     */
    isMouseDown: false,
    /**
     * Used to detemine if the user is swiping in a horizontal motion
     */
    isHorizontal: undefined
  }),
  props: {
    /**
     * The items holding data for the cards.
     *
     * @values {
     *   title: string;
     *   decoration: {
     *     icon: {
     *       src: string;
     *     },
     *     caption: string;
     *   };
     *   text: string
     * }[] || Boolean
     */
    items: {
      type: [Array, Boolean],
      default: false
    },
    /**
     * The title above the cards.
     * @values string;
     */
    title: {
      type: String,
      default: ""
    },
    icons: {
      type: [Object, Boolean],
      default: false
    }
  },
  methods: {
    /**
     * On mouse down event
     * @param e
     */
    onMouseDown: function (e) {
      if (this.$refs.carousel) {
        this.isMouseDown = true;
        this.isHorizontal = undefined;
        this.startPosition = { x: e.clientX, y: e.clientY };
      }
    },
    /**
     * On mouse move event. First parameter holds client X and Y num, second holds the event itself.
     * Did this to prevent having to make route functions for touch events
     *
     * The function takes care of shifting the cards when user drags them.
     *
     * @param e
     * @param event
     */
    onMouseMove: function (e, event) {
      if (this.isHorizontal === undefined) {
        const x = Math.abs(this.startPosition.x - e.clientX);
        const y = Math.abs(this.startPosition.y - e.clientY);
        this.isHorizontal = x + 1 > y;
      }
      if (this.isHorizontal) {
        event.preventDefault();
        if (this.isMouseDown && !this.isAnimating && this.$refs.carousel) {
          const x = this.getWidths();
          const mouseX = e.clientX - this.startPosition.x;
          const newOffset = x.currentOffset - mouseX;
          if (mouseX > 0 && newOffset < (x.cardWidth * 5 - x.containerWidth) / 2) {
            this.$refs.carousel.style.transform = `translateX(-${((x.cardWidth * 5 - x.containerWidth) / 2) + ((this.items.length) * x.cardWidth)}px)`;
          } else if (newOffset > ((x.cardWidth * 5 - x.containerWidth) / 2) + ((this.items.length) * x.cardWidth)) {
            this.$refs.carousel.style.transform = `translateX(-${(x.cardWidth * 5 - x.containerWidth) / 2}px)`;
          } else {
            this.$refs.carousel.style.transform = `translateX(-${newOffset}px)`;
          }
          this.startPosition.x = e.clientX;
          if (this.$refs.progress) {
            this.progressLeft = this.findClosest();
          }
        }
      }
    },
    /**
     * On mouse up event
     */
    onMouseUp: function () {
      if (this.isMouseDown && !this.isAnimating) {
        this.isMouseDown = false;
        this.startPosition = { x: 0, y: 0 };
        this.isHorizontal = undefined;
        this.animateToClosest();
      }
    },
    /**
     * Finds the closest cards index by the current offset.
     * Swiping from current card to a neighbour requires less dragging.
     *
     * @returns {number}
     */
    findClosest: function () {
      const x = this.getWidths();
      const float = (0.5 + ((x.currentOffset - x.start) / (x.end - x.start)) * this.items.length) % this.items.length;
      const threshold = 0.1;
      if (Math.floor(float) === this.currentStep) {
        if (float > this.currentStep + (0.5 + threshold)) {
          const index = Math.floor(float) + 1;
          return (index > this.items.length - 1) ? 0 : index;
        }
        if (float < this.currentStep + (0.5 - threshold)) {
          const index = Math.floor(float) - 1;
          return (index < 0) ? this.items.length - 1 : index;
        }
      }
      return Math.floor(float);
    },
    /**
     * To prevent the animation from looping weirdly when going to another card
     */
    handleExceptionBugs: function () {
      const x = this.getWidths();
      if (this.currentStep === 0 && x.currentOffset > (x.start + x.cardWidth)) {
        this.$refs.carousel.style.transform = `translateX(${x.end - x.start - x.currentOffset}px)`;
      }
    },
    /**
     * Animates the container to the closest card
     */
    animateToClosest: function () {
      this.isAnimating = true;
      const x = this.getWidths();
      this.currentStep = this.findClosest();
      this.handleExceptionBugs();
      this.$refs.carousel.animate([
        {
          transform: `translateX(${-1 * ((x.cardWidth * 5 - x.containerWidth) / 2 + (this.currentStep * x.cardWidth))}px)`
        }
      ], {
        duration: this.duration,
        easing: "ease-in-out"
      });
      setTimeout(() => {
        this.goToCurrent();
        this.isAnimating = false;
      }, this.duration);
    },
    /**
     * Goes to the next card.
     */
    nextCard: function () {
      this.currentStep = (this.currentStep + 1 >= this.items.length) ? 0 : this.currentStep + 1;
      this.goToCurrent(-1);
      const x = this.getWidths();
      this.$refs.carousel.animate([
        {
          transform: `translateX(${-1 * (x.currentOffset + x.cardWidth)}px)`
        }
      ], {
        duration: this.duration,
        easing: "ease-in-out"
      });
      setTimeout(() => {
        this.goToCurrent();
      }, this.duration);
    },
    /**
     * Goes to the previous card
     */
    prevCard: function () {
      this.currentStep = (this.currentStep > 0) ? this.currentStep - 1 : this.items.length - 1;
      this.goToCurrent(1);
      const x = this.getWidths();
      this.$refs.carousel.animate([
        {
          transform: `translateX(${-1 * (x.currentOffset - x.cardWidth)}px)`
        }
      ], {
        duration: this.duration,
        easing: "ease-in-out"
      });
      setTimeout(() => {
        this.goToCurrent();
      }, this.duration);
    },
    /**
     * Goes to the current card using the currentStep state variable (currentStep is the index)
     * Can provide a factor here. 0 means go to current. 1 -> go to currentStep + 1 and so on.
     * Using the factor in next and prev card functions
     *
     * @param factor
     */
    goToCurrent: function (factor = 0) {
      if (this.$refs.carousel && this.$refs.container) {
        const x = this.getWidths();
        const offset = (x.cardWidth * 5 - x.containerWidth) / 2 + (this.currentStep * x.cardWidth) + (factor * x.cardWidth);
        this.$refs.carousel.style.transform = `translateX(${-1 * offset}px)`;
      }
    },
    /**
     * Returns an object of element dimensions
     *
     * @returns {{
     *    currentOffset: number,
     *    width: number,
     *    start: number,
     *    cardWidth: number,
     *    end: number,
     *    containerWidth: number
     * }}
     */
    getWidths: function () {
      const width = this.$refs.carousel.getBoundingClientRect().width;
      const containerWidth = this.$refs.container.getBoundingClientRect().width;
      const cardWidth = width / (this.items.length + 4);
      const currentOffset = parseInt(this.$refs.carousel.style.transform.replace(/[^\d.]/g, ""));
      const start = (cardWidth * 5 - containerWidth) / 2;
      const end = start + (cardWidth * this.items.length - 1);
      return {
        width: width,
        containerWidth: containerWidth,
        cardWidth: cardWidth,
        currentOffset: currentOffset,
        start: start,
        end: end
      };
    },
    /**
     * On resize event function
     */
    onResize: function () {
      this.goToCurrent();
    }
  },
  /**
   * On mounted, go to curent card and add resize event listener.
   */
  mounted() {
    this.goToCurrent();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>
