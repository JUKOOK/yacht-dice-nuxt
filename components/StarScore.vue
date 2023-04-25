<template>
  <div class="score-wrapper">
    <StarIcon
      v-for="(def, idx) in starDefs"
      :key="idx"
      :class="def"
      :width="32"
      :height="32"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

import StarIcon from '~/components/icons/StarIcon.vue';

const props = defineProps({
  winToScore: {
    type: Number,
    default: 0,
  },
  playerScore: {
    type: Number,
    default: 0,
  },
});

const starDefs = computed(() => {
  const fillStars = Array(props.playerScore).fill('fill');
  const emptyStars = Array(props.winToScore - props.playerScore).fill('empty');
  return [...fillStars, ...emptyStars];
});
</script>

<style lang="scss" scoped>
.score-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &:deep(.star-icon).fill {
    .star-icon__fill {
      fill: currentColor;
    }
  }
}
</style>
