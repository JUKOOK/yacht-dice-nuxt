<template>
  <button
    :class="diceClass"
    tabindex="1"
    @click="onClick"
    @contextmenu="onContextMenu($event)"
  >
    <img :src="imgSrc" class="dice-img" />
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { eyeEnum } from '~/constants/enum';

import DiceBlank from '~/assets/imgs/dice-dark-blank.png';
import Dice1 from '~/assets/imgs/dice-dark-1.png';
import Dice2 from '~/assets/imgs/dice-dark-2.png';
import Dice3 from '~/assets/imgs/dice-dark-3.png';
import Dice4 from '~/assets/imgs/dice-dark-4.png';
import Dice5 from '~/assets/imgs/dice-dark-5.png';
import Dice6 from '~/assets/imgs/dice-dark-6.png';

const props = defineProps({
  eye: {
    type: Number,
    default: 0,
  },
  isFixed: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['dice-clicked', 'dice-right-clicked']);

const diceClass = computed(() => {
  const cls = ['dice', 'clickable-layer'];
  if (props.eye === eyeEnum.Blank) cls.push('blank');
  if (props.isFixed) cls.push('fixed');
  return cls;
});
const imgSrc = computed(() => {
  const diceImgList = [DiceBlank, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  return diceImgList[props.eye];
});

function onClick() {
  if (props.isFixed) return;
  emit('dice-clicked');
}
function onContextMenu(e) {
  e.preventDefault();
  emit('dice-right-clicked');
}
</script>

<style lang="scss" scoped>
.dice {
  width: 7.4rem;
  height: 7.4rem;
  background-color: #fff;
  border-radius: 1rem;
  user-select: none;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid #fb1916;
  .dice-img {
    width: 7.2rem;
    height: 7.2rem;
    display: block;
    background-size: contain;
  }
  &.fixed {
    border-color: #00e1ff;
    cursor: default;
    &::after {
      background-color: #00e1ff;
      opacity: 0.5;
    }
  }
  &:not(.fixed).blank,
  &:not(.fixed):hover {
    border-color: #fff;
  }
}
</style>
