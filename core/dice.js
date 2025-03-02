import { eyeEnum, statusEnum } from '~/constants/dice';

export default class Dice {
  constructor({ eye = eyeEnum.BLANK, status = statusEnum.NONE, index } = {}) {
    this._eye = eye;
    this._status = status;
    this._index = index; // 1, 2, 3, 4, 5
  }
  get diceEye() {
    return this._eye;
  }
  get isActive() {
    return this._status === statusEnum.ACTIVE;
  }
  get isFixed() {
    return this._status === statusEnum.FIXED;
  }
  get index() {
    return this._index;
  }

  setActive(b) {
    this._status = b ? statusEnum.ACTIVE : statusEnum.NONE;
  }
  setFixed(b) {
    this._status = b ? statusEnum.FIXED : statusEnum.NONE;
  }

  rollUpEye() {
    if (!this.isActive) return;

    switch (this._eye) {
      case eyeEnum.ONE:
        this._eye = eyeEnum.TWO;
        break;
      case eyeEnum.TWO:
        this._eye = eyeEnum.THREE;
        break;
      case eyeEnum.THREE:
        this._eye = eyeEnum.FOUR;
        break;
      case eyeEnum.FOUR:
        this._eye = eyeEnum.FIVE;
        break;
      case eyeEnum.FIVE:
        this._eye = eyeEnum.SIX;
        break;
      case eyeEnum.SIX:
      case eyeEnum.BLANK:
        this._eye = eyeEnum.ONE;
        break;
    }
  }
  rollDownEye() {
    if (!this.isActive) return;

    switch (this._eye) {
      case eyeEnum.ONE:
      case eyeEnum.BLANK:
        this._eye = eyeEnum.SIX;
        break;
      case eyeEnum.TWO:
        this._eye = eyeEnum.ONE;
        break;
      case eyeEnum.THREE:
        this._eye = eyeEnum.TWO;
        break;
      case eyeEnum.FOUR:
        this._eye = eyeEnum.THREE;
        break;
      case eyeEnum.FIVE:
        this._eye = eyeEnum.FOUR;
        break;
      case eyeEnum.SIX:
        this._eye = eyeEnum.FIVE;
        break;
    }
  }
  reset(randomize = false) {
    if (randomize) {
      const eye = Math.floor(Math.random() * 6) + 1;
      switch (eye) {
        case 1:
          this._eye = eyeEnum.ONE;
          break;
        case 2:
          this._eye = eyeEnum.TWO;
          break;
        case 3:
          this._eye = eyeEnum.THREE;
          break;
        case 4:
          this._eye = eyeEnum.FOUR;
          break;
        case 5:
          this._eye = eyeEnum.FIVE;
          break;
        case 6:
          this._eye = eyeEnum.SIX;
          break;
      }
      this._status = statusEnum.NONE;
    } else {
      this._eye = eyeEnum.BLANK;
      this._status = statusEnum.NONE;
    }
  }

  // 백업용 정보 추출
  getCurrentInfo() {
    return {
      eye: this._eye,
      status: this._status,
      index: this._index,
    };
  }
}
