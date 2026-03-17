require("@testing-library/jest-dom");

// jsdom に IntersectionObserver が存在しないため mock を設定
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};
