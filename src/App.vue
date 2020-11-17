<template>
  <main>
    <div class="stepper__wrapper">
      <Stepper
        :steps="steps"
        :arrow-right="require('./assets/images/arrow-right.svg')"
      />
    </div>
  </main>
</template>

<script>
import Stepper from "./components/stepper/Stepper.vue";

export default {
  name: "App",
  components: {
    Stepper
  },
  data: () => ({
    steps: [
      {
        text: "Egenerklæring",
        active: false,
        link: {
          href: "https://google.no/"
        }
      },
      {
        text: "Sesjon",
        active: false,
        link: {
          href: "https://google.no/"
        }
      },
      {
        text: "Rekruttskole",
        active: true,
        link: {
          href: "https://google.no/"
        }
      },
      {
        text: "Førstegangstjeneste",
        active: false,
        link: {
          href: "https://google.no/"
        }
      },
      {
        text: "Utdanning eller jobb",
        active: false,
        link: {
          href: "https://google.no/"
        }
      }
    ]
  })
};
</script>
