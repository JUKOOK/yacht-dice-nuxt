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
const MISSION_SUCCESS_POINT = 63;
const MISSION_SUCCESS_BONUS = 35;
const TOTAL_TURN = 12; // 1 ~ 12

export default class Game {
  constructor({
    p1Board = POINT_BOARD,
    p2Board = POINT_BOARD,
    playerTurn = 'p1',
  } = {}) {
    this._p1PointBoard = structuredClone(p1Board);
    this._p2PointBoard = structuredClone(p2Board);
    this._playerTurn = playerTurn; // 'p1' or 'p2'
  }

  get playerTurn() {
    return this._playerTurn;
  }

  get p1Mission() {
    return this._p1PointBoard.mission;
  }
  get p1Combination() {
    return this._p1PointBoard.combination;
  }
  get p1MissionSum() {
    const missionPoints = Object.values(this.p1Mission);
    return sumArray(missionPoints);
  }
  get p1MissionSuccess() {
    return this.p1MissionSum >= MISSION_SUCCESS_POINT;
  }
  get p1TotalSum() {
    const missionPoint = sumArray(Object.values(this.p1Mission));
    const missionSuccessPoint = this.p1MissionSuccess ? MISSION_SUCCESS_BONUS : 0;
    const combinationPoint = sumArray(Object.values(this.p1Combination));
    return missionPoint + missionSuccessPoint + combinationPoint;
  }
  get p1CurrentTurn() {
    const combined = Object.assign({}, this.p1Mission, this.p1Combination);
    let count = 0;
    for (let category in combined) {
      if (combined[category] !== null) count++;
    }
    return count + 1;
  }
  get p1remainedTurn() {
    return TOTAL_TURN - this.p1CurrentTurn;
  }

  get p2Mission() {
    return this._p2PointBoard.mission;
  }
  get p2Combination() {
    return this._p2PointBoard.combination;
  }
  get p2MissionSum() {
    const missionPoints = Object.values(this.p2Mission);
    return sumArray(missionPoints);
  }
  get p2MissionSuccess() {
    return this.p2MissionSum >= MISSION_SUCCESS_POINT;
  }
  get p2TotalSum() {
    const missionPoint = sumArray(Object.values(this.p2Mission));
    const missionSuccessPoint = this.p2MissionSuccess ? MISSION_SUCCESS_BONUS : 0;
    const combinationPoint = sumArray(Object.values(this.p2Combination));
    return missionPoint + missionSuccessPoint + combinationPoint;
  }
  get p2CurrentTurn() {
    const combined = Object.assign({}, this.p2Mission, this.p2Combination);
    let count = 0;
    for (let category in combined) {
      if (combined[category] !== null) count++;
    }
    return count + 1;
  }
  get p2remainedTurn() {
    return TOTAL_TURN - this.p2CurrentTurn;
  }

  get gameWinner() {
    if (this.p1remainedTurn > 0 || this.p2remainedTurn > 0) return null;
    if (this.p1TotalSum > this.p2TotalSum) return 'p1';
    else if (this.p1TotalSum < this.p2TotalSum) return 'p2';
    else return 'draw';
  }

  getPoint(playerTurn, category) {
    if (playerTurn === 'p1') {
      if (category in this.p1Mission) return this.p1Mission[category];
      else return this.p1Combination[category];
    } else if (playerTurn === 'p2') {
      if (category in this.p2Mission) return this.p2Mission[category];
      else return this.p2Combination[category];
    }
  }
  setPoint(playerTurn, category, value) {
    if (playerTurn === 'p1') {
      if (category in this.p1Mission) this.p1Mission[category] = value;
      else this.p1Combination[category] = value;
    } else if (playerTurn === 'p2') {
      if (category in this.p2Mission) this.p2Mission[category] = value;
      else this.p2Combination[category] = value;
    }
  }
  toggleTurn() {
    if (this._playerTurn === 'p1') {
      this._playerTurn = 'p2';
    } else if (this._playerTurn === 'p2') {
      this._playerTurn = 'p1';
    }
  }

  reset() {
    this._p1PointBoard = structuredClone(POINT_BOARD);
    this._p2PointBoard = structuredClone(POINT_BOARD);
    this._playerTurn = 'p1';
  }
}
