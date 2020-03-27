module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.html$': '<rootDir>/jest.html-loader.js',
    '\\.(css|less|svg)$': '<rootDir>/jest.style-loader.js'
  }
};
