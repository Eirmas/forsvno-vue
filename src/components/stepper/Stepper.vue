<template>
  <casket
    :initial-step="lastActivePoint()"
    :min-length="225"
    :num-steps="steps.length"
    :arrow-right="arrowRight"
  >
    <div
      class="stepper__content"
    >
      <div
        class="stepper__lines"
      >
        <div
          v-for="(step, i) in steps"
          :key="i"
          :class="[
            'stepper__line', i === steps.length - 1 && 'stepper__line-last',
            i < lastActivePoint() && 'stepper__line-dashed',
            step.link && !step.active && 'stepper__link'
          ]"
        >
          <a
            v-if="step.link"
            :href="step.link.href"
            :target="step.link.newTab ? '_blank' : '_self'"
            rel="noreferrer noopener"
          >
            <div
              :class="[
                'stepper__point',
                step.active && 'stepper__point-active'
              ]"
            >
              <div>{{ step.text }}</div>
            </div>
          </a>
          <div
            v-else
            :class="[
              'stepper__point',
              step.active && 'stepper__point-active'
            ]"
          >
            <div>{{ step.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </casket>
</template>

<script>
import Casket from "./Casket.vue";

export default {
  name: "Stepper",
  components: {
    Casket
  },
  props: {
    steps: Array,
    arrowRight: String
  },
  methods: {
    lastActivePoint: function () {
      let i = 0;
      this.steps.forEach((step, index) => {
        if (step.active) {
          i = index;
        }
      });
      return i;
    }
  }
};
</script>
