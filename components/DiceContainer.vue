<template>
  <div class="dice-container">
    <img class="container-img" :src="ContainerImg" width="920" height="920" />
    <div class="dice-wrapper">
      <Dice
        v-for="dice in match.dices"
        :eye="dice.diceEye"
        :isFixed="dice.isFixed"
        @dice-clicked="dice.rollUpEye()"
        @dice-right-clicked="dice.toggleFixed()"
      />
    </div>
    <button class="btn-guide clickable-layer" @click="emit('btn-guide-clicked')">
      <CircleQuestionIcon :width="40" :height="40" />
    </button>
    <span class="test">{{ diceEyes }}</span>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';

import Dice from './Dice.vue';
import CircleQuestionIcon from './icons/CircleQuestionIcon.vue';

import ContainerImg from '~/assets/imgs/container.png';

const match = inject('match');

const diceEyes = computed(() => {
  return match.dices.map((dice) => dice.diceEye).join(' ');
});

const emit = defineEmits(['btn-guide-clicked']);
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

.dice-container .test {
  position: absolute;
  top: 70%;
  left: calc(50% + 5px);
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: #fff;
  letter-spacing: 2px;
}
</style>
