<template>
  <div class="point-board">
    <table class="point-table" :data-turn="match.playerTurn">
      <thead>
        <tr class="score-stars">
          <th class="blank" rowspan="2"></th>
          <th class="player-1 score">
            <StarScore
              :winToScore="match.scoreToWin"
              :playerScore="match.player1Score"
            />
          </th>
          <th class="player-2 score">
            <StarScore
              :winToScore="match.scoreToWin"
              :playerScore="match.player2Score"
            />
          </th>
        </tr>
        <tr class="players">
          <th class="player-1 name">{{ match.player1Name }}</th>
          <th class="player-2 name">{{ match.player2Name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="mission numberable"
          v-for="{ key, label } in MISSION_LIST"
          :key="key"
        >
          <td :class="['category', key]">
            <span class="icon" />
            <span class="label">{{ label }} </span>
          </td>
          <td
            class="player-1"
            :class="{ pointed: isFilled('p1', key) }"
            @click="onClick('p1', key)"
          >
            {{ point('p1', key) }}
          </td>
          <td
            class="player-2"
            :class="{ pointed: isFilled('p2', key) }"
            @click="onClick('p2', key)"
          >
            {{ point('p2', key) }}
          </td>
        </tr>
        <tr class="mission-sum">
          <td class="category">미션 총합</td>
          <td class="player-1">{{ match.p1MissionSum }} / 63</td>
          <td class="player-2">{{ match.p2MissionSum }} / 63</td>
        </tr>
        <!-- TODO: 미션 성공시 애니메이션 추가 -->
        <tr class="mission-bonus">
          <td class="category">보너스 (+35)</td>
          <td class="player-1 pointed">{{ match.p1MissionSuccess ? 35 : 0 }}</td>
          <td class="player-2 pointed">{{ match.p2MissionSuccess ? 35 : 0 }}</td>
        </tr>
        <tr
          class="combination numberable"
          v-for="{ key, label } in COMBINATION_LIST"
          :key="key"
        >
          <td class="category combination">
            <span class="icon" />
            <span class="label">{{ label }} </span>
          </td>
          <td
            class="player-1"
            :class="{ pointed: isFilled('p1', key) }"
            @click="onClick('p1', key)"
          >
            {{ point('p1', key) }}
          </td>
          <td
            class="player-2"
            :class="{ pointed: isFilled('p2', key) }"
            @click="onClick('p2', key)"
          >
            {{ point('p2', key) }}
          </td>
        </tr>
        <tr class="total-point">
          <td class="category">총점</td>
          <td class="player-1">{{ match.p1TotalSum }}</td>
          <td class="player-2">{{ match.p2TotalSum }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { MISSION_LIST, COMBINATION_LIST } from '~/constants';
import { calcPoint } from '~/core/point-calculator';

import StarScore from './StarScore.vue';

const match = inject('match');

const emit = defineEmits(['emit']);

function isFilled(playerTurn, category) {
  const playerPoint = match.getPlayerPoint(playerTurn, category);
  return typeof playerPoint === 'number';
}
function point(playerTurn, category) {
  const playerPoint = match.getPlayerPoint(playerTurn, category);
  if (typeof playerPoint === 'number') return playerPoint;
  else return getPlaceholderPoint(playerTurn, category);
}
function getPlaceholderPoint(playerTurn, category) {
  if (match.playerTurn !== playerTurn || match.hasBlank) return '';
  else return calcPoint(category, match.eyes);
}

function onClick(playerTurn, category) {
  if (isFilled(playerTurn, category)) return;
  if (match.playerTurn !== playerTurn || match.hasBlank) return;
  else {
    const point = calcPoint(category, match.eyes);
    match.setPlayerPoint(playerTurn, category, point);
    if (match.isGameEnd) emit('game-end');
    else {
      match.toggleTurn();
      match.resetDices();
      match.saveMatch();
    }
  }
}
</script>

<style lang="scss" scoped>
.point-board {
  // width: 48rem;
}

.point-table {
  width: 100%;
  border: solid 2px #333;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
}

.point-table {
  .category {
    width: 14.4rem;
    text-align: left;
  }
  .player-1,
  .player-2 {
    width: 12rem;
    text-align: center;
  }
}

.point-table thead {
  th {
    height: 4.2rem;
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    border: solid 1px #333;
  }
  tr.score-stars {
    // 별
  }
  tr.players .name {
    font-size: 2.4rem;
    color: #272424;
    letter-spacing: 2.5px;
  }
}

.point-table tbody tr {
  td {
    padding: 1.2rem;
    font-weight: 700;
    text-overflow: ellipsis;
    overflow: hidden;
    border: solid 1px #333;
    font-size: 2rem;
    line-height: 2.4rem;
    letter-spacing: 1.5px;
    cursor: default;
  }
  &.mission-sum,
  &.mission-bonus,
  &.total-point {
    background-color: #ebdbdb;
    td {
      padding: 1.6rem 0;
      font-size: 2.2rem;
      text-align: center;
      border: solid 2px #171717;
    }
  }
}

.point-table td.category {
  padding-left: 4.4rem;
  position: relative;
  .icon {
    width: 2rem;
    height: 2rem;
    display: block;
    position: absolute;
    top: 50%;
    left: 1.2rem;
    transform: translate(0, -50%);
  }
  &.aces .icon {
    background-image: url(../assets/imgs/dice-dark-1.png);
    background-size: contain;
  }
  &.dual .icon {
    background-image: url(../assets/imgs/dice-dark-2.png);
    background-size: contain;
  }
  &.triple .icon {
    background-image: url(../assets/imgs/dice-dark-3.png);
    background-size: contain;
  }
  &.quadruple .icon {
    background-image: url(../assets/imgs/dice-dark-4.png);
    background-size: contain;
  }
  &.penta .icon {
    background-image: url(../assets/imgs/dice-dark-5.png);
    background-size: contain;
  }
  &.hexa .icon {
    background-image: url(../assets/imgs/dice-dark-6.png);
    background-size: contain;
  }
  &.combination .icon {
    width: 2.6rem;
    height: 2rem;
    left: 9px;
    background-image: url(../assets/imgs/dices-dark.png);
    background-size: contain;
  }
}

.point-table[data-turn='p1'] thead th.player-1.name,
.point-table[data-turn='p2'] thead th.player-2.name {
  font-weight: bold;
  background-color: #defcbb;
}

.point-table[data-turn='p1'] tr.numberable td.player-1,
.point-table[data-turn='p2'] tr.numberable td.player-2 {
  color: #878787;
  background-color: #defcbb;
  &:not(.pointed):hover {
    cursor: pointer;
    background-color: #9cd45b;
  }
}

.point-table tr.numberable td.player-1.pointed,
.point-table tr.mission-bonus td.player-1.pointed {
  font-size: 2.4rem;
  color: #dd2626;
}

.point-table tr.numberable td.player-2.pointed,
.point-table tr.mission-bonus td.player-2.pointed {
  font-size: 2.4rem;
  color: #4363e8;
}
</style>
