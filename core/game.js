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
  constructor(
    {
      p1Board = POINT_BOARD,
      p2Board = POINT_BOARD,
      p3Board = POINT_BOARD,
      playerTurn = 'p1',
    } = {},
    playerCount = 2
  ) {
    this._p1PointBoard = structuredClone(p1Board);
    this._p2PointBoard = structuredClone(p2Board);
    this._p3PointBoard = structuredClone(p3Board);
    this._playerTurn = playerTurn; // 'p1' or 'p2' or 'p3'
    this._playerCount = playerCount; // 2 or 3
  }

  get playerTurn() {
    return this._playerTurn;
  }
  get playerCount() {
    return this._playerCount;
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
    return count;
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
    return count;
  }
  get p2remainedTurn() {
    return TOTAL_TURN - this.p2CurrentTurn;
  }

  get p3Mission() {
    return this._p3PointBoard.mission;
  }
  get p3Combination() {
    return this._p3PointBoard.combination;
  }
  get p3MissionSum() {
    const missionPoints = Object.values(this.p3Mission);
    return sumArray(missionPoints);
  }
  get p3MissionSuccess() {
    return this.p3MissionSum >= MISSION_SUCCESS_POINT;
  }
  get p3TotalSum() {
    const missionPoint = sumArray(Object.values(this.p3Mission));
    const missionSuccessPoint = this.p3MissionSuccess ? MISSION_SUCCESS_BONUS : 0;
    const combinationPoint = sumArray(Object.values(this.p3Combination));
    return missionPoint + missionSuccessPoint + combinationPoint;
  }
  get p3CurrentTurn() {
    const combined = Object.assign({}, this.p3Mission, this.p3Combination);
    let count = 0;
    for (let category in combined) {
      if (combined[category] !== null) count++;
    }
    return count;
  }
  get p3remainedTurn() {
    return TOTAL_TURN - this.p3CurrentTurn;
  }

  get gameWinner() {
    if (this._playerCount === 2) {
      if (this.p1remainedTurn > 0 || this.p2remainedTurn > 0) return null;
      if (this.p1TotalSum === this.p2TotalSum) return 'tie';
      else return this.p1TotalSum > this.p2TotalSum ? 'p1' : 'p2';
    } else if (this._playerCount === 3) {
      if (
        this.p1remainedTurn > 0 ||
        this.p2remainedTurn > 0 ||
        this.p3remainedTurn > 0
      ) {
        return null;
      }

      const maxScore = Math.max(this.p1TotalSum, this.p2TotalSum, this.p3TotalSum);

      // 둘 이상의 플레이어가 maxScore를 동일하게 가지고 있다면 'tie'를 반환
      if (
        (maxScore === this.p1TotalSum && maxScore === this.p2TotalSum) ||
        (maxScore === this.p2TotalSum && maxScore === this.p3TotalSum) ||
        (maxScore === this.p3TotalSum && maxScore === this.p1TotalSum)
      ) {
        return 'tie';
      }

      // p1TotalSum, p2TotalSum, p3TotalSum 중 가장 높은 값을 가진 플레이어를 반환
      if (maxScore === this.p1TotalSum) return 'p1';
      else if (maxScore === this.p2TotalSum) return 'p2';
      else return 'p3';
    }
  }

  getPoint(playerTurn, category) {
    if (playerTurn === 'p1') {
      if (category in this.p1Mission) return this.p1Mission[category];
      else return this.p1Combination[category];
    } else if (playerTurn === 'p2') {
      if (category in this.p2Mission) return this.p2Mission[category];
      else return this.p2Combination[category];
    } else if (playerTurn === 'p3') {
      if (category in this.p3Mission) return this.p3Mission[category];
      else return this.p3Combination[category];
    }
  }
  setPoint(playerTurn, category, value) {
    if (playerTurn === 'p1') {
      if (category in this.p1Mission) this.p1Mission[category] = value;
      else this.p1Combination[category] = value;
    } else if (playerTurn === 'p2') {
      if (category in this.p2Mission) this.p2Mission[category] = value;
      else this.p2Combination[category] = value;
    } else if (playerTurn === 'p3') {
      if (category in this.p3Mission) this.p3Mission[category] = value;
      else this.p3Combination[category] = value;
    }
  }
  toggleTurn() {
    if (this._playerCount === 2) {
      // p1 -> p2 -> p1 -> p2 -> ...
      if (this._playerTurn === 'p1') {
        this._playerTurn = 'p2';
      } else if (this._playerTurn === 'p2') {
        this._playerTurn = 'p1';
      }
    } else if (this._playerCount === 3) {
      // p1 -> p2 -> p3 -> p1 -> p2 -> p3 -> ...
      if (this._playerTurn === 'p1') {
        this._playerTurn = 'p2';
      } else if (this._playerTurn === 'p2') {
        this._playerTurn = 'p3';
      } else if (this._playerTurn === 'p3') {
        this._playerTurn = 'p1';
      }
    }
  }

  // 백업용 정보 추출
  getCurrentInfo() {
    return {
      p1Board: this._p1PointBoard,
      p2Board: this._p2PointBoard,
      p3Board: this._p3PointBoard,
      playerTurn: this._playerTurn,
    };
  }
}
