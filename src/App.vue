<template>
  <main>
    <div class="promocard-horizontal__wrapper">
      <Promocard
        :title="promocard.title"
        :items="promocard.items"
        :icons="promocard.icons"
      />
    </div>
  </main>
</template>

<script>
import Promocard from "./components/promocard-horizontal/Promocard.vue";

export default {
  name: "App",
  components: {
    Promocard
  },
  data: () => ({
    promocard: {
      title: "Top tittel",
      icons: {
        arrow: require("./assets/images/arrow-right.svg")
      },
      items: [
        {
          title: "01",
          text: "Tekst ",
          decoration: {
            icon: {
              src: require("./assets/images/medalje.svg")
            },
            caption: "Post mortem"
          }
        },
        {
          title: "02",
          text: "Tekst "
        },
        {
          title: "03",
          text: "Tekst "
        }
      ]
    }
  })
};
</script>
