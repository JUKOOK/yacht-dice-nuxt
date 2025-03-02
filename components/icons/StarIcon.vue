<template>
  <div class="star-icon">
    <svg
      :width="props.width"
      :height="props.height"
      viewBox="0 0 24 24"
      style="display: block"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5433 3.02453C11.7195 2.62928 12.2805 2.62929 12.4567 3.02453L14.6452 7.93422C14.7178 8.09723 14.8719 8.20916 15.0494 8.22789L20.3951 8.79209C20.8254 8.83751 20.9988 9.37107 20.6773 9.66076L16.6842 13.2593C16.5516 13.3788 16.4928 13.5599 16.5298 13.7345L17.6451 18.9929C17.7349 19.4162 17.281 19.7459 16.9062 19.5297L12.2498 16.8441C12.0952 16.7549 11.9048 16.7549 11.7502 16.8441L7.09382 19.5297C6.71896 19.7459 6.2651 19.4162 6.35489 18.9929L7.4702 13.7345C7.50723 13.5599 7.44839 13.3788 7.31581 13.2593L3.3227 9.66076C3.00124 9.37106 3.1746 8.83751 3.60494 8.79209L8.95062 8.22789C9.12811 8.20916 9.28216 8.09723 9.35482 7.93422L11.5433 3.02453Z"
        class="star-icon__fill"
        stroke-width="2"
        stroke-linejoin="round"
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
.star-icon {
  color: #ffe3b9;
  svg {
    stroke: currentColor;
    .star-icon__fill {
      fill: none;
    }
  }
}
</style>
