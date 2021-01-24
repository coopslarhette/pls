import { deepStrictEqual, throws } from 'assert'
import {
  interpret, powers, say, stretched, topTenScorers,
// eslint-disable-next-line import/extensions
} from '../src/exercises.js'

describe('stretched', () => {
  it('stretches okay', () => {
    deepStrictEqual(stretched([]), [])
    deepStrictEqual(stretched([1]), [1])
    deepStrictEqual(stretched([10, 20]), [10, 20, 20])
    deepStrictEqual(stretched([5, 8, 3, 2]), [5, 8, 8, 3, 3, 3, 2, 2, 2, 2])
    deepStrictEqual(stretched(['a', 'b']), ['a', 'b', 'b'])
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

describe('The powers generator', () => {
  it('works as expected', () => {
    const g1 = powers(2, 1)
    deepStrictEqual(g1.next(), { value: 1, done: false })
    deepStrictEqual(g1.next(), { value: undefined, done: true })
    const g2 = powers(3, 100)
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
    deepStrictEqual([...interpret('1')], [])
    deepStrictEqual([...interpret('3 8 7 + PRINT 10 SWAP - PRINT')], [15, -7])
    deepStrictEqual([...interpret('99 DUP * PRINT')], [9801])
    throws(() => [...interpret('2 TIMES SWAP -')], /Illegal Instruction/)
    throws(() => [...interpret('DUP')], /Not enough operands/)
  })
})
