<template>
  <div class="yacht-dice">
    <PointBoard />
    <!-- <DiceContainer /> -->

    <ModalsContainer />
    <button class="btn-guide clickable-layer" @click="openGuideModal">
      <CircleQuestionIcon :width="32" :height="32" />
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { ModalsContainer, useModal } from 'vue-final-modal';
import Match from '~/core/match';

import PointBoard from '~/components/PointBoard.vue';
// import DiceContainer from '~/components/DiceContainer.vue';
import RuleGuideModal from '~/components/RuleGuideModal.vue';
import MatchMakerModal from '~/components/MatchMakerModal.vue';

import CircleQuestionIcon from './components/icons/CircleQuestionIcon.vue';

const match = reactive(new Match());

const { open: openGuideModal, close: closeGuideModal } = useModal({
  component: RuleGuideModal,
  attrs: {
    onConfirm() {
      closeGuideModal();
    },
  },
});

const { open: openMatchMakerModal, close: closeMatchMakerModal } = useModal({
  component: MatchMakerModal,
  attrs: {
    clickToClose: false,
    escToClose: false,
    onConfirm(args) {
      createMatch(args);
      closeMatchMakerModal();
    },
  },
});

openMatchMakerModal();

function createMatch(args) {
  match.startMatch(args);
  // console.log(match);
}
</script>

<style lang="scss" scoped>
.yacht-dice {
  display: flex;
  .btn-guide {
    width: 3.6rem;
    height: 3.6rem;
    padding: 2px;
    position: fixed;
    right: 2.4rem;
    bottom: 2.4rem;
    border-radius: 4px;
  }
}
</style>
