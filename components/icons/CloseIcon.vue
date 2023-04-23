<template>
  <div class="close-icon">
    <svg
      :width="props.width"
      :height="props.height"
      viewBox="0 0 24 24"
      style="display: block"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 5L19 19M19 5L5 19"
        stroke-width="1.5"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 24,
  },
  height: {
    type: Number,
    default: 24,
  },
});
</script>

<style lang="scss">
.close-icon {
  color: #000;
  svg {
    stroke: currentColor;
  }
}
</style>
