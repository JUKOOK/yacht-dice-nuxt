<template>
  <div class="point-board">
    <table
      class="point-table"
      :class="{ 'three-players': match.playerCount === 3 }"
      :data-turn="match.playerTurn"
    >
      <thead>
        <tr class="score-stars">
          <th class="blank" rowspan="2"></th>
          <th class="player-1 score">
            <StarScore
              :win-to-score="match.scoreToWin"
              :player-score="match.player1Score"
            />
          </th>
          <th class="player-2 score">
            <StarScore
              :win-to-score="match.scoreToWin"
              :player-score="match.player2Score"
            />
          </th>
          <th v-if="match.playerCount === 3" class="player-3 score">
            <StarScore
              :win-to-score="match.scoreToWin"
              :player-score="match.player3Score"
            />
          </th>
        </tr>
        <tr class="players">
          <th class="player-1 name">{{ match.player1Name }}</th>
          <th class="player-2 name">{{ match.player2Name }}</th>
          <th v-if="match.playerCount === 3" class="player-3 name">
            {{ match.player3Name }}
          </th>
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
          <td
            v-if="match.playerCount === 3"
            class="player-3"
            :class="{ pointed: isFilled('p3', key) }"
            @click="onClick('p3', key)"
          >
            {{ point('p3', key) }}
          </td>
        </tr>
        <tr class="mission-sum">
          <td class="category">미션 총합</td>
          <td class="player-1">
            {{ match.p1MissionSum }} <span class="weak">/ 63</span>
          </td>
          <td class="player-2">
            {{ match.p2MissionSum }} <span class="weak">/ 63</span>
          </td>
          <td v-if="match.playerCount === 3" class="player-3">
            {{ match.p3MissionSum }} <span class="weak">/ 63</span>
          </td>
        </tr>
        <tr class="mission-bonus">
          <td class="category">보너스 (+35)</td>
          <td class="player-1 pointed">
            <div
              :class="{
                'animate__animated animate__heartBeat': match.p1MissionSuccess,
              }"
            >
              {{ match.p1MissionSuccess ? 35 : 0 }}
            </div>
          </td>
          <td class="player-2 pointed">
            <div
              :class="{
                'animate__animated animate__heartBeat': match.p2MissionSuccess,
              }"
            >
              {{ match.p2MissionSuccess ? 35 : 0 }}
            </div>
          </td>
          <td v-if="match.playerCount === 3" class="player-3 pointed">
            <div
              :class="{
                'animate__animated animate__heartBeat': match.p3MissionSuccess,
              }"
            >
              {{ match.p3MissionSuccess ? 35 : 0 }}
            </div>
          </td>
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
            <div :class="{ 'animate__animated animate__flip': hasYacht('p1', key) }">
              {{ point('p1', key) }}
            </div>
          </td>
          <td
            class="player-2"
            :class="{ pointed: isFilled('p2', key) }"
            @click="onClick('p2', key)"
          >
            <div :class="{ 'animate__animated animate__flip': hasYacht('p2', key) }">
              {{ point('p2', key) }}
            </div>
          </td>
          <td
            v-if="match.playerCount === 3"
            class="player-3"
            :class="{ pointed: isFilled('p3', key) }"
            @click="onClick('p3', key)"
          >
            <div :class="{ 'animate__animated animate__flip': hasYacht('p3', key) }">
              {{ point('p3', key) }}
            </div>
          </td>
        </tr>
        <tr class="total-point">
          <td class="category">총점</td>
          <td class="player-1">{{ match.p1TotalSum }}</td>
          <td class="player-2">{{ match.p2TotalSum }}</td>
          <td v-if="match.playerCount === 3" class="player-3">
            {{ match.p3TotalSum }}
          </td>
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

function hasYacht(playerTurn, category) {
  if (category !== 'yacht') return false;

  const playerPoint = match.getPlayerPoint(playerTurn, category);
  return !!playerPoint;
}
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
.point-table {
  width: 100%;
  border: solid 2px #333;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.point-table {
  .category {
    width: 15.6rem;
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
    background-color: #775946;
    border: solid 2px #171717;
    &.blank {
      border-top-left-radius: 8px;
    }
    &.player-2.score {
      border-top-right-radius: 8px;
    }
  }
  tr.players .name {
    font-size: 2.3rem;
    color: #fff;
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
    color: #fff;
    background-color: #775946;
    td {
      padding: 1.6rem 0;
      font-size: 2.3rem;
      text-align: center;
      border: solid 2px #171717;
    }
  }
  &.mission-sum .weak {
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: 1px;
  }
  &.total-point {
    td.category {
      border-bottom-left-radius: 8px;
    }
    td.player-2 {
      border-bottom-right-radius: 8px;
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
    background-size: cover;
  }
}

// three-players 3-players
.point-table.three-players {
  .player-1,
  .player-2,
  .player-3 {
    width: 10.8rem;
    text-align: center;
  }

  thead th.player-2.score {
    border-top-right-radius: 0;
  }
  thead th.player-3.score {
    border-top-right-radius: 8px;
  }

  tbody tr.total-point td.player-2 {
    border-bottom-right-radius: 0;
  }
  tbody tr.total-point td.player-3 {
    border-bottom-right-radius: 8px;
  }
}

.point-table[data-turn='p1'] thead th.player-1.name,
.point-table[data-turn='p2'] thead th.player-2.name,
.point-table[data-turn='p3'] thead th.player-3.name {
  font-weight: bold;
  font-size: 2.4rem;
}

.point-table[data-turn='p1'] tr.numberable td.player-1,
.point-table[data-turn='p2'] tr.numberable td.player-2,
.point-table[data-turn='p3'] tr.numberable td.player-3 {
  color: #775946;
  background-color: #fff6e8;
  &:not(.pointed):hover {
    cursor: pointer;
    background-color: #ffe3b9;
  }
}

.point-table tr.numberable td.player-1.pointed,
.point-table tr.mission-bonus td.player-1.pointed {
  font-size: 2.4rem;
  color: #fa5c5c;
}

.point-table tr.numberable td.player-2.pointed,
.point-table tr.mission-bonus td.player-2.pointed {
  font-size: 2.4rem;
  color: #6884f9;
}

.point-table tr.numberable td.player-3.pointed,
.point-table tr.mission-bonus td.player-3.pointed {
  font-size: 2.4rem;
  color: #00b447;
}
</style>
