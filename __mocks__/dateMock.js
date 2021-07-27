

const RealDate = Date;

class MockDate {
  static getRealDate() {
    return RealDate;
  }
  constructor(y = 2021, m = 0, d = 1) {
    this.RealDate = MockDate.getRealDate();
    this.mockDate = new RealDate(y, m, 1);
    return this.mockDate;
  }
  now() {
    return this.mockDate.now();
  }
  getDay() {
    return this.mockDate.getDay();
  }
  getDate() {
    return this.mockDate.getDate();
  }
  getTime() {
    return this.mockDate.getTime();
  }
  getFullYear() {
    return this.mockDate.getFullYear();
  }
  getMonth() {
    return this.mockDate.getMonth();
  }
  setDate(...args) {
    return this.mockDate.setDate(...args);
  }
  setHours(...args) {
    return this.mockDate.setHours(...args);
  }
  static UTC(...args) {
    return MockDate.getRealDate().UTC(...args);
  }
  setFullYear(...args) {
    return this.mockDate.setFullYear(...args);
  }
}


MockDate.constructor = Date.constructor;
export default MockDate;