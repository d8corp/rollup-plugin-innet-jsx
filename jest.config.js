module.exports = {
  transform: {
    '\\.(ts|jsx|tsx)$': 'innet-jest'
  },
  testEnvironment: 'jsdom',
  setupFiles: ['core-js'],
}
