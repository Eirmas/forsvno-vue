<template>
  <casket
    :initial-step="lastActivePoint()"
    :min-length="225"
    :num-steps="steps.length"
    :arrow-right="arrowRight"
    :id="id"
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

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Step } from "./types";
import Casket from "./Casket.vue";

@Component({
  name: "Stepper",
  components: {
    Casket
  }
})
export default class Stepper extends Vue {
  @Prop() private steps!: Step[]

  @Prop() private arrowRight!: string

  @Prop() private id!: string

  lastActivePoint = (): number => {
    let i = 0;
    this.steps.forEach((step, index) => {
      if (step.active) {
        i = index;
      }
    });
    return i;
  }
}
</script>
