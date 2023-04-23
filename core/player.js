export default class Player {
  constructor({ name, score } = {}) {
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
    return _score;
  }

  // 정보 추출
  getPlayerInfo() {
    return {
      name: this._name,
      score: this._score,
    };
  }
}
