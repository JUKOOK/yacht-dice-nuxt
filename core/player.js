export default class Player {
  constructor({ name, score = 0 } = {}) {
    this._name = name;
    this._score = score;
  }
  get name() {
    return this._name;
  }
  get score() {
    return this._score;
  }

  setName(newName) {
    this._name = newName;
  }
  incrementScore() {
    this._score += 1;
  }
  isMatchWinner(winToScore) {
    return this._score >= winToScore;
  }

  // 정보 추출
  getCurrentInfo() {
    return {
      name: this._name,
      score: this._score,
    };
  }
}
