export function stretched(array) {
  // const repeat = (el, n, arr) => (n > 0 ? repeat(el, n - 1, [...arr, el]) : arr) hmmm which is better
  function recurse(source, n, previous) {
    if (source?.length > 0) {
      return recurse(source.slice(1), n + 1, [...previous, ...Array(n).fill(source[0])])
    }
    return previous
  }
  return recurse(array, 1, [])
}

export function* powers(base, limit) {
  for (let i = 0; base ** i <= limit; i += 1) {
    yield base ** i
  }
}

export function say(previous) {
  if (previous) {
    return (current) => (current ? say(`${previous} ${current}`) : previous)
  }
  return ''
}

export function topTenScorers(teamPlayerStats) {
  return Object.entries(teamPlayerStats)
    .flatMap(([team, playerList]) => playerList.map((player) => [...player, team]))
    // eslint-disable-next-line
    .filter(([ , games, , ]) => games >= 15)
    .map((player) => ({ name: player[0], ppg: player[2] / player[1], team: player[3] }))
    .sort(({ ppg: a }, { ppg: b }) => b - a)
    .slice(0, 10)
}

export function interpret() {}
