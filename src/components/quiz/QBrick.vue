<template>
  <div>
    <div
      class="quiz__video video-responsive"
    >
      <div
        :data-gobrain-widgetId="`${getId()}-player`"
        :data-gobrain-config="this.qbrick.data.qbrick.html['data-gobrain-config']"
        :data-gobrain-data="this.qbrick.data.qbrick.html['data-gobrain-data']"
        data-gobrain-autoplay="false"
      />
    </div>
  </div>
</template>

<script>
import { v1 } from "uuid";

export default {
  name: "QBrick",
  props: {
    qbrick: {
      type: [Object, Boolean],
      default: false
    }
  },
  methods: {
    getId: function () {
      return v1();
    }
  }
};
</script>
