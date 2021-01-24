function say() {}

function powers() {}

function stretched(array) {
  const repeat = (el, n, arr) => (n > 0 ? repeat(el, n - 1, [...arr, el]) : arr)
  function recurse(base, n, prev) {
    const element = base[0]
    if (base && base.length > 0) {
      return recurse(base.slice(1), n + 1, [...prev, ...repeat(element, n, [])])
    }
    return prev
  }
  return recurse(array, 1, [])
}

function topTenScorers() {}

function interpret() {}

export {
  say, powers, stretched, topTenScorers, interpret,
}
