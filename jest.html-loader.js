/* eslint-disable import/no-extraneous-dependencies */
const htmlLoader = require('html-loader');

module.exports = {
  process(src) {
    return htmlLoader(src);
  }
};
