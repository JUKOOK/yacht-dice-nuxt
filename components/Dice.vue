<template>
  <div
    :class="diceClass"
    tabindex="1"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @contextmenu="onContextMenu($event)"
    @click="onClick"
    @wheel="onWheel"
  >
    <img :src="imgSrc" class="dice-img" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { throttle } from 'throttle-debounce';

import DiceBlank from '~/assets/imgs/dice-dark-blank.png';
import Dice1 from '~/assets/imgs/dice-dark-1.png';
import Dice2 from '~/assets/imgs/dice-dark-2.png';
import Dice3 from '~/assets/imgs/dice-dark-3.png';
import Dice4 from '~/assets/imgs/dice-dark-4.png';
import Dice5 from '~/assets/imgs/dice-dark-5.png';
import Dice6 from '~/assets/imgs/dice-dark-6.png';

const IMAGE_LIST = [DiceBlank, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const props = defineProps({
  dice: {
    type: [Object, null],
    default: null,
  },
});
const emit = defineEmits(['dice-changed']);

const diceClass = computed(() => {
  const cls = ['dice', 'clickable-layer'];
  if (props.dice.isActive) cls.push('active');
  else if (props.dice.isFixed) cls.push('fixed');
  else cls.push('none');
  return cls;
});
const imgSrc = computed(() => IMAGE_LIST[props.dice.diceEye]);

onMounted(() => {
  document.addEventListener('keyup', onKeyup);
});
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyup);
});

const throttleRollUp = throttle(200, () => {
  props.dice.rollUpEye();
  emit('dice-changed');
});
const throttleRollDown = throttle(200, () => {
  props.dice.rollDownEye();
  emit('dice-changed');
});

function onMouseenter() {
  if (props.dice.isFixed) return;
  if (!props.dice.isActive) props.dice.setActive(true);
}
function onMouseleave() {
  if (props.dice.isFixed) return;
  if (props.dice.isActive) props.dice.setActive(false);
}
function onContextMenu(e) {
  e.preventDefault();
  props.dice.setFixed(!props.dice.isFixed);
  emit('dice-changed');
}
function onClick() {
  if (!props.dice.isActive) return;

  throttleRollUp();
}
function onWheel(e) {
  if (!props.dice.isActive) return;

  const { deltaY } = e;
  if (deltaY > 0) throttleRollUp();
  if (deltaY < 0) throttleRollDown();
}
function onKeyup(e) {
  if (!props.dice.isActive) return;

  if (['ArrowUp', 'ArrowRight'].includes(e.code)) throttleRollUp();
  else if (['ArrowDown', 'ArrowLeft'].includes(e.code)) throttleRollDown();
}
</script>

<style lang="scss" scoped>
.dice {
  width: 7.4rem;
  height: 7.4rem;
  background-color: #fff;
  border-radius: 1rem;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid #fb1916;
  outline: 0;
  .dice-img {
    width: 7.2rem;
    height: 7.2rem;
    display: block;
    background-size: contain;
  }
  &.none:hover {
    border-color: #c4c4c4;
  }
  &.active {
    border-color: #fff;
  }
  &.fixed {
    border-color: #00e1ff;
    cursor: default;
    &::after {
      background-color: #00e1ff;
      opacity: 0.5;
    }
  }
}
</style>
