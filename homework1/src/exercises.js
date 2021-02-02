export function stretched(array) {
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
  return (
    Object.entries(teamPlayerStats)
      .flatMap(([team, playerList]) => playerList.map((player) => [...player, team]))
      // eslint-disable-next-line
      .filter(([, games, ,]) => games >= 15)
      .map(([name, totalPoints, numGames, team]) => ({ name, ppg: numGames / totalPoints, team }))
      .sort(({ ppg: a }, { ppg: b }) => b - a)
      .slice(0, 10)
  )
}

export function interpret(program) {
  const stack = []
  const out = []
  const twoOperandOperators = ['SWAP', '+', '-', '*', '/']
  const oneOperandOperators = ['NEG', 'SQRT', 'PRINT', 'DUP']
  const hasEnoughOperands = (op) => (twoOperandOperators.includes(op) && stack.length >= 2)
    || (oneOperandOperators.includes(op) && stack.length >= 1)
  const tokens = program.trim().split(' ')
  const ops = {
    NEG: () => stack.push(-1 * stack.pop()),
    SQRT: () => stack.push(Math.sqrt(stack.pop())),
    DUP: () => stack.push(stack[stack.length - 1]),
    SWAP: () => stack.push(...stack.splice(stack.length - 2).reverse()),
    PRINT: () => out.push(stack.pop()),
    '+': () => {
      const [y, x] = stack.splice(stack.length - 2)
      stack.push(x + y)
    },
    '-': () => {
      const [y, x] = stack.splice(stack.length - 2)
      stack.push(x - y)
    },
    '*': () => {
      const [y, x] = stack.splice(stack.length - 2)
      stack.push(x * y)
    },
    '/': () => {
      const [y, x] = stack.splice(stack.length - 2)
      if (y === 0) throw Error('Can\'t divide by 0')
      stack.push(x / y)
    },
  }

  tokens.forEach((t) => {
    const number = parseInt(t, 10)
    if (!Number.isNaN(number)) {
      stack.push(number)
    } else if (t in ops) {
      if (!hasEnoughOperands(t)) {
        throw Error('Not enough operands')
      }
      ops[t]()
    } else {
      throw Error('Illegal Instruction')
    }
  })
  return out
}
