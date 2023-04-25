<template>
  <div class="yacht-dice">
    <PointBoard @game-end="onGameEnd" />
    <DiceContainer @btn-guide-clicked="openGuideModal" />

    <ModalsContainer />
  </div>
</template>

<script setup>
import { reactive, provide } from 'vue';
import { ModalsContainer, useModal } from 'vue-final-modal';
import Swal from 'sweetalert2';
import Match from '~/core/match';
import { wait } from '~/utils';
import 'animate.css';

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
    onConfirm({ type, gameInfo }) {
      match.startMatch(gameInfo);
      if (type === 'new-game') {
        match.saveMatch();
      } else {
        if (match.isMatchEnd) alertMatchEnd();
        else if (match.isGameEnd) alertGameEnd();
      }
      closeMatchMakerModal();
    },
  },
});

openMatchMakerModal();

function onGameEnd() {
  match.endGame();
  match.saveMatch();
  alertGameEnd();
}

function alertGameEnd() {
  // TODO: 승, 패, 무승부 디자인
  const gameWinner = match.currentGameWinner;
  const winnerName =
    gameWinner === 'p1'
      ? match.player1Name
      : gameWinner === 'p2'
      ? match.player2Name
      : '';
  const title =
    gameWinner === 'draw'
      ? '<h2 class="draw">무승부</h2>'
      : `<h2 class="winner-notice"><span class="winner-name">${winnerName}</span> 승리</h2>`;
  const text = `${match.player1Score} : ${match.player2Score}`;

  Swal.fire({
    title,
    text,
    showConfirmButton: !match.isMatchEnd, // 게임 종료하지 않은 상태. 순서 바꿔서 다음 판
    showDenyButton: !match.isMatchEnd, // 게임 종료하지 않은 상태. 순서 유지하고 다음 판
    showCancelButton: match.isMatchEnd, // 게임 종료 예정. '다음'
    confirmButtonText: '순서 바꿔서 다음 판 진행',
    denyButtonText: '순서 유지하고 다음 판 진행',
    cancelButtonText: '게임 종료',
    showClass: {
      popup: 'animate__animated animate__bounceIn',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      match.startNextGame({ shouldSwap: true });
      match.saveMatch();
    } else if (result.isDenied) {
      match.startNextGame({ shouldSwap: false });
      match.saveMatch();
    } else if (result.isDismissed) {
      alertMatchEnd();
    }
  });
}

function alertMatchEnd() {
  // TODO: 게임 종료 디자인
  const matchWinner = match.matchWinner;
  const winnerName = matchWinner === 'p1' ? match.player1Name : match.player2Name;
  Swal.fire({
    title: `<h1>${winnerName} 승리</h1>`,
    confirmButtonText: '게임 종료',
    showClass: {
      popup: 'animate__animated animate__bounceIn',
    },
    hideClass: {
      popup: 'animate__animated animate__bounceOut',
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      match.endMatch();
      await wait(1000);
      openMatchMakerModal();
    }
  });
}
</script>

<style lang="scss" scoped>
.yacht-dice {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
}
</style>
