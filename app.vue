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

import WinnerAndLoser from '~/assets/imgs/winner-and-loser.png';
import TieGame from '~/assets/imgs/tie.png';
import WinnerTrophyImg from '~/assets/imgs/winner-golden-trophy.avif';

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
  const winnerName = match.currentGameWinnerName;
  const title = winnerName === null ? '무승부' : `${winnerName} 승리`;
  const html =
    winnerName === null
      ? `<img src="${TieGame}" width="200" height="200" />`
      : `<img src="${WinnerAndLoser}" width="256" height="200" />`;

  Swal.fire({
    title,
    customClass: {
      container: 'game-end-modal',
    },
    background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
    html,
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
  const winnerName = match.matchWinnerName;
  Swal.fire({
    title: `<h1>${winnerName}</h1>`,
    confirmButtonText: '새 게임 진행',
    imageUrl: WinnerTrophyImg,
    customClass: {
      container: 'match-end-modal',
    },
    imageWidth: 640,
    imageHeight: 640,
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
