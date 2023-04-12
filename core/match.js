// import { ref } from 'vue';
// import { wait } from '@as/utils';
import Player from './player';
import Game from './game';
import Dice from './dice';

export default class Match {
  constructor() {
    this._matchType = ''; // enum?
    this._matchStatus = 'wait'; // enum
    this._currentGameSet = 1; // 1세트
    this._scoreToWIn = 0;

    this._player1 = null;
    this._player2 = null;
    this._game = null;
    this._dices = [];
  }

  get matchScore() {
    return [this._player1.score, this._player2.score]
  }

  startMatch() {
    // name, type 받아서 시작 (match 세팅) -> 인터페이스
  }
  initializeMatch() {
    // matchType, winnerScore, game 세팅
    // 정보로부터 match 세팅
  }

  initializeGame()  //  games 세팅
  initializePlayers() // player1, player2 세팅
  initializeDices() // dice 들

  endMatch() {} // 매치 종료. 최종 결과 반환..?

// loadMatch: 이전 로컬스토리지 저장된 데이터로 매치 전체 복구
// saveMatch: Game, Player, Dices 모든 정보를 로컬스토리로 저장
}
