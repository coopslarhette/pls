import {
  ok, deepStrictEqual, match, throws, fail,
} from 'assert'

import {
  stretched,
  scramble,
  say,
  powers,
  powersGenerator,
  topTenScorers,
  interpret,
} from '../src/exercises'

describe('stretched', () => {
  it('works on the empty string', () => {
    deepStrictEqual(stretched(''), '')
  })

  it('stretches non-empty strings property', () => {
    deepStrictEqual(stretched('H e   l\t\tlo'), 'Heelllllllooooo')
    deepStrictEqual(stretched('$#'), '$##')
    deepStrictEqual(stretched('       '), '')
    deepStrictEqual(stretched('A = πr²'), 'A==πππrrrr²²²²²')
  })
})

describe('scramble', () => {
  function anagramsOfEachOther(s, t) {
    return s.split('').sort().join('') === t.split('').sort().join('')
  }

  it('scrambles properly', () => {
    ['a', 'rat', 'JavaScript testing', '', 'zzz', '^*^*)^▱ÄÈËɡɳɷ'].forEach((s) => {
      ok(anagramsOfEachOther(s, scramble(s)))
    })
  })

  it('is really random (produces all permutations)', () => {
    const possibilities = new Set('ABC ACB BAC BCA CAB CBA'.split(' '))
    for (let i = 0; i < 200; i += 1) {
      possibilities.delete(scramble('ABC'))
    }
    deepStrictEqual(possibilities.size, 0)
  })
})

describe('say', () => {
  it('works when there are no words', () => {
    deepStrictEqual(say(), '')
  })

  it('works when there are words', () => {
    deepStrictEqual(say('hi')(), 'hi')
    deepStrictEqual(say('hi')('there')(), 'hi there')
    deepStrictEqual(say('hello')('my')('name')('is')('Colette')(), 'hello my name is Colette')
  })

  it('handles spaces', () => {
    deepStrictEqual(say('h i')(), 'h i')
    deepStrictEqual(say('hi ')('   there')(), 'hi     there')
  })

  it('handles emojis', () => {
    deepStrictEqual(say('😄🤗')('💀👊🏾')(), '😄🤗 💀👊🏾')
  })
})

describe('powers', () => {
  function generatorToArray(generator, ...args) {
    const result = []
    generator(...args, (item) => result.push(item))
    return result
  }

  it('generates sequences of powers properly', () => {
    deepStrictEqual(generatorToArray(powers, 2, -5), [])
    deepStrictEqual(generatorToArray(powers, 7, 0), [])
    deepStrictEqual(generatorToArray(powers, 3, 1), [1])
    deepStrictEqual(generatorToArray(powers, 2, 63), [1, 2, 4, 8, 16, 32])
    deepStrictEqual(generatorToArray(powers, 2, 64), [1, 2, 4, 8, 16, 32, 64])
  })
})

describe('The powers generator', () => {
  it('works as expected', () => {
    const g1 = powersGenerator(2, 1)
    deepStrictEqual(g1.next(), { value: 1, done: false })
    deepStrictEqual(g1.next(), { value: undefined, done: true })
    const g2 = powersGenerator(3, 100)
    deepStrictEqual(g2.next(), { value: 1, done: false })
    deepStrictEqual(g2.next(), { value: 3, done: false })
    deepStrictEqual(g2.next(), { value: 9, done: false })
    deepStrictEqual(g2.next(), { value: 27, done: false })
    deepStrictEqual(g2.next(), { value: 81, done: false })
    deepStrictEqual(g2.next(), { value: undefined, done: true })
  })
})

describe('The topTenPlayers function', () => {
  it('handles an empty object', () => {
    deepStrictEqual(topTenScorers({}), [])
  })
  it('handles a small data set', () => {
    let input = { T1: [['A', 3, 300]] }
    let expected = []
    deepStrictEqual(topTenScorers(input), expected)
    input = { T1: [['A', 30, 300]] }
    expected = [{ name: 'A', ppg: 10, team: 'T1' }]
    deepStrictEqual(topTenScorers(input), expected)
  })
  it('handles a larger data set', () => {
    const input = {
      ATL: [
        ['Betnijah Laney', 16, 263],
        ['Courtney Williams', 14, 193],
      ],
      CHI: [
        ['Kahleah Copper', 17, 267],
        ['Allie Quigley', 17, 260],
        ['Courtney Vandersloot', 17, 225],
      ],
      CONN: [
        ['DeWanna Bonner', 16, 285],
        ['Alyssa Thomas', 16, 241],
      ],
      DAL: [
        ['Arike Ogunbowale', 16, 352],
        ['Satou Sabally', 12, 153],
      ],
      IND: [
        ['Kelsey Mitchell', 16, 280],
        ['Tiffany Mitchell', 13, 172],
        ['Candice Dupree', 16, 202],
      ],
      LA: [
        ['Nneka Ogwumike', 14, 172],
        ['Chelsea Gray', 16, 224],
        ['Candace Parker', 16, 211],
      ],
      LV: [
        ['A’ja Wilson', 15, 304],
        ['Dearica Hamby', 15, 188],
        ['Angel McCoughtry', 15, 220],
      ],
      MIN: [
        ['Napheesa Collier', 16, 262],
        ['Crystal Dangerfield', 16, 254],
      ],
      NY: [['Layshia Clarendon', 15, 188]],
      PHX: [
        ['Diana Taurasi', 13, 236],
        ['Brittney Griner', 12, 212],
        ['Skylar Diggins-Smith', 16, 261],
        ['Bria Hartley', 13, 190],
      ],
      SEA: [
        ['Breanna Stewart', 16, 317],
        ['Jewell Loyd', 16, 223],
      ],
      WSH: [
        ['Emma Meesseman', 13, 158],
        ['Ariel Atkins', 15, 212],
        ['Myisha Hines-Allen', 15, 236],
      ],
    }
    const expected = [
      { name: 'Arike Ogunbowale', ppg: 22, team: 'DAL' },
      { name: 'A’ja Wilson', ppg: 20.266666666666666, team: 'LV' },
      { name: 'Breanna Stewart', ppg: 19.8125, team: 'SEA' },
      { name: 'DeWanna Bonner', ppg: 17.8125, team: 'CONN' },
      { name: 'Kelsey Mitchell', ppg: 17.5, team: 'IND' },
      { name: 'Betnijah Laney', ppg: 16.4375, team: 'ATL' },
      { name: 'Napheesa Collier', ppg: 16.375, team: 'MIN' },
      { name: 'Skylar Diggins-Smith', ppg: 16.3125, team: 'PHX' },
      { name: 'Crystal Dangerfield', ppg: 15.875, team: 'MIN' },
      { name: 'Myisha Hines-Allen', ppg: 15.733333333333333, team: 'WSH' },
    ]
    deepStrictEqual(topTenScorers(input), expected)
  })
})

describe('interpret', () => {
  it('works for a variety of cases', () => {
    deepStrictEqual(interpret('5'), 5)
    deepStrictEqual(interpret('3 7 +'), 10)
    deepStrictEqual(interpret('2 5 * 20 SWAP -'), 10)
    /*
     * NOTE: I WILL ADD MORE TEST CASES LATER
     */
  })
})
