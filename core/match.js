import Player from './player';
import Game from './game';
import Dice from './dice';
import { statusEnum } from '~/constants/enum';

const DICE_NUM = 5;
const WIN_SCORE_MAP = {
  single: 1,
  '3of2': 2,
  '5of3': 3,
};
export default class Match {
  constructor() {
    this._matchType = ''; // 'single', '3of2', '5of3'
    this._scoreToWIn = 0;
    this._matchStatus = statusEnum.CREATE;
    this._currentGameSet = 0; // 1세트
    this._game = null;
    this._player1 = null;
    this._player2 = null;
    this._dices = [];
  }

  get matchStatus() {
    return this._matchStatus;
  }

  get matchScore() {
    return [this._player1.score, this._player2.score];
  }
  get player1Name() {
    return this._player1?.name ?? '플레이어 1';
  }
  get player2Name() {
    return this._player2?.name ?? '플레이어 2';
  }

  get playerTurn() {
    return this._game?.playerTurn ?? 'p1';
  }
  get p1MissionSum() {
    return this._game?.p1MissionSum ?? 0;
  }
  get p1MissionSuccess() {
    return this._game?.p1MissionSuccess ?? false;
  }
  get p1TotalSum() {
    return this._game?.p1TotalSum ?? 0;
  }
  get p2MissionSum() {
    return this._game?.p2MissionSum ?? 0;
  }
  get p2MissionSuccess() {
    return this._game?.p2MissionSuccess ?? false;
  }
  get p2TotalSum() {
    return this._game?.p2TotalSum ?? 0;
  }

  get dices() {
    return this._dices;
  }
  get eyes() {
    return this._dices.map((dice) => dice?.diceEye ?? 0);
  }
  get hasBlank() {
    if (!this._dices.length) return true;
    return this._dices.some((dice) => dice.diceEye === 0);
  }

  startMatch({ p1Name, p2Name, matchType = 'single' } = {}) {
    this.initializeMatch(matchType);
    this.initializePlayers(p1Name, p2Name);
    this.initializeDices();
  }

  initializeMatch(matchType) {
    this._matchType = matchType;
    this._scoreToWIn = WIN_SCORE_MAP[matchType];
    this._matchStatus = statusEnum.ONGOING;
    this._currentGameSet = 1;
    this._game = new Game();
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

  getPlayerPoint(playerTurn, category) {
    return this._game?.getPoint(playerTurn, category) ?? null;
  }
  setPlayerPoint(playerTurn, category, value) {
    this._game.setPoint(playerTurn, category, value);
  }
  toggleTurn() {
    this._game.toggleTurn();
  }
  resetDices() {
    this._dices.forEach((dice) => dice.reset());
  }

  checkEndGame() {
    const gameWinner = this._game?.gameWinner;
    if (!!gameWinner) this._matchStatus = statusEnum.GAME_END;
    return !!gameWinner;
  }
  endGame() {
    // 새 게임:
    // status 변경
    //
  }
  checkEndMatch() {
    // p1 과 p2 중 누군가가 _scoreToWIn 에 도달한 상태
    // this._matchStatus = statusEnum.MATCH_END;
  }

  endMatch() {} // 매치 종료. 최종 결과 반환..?

  // loadMatch: 이전 로컬스토리지 저장된 데이터로 매치 전체 복구
  // saveMatch: Game, Player, Dices 모든 정보를 로컬스토리로 저장
}
