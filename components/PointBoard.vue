<template>
  <div class="point-board">
    <table class="point-table">
      <tbody>
        <tr class="team-name bold-line">
          <th>
            <h3 class="turn-number">
              <span class="word">Turn</span>
              <br />
              <span class="num"> 0 / 12</span>
            </h3>
          </th>
          <td class="team-one">1팀</td>
          <td class="team-two">2팀</td>
        </tr>
        <tr id="aces" class="numberable">
          <th class="mission-aces"><span class="icon"></span>Aces</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="twos" class="numberable">
          <th class="mission-twos"><span class="icon"></span>Twos</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="threes" class="numberable">
          <th class="mission-threes"><span class="icon"></span>Threes</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="fours" class="numberable">
          <th class="mission-fours"><span class="icon"></span>Fours</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="fives" class="numberable">
          <th class="mission-fives"><span class="icon"></span>Fives</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="sixes" class="bold-line numberable">
          <th class="mission-sixes"><span class="icon"></span>Sixes</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="missionTotal">
          <th class="mission-point">미션 합</th>
          <td>0 / 63</td>
          <td>0 / 63</td>
        </tr>
        <tr id="bonus" class="bold-line">
          <th class="mission-bonus">보너스 (+35)</th>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="choice" class="numberable">
          <th class="mission-combination"><span class="icon"></span>Choice</th>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="four-of-a-kind" class="numberable">
          <th class="mission-combination"><span class="icon"></span>4 of a Kind</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="full-house" class="numberable">
          <th class="mission-combination"><span class="icon"></span>Full House</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="small-straight" class="numberable">
          <th class="mission-combination"><span class="icon"></span>S. Straight</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="large-straight" class="numberable">
          <th class="mission-combination"><span class="icon"></span>L. Straight</th>
          <td @click="onClick">0</td>
          <td @click="onClick">0</td>
        </tr>
        <tr id="yacht" class="bold-line numberable">
          <th class="mission-yacht"><span class="icon"></span>YACHT</th>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="total-point" class="bold-line">
          <th class="total-point">종합</th>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
function onClick() {}
</script>

<style lang="scss" scoped>
.point-board {
  width: 36rem;
  border-radius: 4px;
}

.point-table {
  width: 100%;
  border: solid 2px #333;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
}

.point-table th {
  width: 17.8rem;
  height: 100%;
  line-height: 4rem;
  text-align: left;
  white-space: nowrap;
  padding: 4px 4px 4px 4.2rem;
  font-weight: 600;
  font-size: 2rem;
  border: solid 1px #333;
  position: relative;
  .icon {
    width: 3.2rem;
    height: 3.2rem;
    display: block;
    position: absolute;
    top: 0.8rem;
    left: 5px;
  }
  &.mission-aces .icon {
    // background-image: url(../img/dice-1.png);
    background-size: contain;
  }
  &.mission-twos .icon {
    // background-image: url(../img/dice-2.png);
    background-size: contain;
  }
  &.mission-threes .icon {
    // background-image: url(../img/dice-3.png);
    background-size: contain;
  }
  &.mission-fours .icon {
    // background-image: url(../img/dice-4.png);
    background-size: contain;
  }
  &.mission-fives .icon {
    // background-image: url(../img/dice-5.png);
    background-size: contain;
  }
  &.mission-sixes .icon {
    // background-image: url(../img/dice-6.png);
    background-size: contain;
  }
  &.mission-sixes .icon {
    // background-image: url(../img/dice-6.png);
    background-size: contain;
  }
  &.mission-combination .icon {
    width: 3.6rem;
    height: 3.6rem;
    display: block;
    position: absolute;
    top: 6px;
    left: 3px;
    // background-image: url(../img/dice-combi.png);
    background-size: contain;
  }
  &.mission-yacht .icon {
    width: 2.8rem;
    height: 2.8rem;
    display: block;
    position: absolute;
    top: 0.8rem;
    left: 7px;
    // background-image: url(../img/dice-star.png);
    background-size: contain;
  }
  &.mission-point,
  &.mission-bonus,
  &.total-point {
    padding-left: 0.8rem;
  }
}

.point-table tr {
  td {
    width: 9rem;
    text-align: center;
    font-weight: 700;
    text-overflow: ellipsis;
    overflow: hidden;
    border: solid 1px #333;
    font-size: 2.4rem;
    cursor: default;
  }
  &.bold-line {
    border-bottom: solid 2px #333;
  }
}

.point-table tr.team-name {
  th,
  td {
    padding: 0;
    height: 7.6rem;
    text-align: center;
  }
  th .turn-number {
    line-height: 3.2rem;
    .word {
      font-size: 2.2rem;
      font-weight: 400;
      letter-spacing: 2px;
    }
    .num {
      font-size: 3.6rem;
      color: #00a000;
    }
  }
}

.point-table.team-1 tr.team-name .team-one,
.point-table.team-2 tr.team-name .team-two {
  color: #00a000;
}

.point-table.team-1 tr.team-name .team-two,
.point-table.team-2 tr.team-name .team-one {
  color: #272424;
  font-weight: 400;
}

.point-table.team-1 tr.numberable td {
  &:nth-child(2) {
    color: #989696;
    background-color: #f7d7a7;
    &:not(.filled):hover {
      cursor: pointer;
      background-color: rgb(236, 156, 51);
    }
  }
}

.point-table.team-2 tr.numberable td {
  &:nth-child(3) {
    color: #989696;
    background-color: #f7d7a7;
    &:not(.filled):hover {
      cursor: pointer;
      background-color: rgb(236, 156, 51);
    }
  }
}

.point-table tr.numberable td {
  &.filled:nth-child(2) {
    color: #dd2626;
  }
  &.filled:nth-child(3) {
    color: #4363e8;
  }
}
</style>
