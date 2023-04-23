<template>
  <div class="circle-question-icon">
    <svg
      :width="props.width"
      :height="props.height"
      style="display: block"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
      />
      <path
        d="M10 7.5L10.1421 7.35786C11.1682 6.33179 12.8318 6.33179 13.8579 7.35786V7.35786C14.9885 8.48847 14.8556 10.3583 13.5764 11.3177L12.5052 12.1211C12.1872 12.3596 12 12.7339 12 13.1315V14"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        r="0.5"
        vector-effect="non-scaling-stroke"
        transform="matrix(1 0 0 -1 12 17.5)"
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
.circle-question-icon {
  color: #e5e5e5;
  svg {
    stroke: currentColor;
  }
}
</style>
