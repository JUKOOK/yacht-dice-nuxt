<template>
  <div class="yacht-dice">
    <PointBoard />
    <DiceContainer @btn-guide-clicked="openGuideModal" />

    <ModalsContainer />
  </div>
</template>

<script setup>
import { reactive, provide, onMounted } from 'vue';
import { ModalsContainer, useModal } from 'vue-final-modal';
import Match from '~/core/match';

import PointBoard from '~/components/PointBoard.vue';
import DiceContainer from '~/components/DiceContainer.vue';
import RuleGuideModal from '~/components/RuleGuideModal.vue';
import MatchMakerModal from '~/components/MatchMakerModal.vue';

const match = reactive(new Match());
provide('match', match);

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

onMounted(() =>
  createMatch({
    p1Name: '111',
    p2Name: '222',
    matchType: 'single',
  })
);
// openMatchMakerModal();

function createMatch(args) {
  match.startMatch(args);
  // console.log(match);
}
</script>

<style lang="scss" scoped>
.yacht-dice {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
