<template>
  <div class="container">
    <div class="list-small-links__head">
      <span>Ressurser</span>
    </div>
    <div>
      <div
        v-for="(rows, i) in links"
        :key="i"
        class="list-small-links__row row"
      >
        <div
          v-for="(link, x) in rows"
          :key="x"
          class="list-small-links__col col-lg-4"
        >
          <a
            :href="link.href"
            :target="link.newTab ? '_blank' : ''"
            class="underline-draw__root"
          >
            <img :src="link.icon" alt="Lenke ikon"/>
            <div>
              <span class="underline-draw__target">{{link.title}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Links",
  props: {
    links: {
      type: [Array, Boolean],
      default: false
    }
  }
};
</script>

<style lang="scss">
.list-small-links__head {
  font-size: 1.25rem;
  font-weight: 500;
  padding-bottom: 1rem;
  border-bottom: 1px solid #c6c7c4;
  margin-bottom: 1.5rem;
}
.list-small-links__col {
  display: flex;
  a {
    width: 100%;
    display: flex;
    text-decoration: none !important;
    span {
      font-weight: 500;
      font-size: 1.5rem;
    }
    img {
      width: 28px;
      margin-right: 1rem;
      transition: transform .2s ease;
    }
    &:hover img {
      transform: translateX(10%);
    }
  }
}

</style>
