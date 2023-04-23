<template>
  <div class="point-board">
    <table class="point-table" :data-turn="match.currentTurn">
      <thead>
        <tr class="score-stars">
          <th class="blank" rowspan="2"></th>
          <th class="player-1 score">1</th>
          <th class="player-2 score">0</th>
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
          <td class="player-1" @click="onClick">{{ getPoint(key, 'p1') }}</td>
          <td class="player-2" @click="onClick">{{ getPoint(key, 'p2') }}</td>
        </tr>
        <tr class="mission-sum">
          <td class="category">미션 총합</td>
          <td class="player-1">0 / 63</td>
          <!-- p1MissionSum -->
          <td class="player-2">0 / 63</td>
          <!-- p2MissionSum -->
        </tr>
        <tr class="mission-bonus">
          <td class="category">보너스 (+35)</td>
          <td class="player-1">0</td>
          <!-- p1MissionSuccess 로 0 or 35 -->
          <td class="player-2">0</td>
          <!-- p2MissionSuccess 로 0 or 35 -->
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
          <td class="player-1" @click="onClick">{{ getPoint(key, 'p1') }}</td>
          <td class="player-2" @click="onClick">{{ getPoint(key, 'p2') }}</td>
        </tr>
        <tr class="total-point">
          <td class="category">총점</td>
          <td class="player-1">0</td>
          <td class="player-2">0</td>
        </tr>

        <!-- <tr id="aces" class="numberable">
          <td class="mission-aces"><span class="icon"></span>Aces</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="twos" class="numberable">
          <td class="mission-twos"><span class="icon"></span>Twos</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="threes" class="numberable">
          <td class="mission-threes"><span class="icon"></span>Threes</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="fours" class="numberable">
          <td class="mission-fours"><span class="icon"></span>Fours</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="fives" class="numberable">
          <td class="mission-fives"><span class="icon"></span>Fives</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="sixes" class=" numberable">
          <td class="mission-sixes"><span class="icon"></span>Sixes</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="missionTotal">
          <td class="mission-sum">미션 합</td>
          <td>0 / 63</td>
          <td>0 / 63</td>
        </tr>
        <tr id="bonus" class="">
          <td class="mission-bonus">보너스 (+35)</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="choice" class="numberable">
          <td class="mission-combination"><span class="icon"></span>Choice</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="four-of-a-kind" class="numberable">
          <td class="mission-combination"><span class="icon"></span>4 of a Kind</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="full-house" class="numberable">
          <td class="mission-combination"><span class="icon"></span>Full House</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="small-straight" class="numberable">
          <td class="mission-combination"><span class="icon"></span>S. Straight</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="large-straight" class="numberable">
          <td class="mission-combination"><span class="icon"></span>L. Straight</td>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="yacht" class=" numberable">
          <td class="mission-yacht"><span class="icon"></span>YACHT</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="total-point" class="">
          <td class="total-point">총점</td>
          <td>0</td>
          <td>0</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import { MISSION_LIST, COMBINATION_LIST } from '~/constants';
import { calcPoint } from '~/core/point-calculator';

const match = inject('match');

// const currentGame = computed(() => match.currentGame);
// const p1Name = computed(() => match.player1Name ?? '플레이어 1');
// const p2Name = computed(() => match.player2Name ?? '플레이어 2');
// const p1PointBoard = computed(() => match.currentGame.p1PointBoard);
// const p2PointBoard = computed(() => match.currentGame.p2PointBoard);

function getPoint(categoryKey, player) {
  // 다이스 눈이 풀로체워지지 않았으면 모두 null 반환
  // currentTurn이 아니면 null 반환
  // currentTurn이면 calcPoint 돌리고 그 값을 보여줌
}

function onClick() {}
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

// .point-table thead tr.players {
//   td .turn-number {
//     line-height: 3.2rem;
//     .word {
//       font-size: 2.2rem;
//       font-weight: 400;
//       letter-spacing: 2px;
//     }
//     .num {
//       font-size: 3.6rem;
//     }
//   }
// }

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
    background-color: #e6d4d4;
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
  color: #00a000;
  font-weight: bold;
  background-color: #fbdaa7;
}

.point-table[data-turn='p1'] tr.numberable td.player-1,
.point-table[data-turn='p2'] tr.numberable td.player-2 {
  color: #989696;
  background-color: #fbdaa7;
  &:not(.filled):hover {
    cursor: pointer;
    background-color: rgb(236, 156, 51);
  }
}

.point-table tr.numberable td.player-1.filled {
  color: #dd2626;
}

.point-table tr.numberable td.player-2.filled {
  color: #4363e8;
}
</style>
