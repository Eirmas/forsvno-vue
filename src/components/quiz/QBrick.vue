<template>
  <div>
    <div
      class="quiz__video video-responsive"
    >
      <div
        :data-gobrain-widgetId="`${id}-player`"
        :data-gobrain-config="this.qbrick.data.qbrick.html['data-gobrain-config']"
        :data-gobrain-data="this.qbrick.data.qbrick.html['data-gobrain-data']"
        data-gobrain-autoplay="false"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "QBrick",
  props: {
    /**
     * ID of the part
     */
    id: {
      type: String,
      default: "1"
    },
    /**
     * QBrick object
     */
    qbrick: {
      type: [Object, Boolean],
      default: false
    }
  }
};
</script>
