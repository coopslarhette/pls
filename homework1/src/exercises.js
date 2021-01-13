module.exports = {
  stretched(s) {
    return [...s].reduce((acc, currValue, index) => acc + currValue.repeat(index + 1), '')
  },
}
