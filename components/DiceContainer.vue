<template>
  <div class="dice-container">
    <img class="container-img" :src="ContainerImg" width="920" height="920" />
    <div class="dice-wrapper">
      <Dice
        v-for="dice in match.dices"
        :dice="dice"
        @dice-changed="debounceSaveMatch"
      />
    </div>
    <button class="btn-guide clickable-layer" @click="emit('btn-guide-clicked')">
      <CircleQuestionIcon :width="42" :height="42" />
    </button>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { debounce } from 'throttle-debounce';

import Dice from './Dice.vue';
import CircleQuestionIcon from './icons/CircleQuestionIcon.vue';

import ContainerImg from '~/assets/imgs/container.png';

const match = inject('match');
const emit = defineEmits(['btn-guide-clicked']);

const debounceSaveMatch = debounce(300, () => match.saveMatch());
</script>

<style lang="scss" scoped>
.dice-container {
  max-height: 100vh;
  position: relative;
}

.dice-container .container-img {
  margin-top: 8px;
}

.dice-container .dice-wrapper {
  position: absolute;
  top: 50%;
  left: calc(50% + 5px);
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
}

.dice-container .btn-guide {
  padding: 2px;
  position: absolute;
  top: 2px;
  right: 0;
  border-radius: 4px;
}
</style>
