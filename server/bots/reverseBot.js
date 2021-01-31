

module.exports = (text) => {
  const answer = text.split('').reverse().join('')

  return new Promise(resolve => {
    setTimeout(() => resolve(answer), 3000)
  })
}
