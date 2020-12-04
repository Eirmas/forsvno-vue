<template>
  <div
    class="grey-light quiz__wrapper-inner"
  >
    <div
      class="container"
    >
      <div
        v-if="currentQuestionIndex !== 0 && currentQuestionIndex !== questions.length + 1"
        class="quiz__progress"
      >
        {{ `Spørsmål ${currentQuestionIndex} av ${questions.length}` }}
      </div>
      <carousel
        :model="currentQuestionIndex"
      >
        <carousel-content
          :step="0"
        >
          <Start
            :title="title"
            :subTitle="subTitle"
            :startText="startText"
            :id="id"
            :media="media"
          />
        </carousel-content>
        <carousel-content
          v-for="(question, i) in questions"
          :key="i"
          :step="i + 1"
        >
          <Question
            :question="question"
            :index="i"
            :total="questions.length"
            :id="id"
          />
        </carousel-content>
        <carousel-content
          :step="questions.length + 1"
        >
          <Results
            :points="points"
            :total="questions.length"
            :endText="endText"
            :id="id"
            :feedback="feedback"
          />
        </carousel-content>
      </carousel>
    </div>
  </div>
</template>

<script>
import { v1 } from "uuid";
import Question from "./Question.vue";
import EventBus from "../../event-bus.es6";
import Results from "./Results.vue";
import Start from "./Start.vue";
import Carousel from "./carousel/Carousel.vue";
import CarouselContent from "./carousel/CarouselContent.vue";

export default {
  name: "Quiz",
  components: {
    Question,
    Results,
    Start,
    Carousel,
    CarouselContent
  },
  data: () => ({
    /**
     * Number of points.
     */
    points: 0,
    /**
     * ID of the quiz part.
     */
    id: v1(),
    /**
     * The current question index.
     */
    currentQuestionIndex: 0
  }),
  props: {
    /**
     * @values {
     *   text: string;
     *   desc: string;
     *   media: {
     *     selected: string;
     *     image: {
     *       src: string;
     *     };
     *     video: QBrick object;
     *   }
     *   isImageLeft: Boolean;
     *   options: {
     *     text: string;
     *     isCorrect: Boolean;
     *   }
     * }[] || Boolean
     */
    questions: {
      type: [Array, Boolean],
      default: false
    },
    /**
     * A descriptive text displayed at the end when quiz is finished.
     */
    endText: {
      type: String,
      default: ""
    },
    /**
     * Title of the quiz.
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * Sub title of the quiz.
     */
    subTitle: {
      type: String,
      default: ""
    },
    /**
     * A descriptive text about the quiz. Displayed before quiz is started.
     */
    startText: {
      type: String,
      default: ""
    },
    /**
     * Optional image or video to display before quiz is taken.
     */
    media: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * Optional object that holds feedback messages.
     */
    feedback: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * Object with all localized strings
     */
     localize: {
       type: Object
     }
  },
  provide: {
    localize: localize
  },
  created() {
    EventBus.$on("quiz__next", (id) => (id && id === this.id && this.next()));
    EventBus.$on("quiz__point", (id) => (id && id === this.id && this.points++));
    EventBus.$on("quiz__restart", (id) => {
      if (id === this.id) {
        this.currentQuestionIndex = 0;
        this.points = 0;
      }
    });
  },
  methods: {
    /**
     * Goes to the next slide.
     */
    next: function () {
      if (this.currentQuestionIndex <= this.questions.length) {
        this.currentQuestionIndex++;
      }
    }
  }
};
</script>
