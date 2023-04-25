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

  get scoreToWin() {
    return this._scoreToWIn;
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

  startMatch({ matchType, p1Info, p2Info, gameInfo, dicesInfo } = {}) {
    this.initializeMatch(matchType);
    this.initializePlayers(p1Info, p2Info);
    this.initializeGame(gameInfo);
    this.initializeDices(dicesInfo);
  }
  startNextGame({ shouldSwap = false }) {
    if (shouldSwap) this.swapPlayer();
    this.initializeGame();
    this.initializeDices();
  }

  initializeMatch(matchType = 'single') {
    this._matchType = matchType;
    this._scoreToWIn = WIN_SCORE_MAP[matchType];
  }
  initializePlayers(p1Info, p2Info) {
    this._player1 = new Player({ name: p1Info?.name, score: p1Info?.score });
    this._player2 = new Player({ name: p2Info?.name, score: p2Info?.score });
  }
  initializeGame(gameInfo) {
    this._game = new Game(gameInfo);
  }
  initializeDices(dicesInfo) {
    this._dices = [];
    for (let idx = 0; idx < DICE_NUM; idx++) {
      const index = idx + 1;
      const newDice = new Dice({ ...{ index }, ...dicesInfo?.[idx] });
      this._dices.push(newDice);
    }
  }

  swapPlayer() {
    const p1Info = { ...this._player1.getCurrentInfo() };
    const p2Info = { ...this._player2.getCurrentInfo() };
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
    this._matchType = '';
    this._scoreToWIn = 0;
    this._player1 = null;
    this._player2 = null;
    this._game = null;
    this._dices = [];
    localStorage.removeItem('yacht-dice-snapshot');
  }

  // Game, Player, Dices 등 게임 내 모든 정보를 로컬스토리자로 저장
  saveMatch() {
    const currentMatchInfo = {
      matchType: this._matchType,
      gameInfo: this._game.getCurrentInfo(),
      p1Info: this._player1.getCurrentInfo(),
      p2Info: this._player2.getCurrentInfo(),
      dicesInfo: this._dices.map((dice) => dice.getCurrentInfo()),
    };
    localStorage.setItem('yacht-dice-snapshot', JSON.stringify(currentMatchInfo));
  }
}
