import Player from './player';
import Game from './game';
import Dice from './dice';

const DICE_NUM = 5;
const WIN_SCORE_MAP = {
  first1: 1,
  first2: 2,
  first3: 3,
};
export default class Match {
  constructor() {
    this._matchType = ''; // 'first1', 'first2', 'first3'
    this._scoreToWIn = 0;
    this._playerCount = 0;
    this._player1 = null;
    this._player2 = null;
    this._player3 = null;
    this._game = null;
    this._dices = [];
  }

  get scoreToWin() {
    return this._scoreToWIn;
  }
  get playerCount() {
    return this._playerCount;
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
  get player3Name() {
    return this._player3?.name ?? '플레이어 3';
  }
  get player3Score() {
    return this._player3?.score ?? 0;
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
  get p3MissionSum() {
    return this._game?.p3MissionSum ?? 0;
  }
  get p3MissionSuccess() {
    return this._game?.p3MissionSuccess ?? false;
  }
  get p3TotalSum() {
    return this._game?.p3TotalSum ?? 0;
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

  get currentGameWinnerName() {
    const gameWinner = this._game?.gameWinner;
    return gameWinner === 'p1'
      ? this.player1Name
      : gameWinner === 'p2'
      ? this.player2Name
      : gameWinner === 'p3'
      ? this.player3Name
      : null;
  }
  get isGameEnd() {
    const gameWinner = this._game?.gameWinner;
    return !!gameWinner;
  }
  get matchWinnerName() {
    if (this._player1.isMatchWinner(this._scoreToWIn)) return this.player1Name;
    else if (this._player2.isMatchWinner(this._scoreToWIn)) return this.player2Name;
    else if (this._player3.isMatchWinner(this._scoreToWIn)) return this.player3Name;
    else return null;
  }
  get isMatchEnd() {
    return !!this.matchWinnerName;
  }

  startMatch({ matchType, p1Info, p2Info, p3Info, gameInfo, dicesInfo } = {}) {
    this.initializeMatch(matchType, !!p3Info?.name);
    this.initializePlayers(p1Info, p2Info, p3Info);
    this.initializeGame(gameInfo);
    this.initializeDices(dicesInfo);
  }
  startNextGame({ shouldSwap = false }) {
    if (shouldSwap) this.swapPlayer();
    this.initializeGame();
    this.initializeDices();
  }

  initializeMatch(matchType = 'first1', hasPlayer3 = false) {
    this._matchType = matchType;
    this._scoreToWIn = WIN_SCORE_MAP[matchType];
    this._playerCount = hasPlayer3 ? 3 : 2;
  }
  initializePlayers(p1Info, p2Info, p3Info) {
    this._player1 = new Player({ name: p1Info?.name, score: p1Info?.score });
    this._player2 = new Player({ name: p2Info?.name, score: p2Info?.score });
    // player3가 없더라도 Player 객체를 생성.
    this._player3 = new Player({ name: p3Info?.name, score: p3Info?.score });
  }
  initializeGame(gameInfo) {
    this._game = new Game(gameInfo, this._playerCount);
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
    // p1과 p2만 있는 경우, p1과 p2를 swap
    // p1, p2, p3가 있는 경우, p2가 p1이 되고, p3가 p2가 되고, p1이 p3가 됨
    const p1Info = { ...this._player1.getCurrentInfo() };
    const p2Info = { ...this._player2.getCurrentInfo() };

    if (this._playerCount === 2) {
      this._player1 = new Player(p2Info);
      this._player2 = new Player(p1Info);
    } else if (this._playerCount == 3) {
      const p3Info = { ...this._player3.getCurrentInfo() };
      this._player1 = new Player(p2Info);
      this._player2 = new Player(p3Info);
      this._player3 = new Player(p1Info);
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
    // 개발환경에서는 randomize reset 한다.
    const randomize = process.env.NODE_ENV === 'development';
    this._dices.forEach((dice) => dice.reset(randomize));
  }

  endGame() {
    const gameWinner = this._game?.gameWinner;
    if (gameWinner === 'p1') this._player1.incrementScore();
    else if (gameWinner === 'p2') this._player2.incrementScore();
    else if (gameWinner === 'p3') this._player3.incrementScore();
  }
  endMatch() {
    this._matchType = '';
    this._scoreToWIn = 0;
    this._playerCount = 0;
    this._player1 = null;
    this._player2 = null;
    this._player3 = null;
    this._game = null;
    this._dices = [];
    localStorage.removeItem('yacht-dice-snapshot');
  }

  // Game, Player, Dices 등 게임 내 모든 정보를 로컬스토리지로 저장
  saveMatch() {
    const currentMatchInfo = {
      matchType: this._matchType,
      gameInfo: this._game.getCurrentInfo(),
      p1Info: this._player1.getCurrentInfo(),
      p2Info: this._player2.getCurrentInfo(),
      p3Info: this._player3.getCurrentInfo(),
      dicesInfo: this._dices.map((dice) => dice.getCurrentInfo()),
    };
    localStorage.setItem('yacht-dice-snapshot', JSON.stringify(currentMatchInfo));
  }
}
