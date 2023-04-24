import { eyeEnum } from '~/constants/enum';

export default class Dice {
  constructor({ eye = eyeEnum.BLANK, isFixed = false, index } = {}) {
    this._eye = eye;
    this._isFixed = isFixed;
    this._index = index; // 1, 2, 3, 4, 5
  }
  get diceEye() {
    return this._eye;
  }
  get isFixed() {
    return this._isFixed;
  }
  get index() {
    return this._index;
  }

  toggleFixed() {
    this._isFixed = !this._isFixed;
  }
  setEye(eye) {
    const validEyes = Object.values(eyeEnum);
    if (!validEyes.includes(eye)) {
      console.error(`${eye} is not a valid eye.`);
      return;
    }
    this._eye = eye;
  }
  rollUpEye() {
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
  reset() {
    this._eye = eyeEnum.BLANK;
    this._isFixed = false;
  }

  // 정보 추출
  getDiceInfo() {
    return {
      eye: this._eye,
      isFixed: this._isFixed,
      index: this._index,
    };
  }
}
