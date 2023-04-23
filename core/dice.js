import { eyeEnum } from '~/constants/enum';

export default class Dice {
  constructor({ eye = eyeEnum.Blank, isFixed = false, index } = {}) {
    this._eye = eye; // 눈
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
    this._eye = eyeEnum[eye];
  }
  rollUpEye() {
    switch (this._eye) {
      case eyeEnum.One:
        this._eye = eyeEnum.Two;
        break;
      case eyeEnum.Two:
        this._eye = eyeEnum.Three;
        break;
      case eyeEnum.Three:
        this._eye = eyeEnum.Four;
        break;
      case eyeEnum.Four:
        this._eye = eyeEnum.Five;
        break;
      case eyeEnum.Five:
        this._eye = eyeEnum.Six;
        break;
      case eyeEnum.Six:
      case eyeEnum.Blank:
        this._eye = eyeEnum.One;
        break;
    }
  }
  rollDownEye() {
    switch (this._eye) {
      case eyeEnum.One:
      case eyeEnum.Blank:
        this._eye = eyeEnum.Six;
        break;
      case eyeEnum.Two:
        this._eye = eyeEnum.One;
        break;
      case eyeEnum.Three:
        this._eye = eyeEnum.Two;
        break;
      case eyeEnum.Four:
        this._eye = eyeEnum.Three;
        break;
      case eyeEnum.Five:
        this._eye = eyeEnum.Four;
        break;
      case eyeEnum.Six:
        this._eye = eyeEnum.Five;
        break;
    }
  }
  reset() {
    this._eye = eyeEnum.Blank; // 눈
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
