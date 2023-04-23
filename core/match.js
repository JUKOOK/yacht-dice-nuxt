import Player from './player';
import Game from './game';
import Dice from './dice';

const DICE_NUM = 5;
const WIN_SCORE_MAP = {
  single: 1,
  '3of2': 2,
  '5of3': 3,
};
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

export default class Match {
  constructor() {
    this._matchType = ''; // 'single', '3of2', '5of3'
    // this._matchStatus = 'before-create'; // enum
    this._scoreToWIn = 0;
    this._currentGameSet = 0; // 1세트
    this._game = null;
    this._player1 = null;
    this._player2 = null;
    this._dices = [];
  }

  // get matchInfo() {
  //   return this;
  // }
  get matchScore() {
    return [this._player1.score, this._player2.score];
  }
  get player1Name() {
    return this._player1?.name || '플레이어 1';
  }
  get player2Name() {
    return this._player2?.name || '플레이어 2';
  }
  get p1PointBoard() {
    return this._game?.p1PointBoard || { ...POINT_BOARD };
  }
  get p2PointBoard() {
    return this._game?.p2PointBoard || { ...POINT_BOARD };
  }
  get currentTurn() {
    return this._game?.currentTurn || 'p1';
  }
  get dices() {
    return this._dices;
  }

  // get playerTurn() {
  //   return this._game.playerTurn;
  // }

  startMatch({ p1Name, p2Name, matchType = 'single' } = {}) {
    this.initializeMatch(matchType);
    this.initializePlayers(p1Name, p2Name);
    this.initializeDices();
  }

  initializeMatch(matchType) {
    this._matchType = matchType;
    this._scoreToWIn = WIN_SCORE_MAP[matchType];
    this._currentGameSet = 1;
    this._game = new Game({ p1Board: POINT_BOARD, p2Board: POINT_BOARD });
  }
  initializePlayers(p1Name, p2Name) {
    this._player1 = new Player({ name: p1Name, score: 0 });
    this._player2 = new Player({ name: p2Name, score: 0 });
  }
  initializeDices() {
    for (let index = 1; index <= DICE_NUM; index++) {
      const newDice = new Dice({ index });
      this._dices.push(newDice);
    }
  }

  endMatch() {} // 매치 종료. 최종 결과 반환..?

  // loadMatch: 이전 로컬스토리지 저장된 데이터로 매치 전체 복구
  // saveMatch: Game, Player, Dices 모든 정보를 로컬스토리로 저장
}
