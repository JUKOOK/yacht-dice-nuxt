// import { ref } from 'vue';
// import { wait } from '@as/utils';
import { sumArray } from '~/utils';

const POINT_BOARD = {
  mission: {
    aces: null,
    dual: null,
    triple: null,
    quadruple: null,
    penta: null,
    hexa: null,
  },
  combination: {
    choice: null,
    fourKind: null,
    fullHouse: null,
    smallStr: null,
    largeStr: null,
    yacht: null,
  },
};
const MISSION_SUCCESS_THRESHOLD = 63;
const MISSION_SUCCESS_POINT = 35;
const TOTAL_TURN = 12; // 1 ~ 12

export default class Game {
  constructor() {
    this._p1PointBoard = structuredClone(POINT_BOARD);
    this._p2PointBoard = structuredClone(POINT_BOARD);
    this._currentTurn = 'p1'; // 'p1' or 'p2'
  }

  get p1PointBoard() {
    return this._p1PointBoard;
  }
  get p2PointBoard() {
    return this._p2PointBoard;
  }
  get playerTurn() {
    return this._currentTurn;
  }

  get p1MissionSum() {
    const missionPoints = Object.values(this._p1PointBoard.mission);
    return sumArray(missionPoints);
  }
  get p1MissionSuccess() {
    return this.p1MissionSum >= MISSION_SUCCESS_THRESHOLD;
  }
  get p1TotalSum() {
    const missionPoints = Object.values(this._p1PointBoard.mission);
    const missionSuccessPoint = this.p1MissionSuccess ? MISSION_SUCCESS_POINT : 0;
    const combinationPoints = Object.values(this._p1PointBoard.combination);
    return sumArray(missionPoints) + missionSuccessPoint + sumArray(combinationPoints);
  }
  get p1CurrentTurn() {
    let combined = Object.assign(
      {},
      this._p1PointBoard.mission,
      this._p1PointBoard.combination
    );
    let count = 0;
    for (let prop in combined) {
      if (combined[prop] !== null) count++;
    }
    return count + 1;
  }
  get p1remainedTurn() {
    return TOTAL_TURN - this.p1CurrentTurn;
  }
  get p2MissionSum() {
    const missionPoints = Object.values(this._p2PointBoard.mission);
    return sumArray(missionPoints);
  }
  get p2MissionSuccess() {
    return this.p2MissionSum >= MISSION_SUCCESS_THRESHOLD;
  }
  get p2TotalSum() {
    const missionPoints = Object.values(this._p2PointBoard.mission);
    const missionSuccessPoint = this.p2MissionSuccess ? MISSION_SUCCESS_POINT : 0;
    const combinationPoints = Object.values(this._p2PointBoard.combination);
    return sumArray(missionPoints) + missionSuccessPoint + sumArray(combinationPoints);
  }
  get p2CurrentTurn() {
    let combined = Object.assign(
      {},
      this._p2PointBoard.mission,
      this._p2PointBoard.combination
    );
    let count = 0;
    for (let prop in combined) {
      if (combined[prop] !== null) count++;
    }
    return count + 1;
  }
  get p2remainedTurn() {
    return TOTAL_TURN - this.p2CurrentTurn;
  }

  setPoint(pturn, prop, value) {
    if (pturn === 'p1') {
      this._p1PointBoard[prop] = value;
    } else if (pturn === 'p2') {
      this._p2PointBoard[prop] = value;
    }
  }
  toggleTurn() {
    if (this._currentTurn === 'p1') {
      this._currentTurn = 'p2';
    } else if (this._currentTurn === 'p2') {
      this._currentTurn = 'p1';
    }
  }
  getWinner() {
    if (this.p1remainedTurn > 0 || this.p2remainedTurn > 0) return '';
    if (this.p1TotalSum > this.p2TotalSum) return 'p1';
    else if (this.p1TotalSum < this.p2TotalSum) return 'p2';
    else if (this.p1TotalSum > this.p2TotalSum) return 'draw';
  }
  endGame() {}
}
