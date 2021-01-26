function stretched(array) {
  const repeat = (el, n, arr) => (n > 0 ? repeat(el, n - 1, [...arr, el]) : arr)
  function recurse(base, n, prev) {
    if (base?.length > 0) {
      return recurse(base.slice(1), n + 1, [...prev, ...repeat(base[0], n, [])])
    }
    return prev
  }
  return recurse(array, 1, [])
}

function* powers(base, limit) {
  for (let i = 0; base ** i <= limit; i += 1) {
    yield base ** i
  }
}

function say(previous) {
  if (previous) {
    return (current) => (current ? say(`${previous} ${current}`) : previous)
  }
  return ''
}

function topTenScorers(teamPlayerStats) {
  return Object.entries(teamPlayerStats)
    .flatMap(([team, playerList]) => playerList.map((player) => [...player, team]))
    .filter((player) => player[1] >= 15)
    .map((player) => ({ name: player[0], ppg: player[2] / player[1], team: player[3] }))
    .sort(({ ppg: a }, { ppg: b }) => b - a)
    .slice(0, 10)
}

function interpret() {}

export {
  say, powers, stretched, topTenScorers, interpret,
}
