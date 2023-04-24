import Player from './player';
import Game from './game';
import Dice from './dice';

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
    this._player1 = null;
    this._player2 = null;
    this._game = null;
    this._dices = [];
  }

  get player1Name() {
    return this._player1?.name ?? '플레이어 1';
  }
  get player1Score() {
    return this._player1?.score ?? 0;
  }
  get player2Name() {
    return this._player2?.name ?? '플레이어 2';
  }
  get player2Score() {
    return this._player2?.score ?? 0;
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

  get currentGameWinner() {
    return this._game?.gameWinner;
  }
  get isGameEnd() {
    return !!this.currentGameWinner;
  }
  get matchWinner() {
    if (this._player1.isMatchWinner(this._scoreToWIn)) return 'p1';
    else if (this._player2.isMatchWinner(this._scoreToWIn)) return 'p2';
    else return null;
  }
  get isMatchEnd() {
    return !!this.matchWinner;
  }

  startMatch({ p1Name, p2Name, matchType = 'single' } = {}) {
    this.initializeMatch(matchType);
    this.initializePlayers(p1Name, p2Name);
    this.initializeGame();
    this.initializeDices();
  }
  startNextGame({ shouldSwap = false }) {
    if (shouldSwap) this.swapPlayer();
    this.initializeGame();
    this.initializeDices();
  }

  initializeMatch(matchType) {
    this._matchType = matchType;
    this._scoreToWIn = WIN_SCORE_MAP[matchType];
  }
  initializePlayers(p1Name, p2Name) {
    this._player1 = new Player({ name: p1Name, score: 0 });
    this._player2 = new Player({ name: p2Name, score: 0 });
  }
  initializeGame(playerTurn) {
    this._game = new Game({ playerTurn });
  }
  initializeDices() {
    this._dices = [];
    for (let index = 1; index <= DICE_NUM; index++) {
      const newDice = new Dice({ index });
      this._dices.push(newDice);
    }
  }

  swapPlayer() {
    const p1Info = { ...this._player1.getPlayerInfo() };
    const p2Info = { ...this._player2.getPlayerInfo() };
    console.log(p1Info);
    console.log(p2Info);
    this._player1 = new Player(p2Info);
    this._player2 = new Player(p1Info);
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

  endGame() {
    if (this.currentGameWinner === 'p1') this._player1.incrementScore();
    else if (this.currentGameWinner === 'p2') this._player2.incrementScore();
  }
  endMatch() {
    window.location.reload();
  }

  // loadMatch: 이전 로컬스토리지 저장된 데이터로 게임 전체 복구
  // saveMatch: Game, Player, Dices 모든 정보를 로컬스토리로 저장
}
