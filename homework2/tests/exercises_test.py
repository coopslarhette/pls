import re
import math
import pytest
from exercises import stretched, powers, say, top_ten_scorers, interpret


def test_stretched():
    assert stretched([]) == []
    assert stretched([1]) == [1]
    assert stretched([10, 20]) == [10, 20, 20]
    assert stretched([5, 8, 3, 2]) == [5, 8, 8, 3, 3, 3, 2, 2, 2, 2]


def test_powers():
    p = powers(2, 10)
    assert next(p) == 1
    assert next(p) == 2
    assert next(p) == 4
    assert next(p) == 8
    with pytest.raises(StopIteration):
        next(p)
    assert list(powers(2, -5)) == []
    assert list(powers(7, 0)) == []
    assert list(powers(3, 1)) == [1]
    assert list(powers(2, 63)) == [1, 2, 4, 8, 16, 32]
    assert list(powers(2, 64)) == [1, 2, 4, 8, 16, 32, 64]


def test_say():
    assert say() == ''
    assert say('hi')() == 'hi'
    assert say('hi')('there')() == 'hi there'
    assert say('hello')('my')('name')('is')(
        'Colette')() == 'hello my name is Colette'


def test_top_ten_scorers():
    assert top_ten_scorers({}) == []
    assert top_ten_scorers({'T1': [['A', 3, 300]]}) == []
    input = {'T1': [['A', 30, 300]]}
    expected = [{'name': 'A', 'ppg': 10, 'team': 'T1'}]
    assert top_ten_scorers(input) == expected
    input = {
        'ATL': [
            ['Betnijah Laney', 16, 263],
            ['Courtney Williams', 14, 193],
        ],
        'CHI': [
            ['Kahleah Copper', 17, 267],
            ['Allie Quigley', 17, 260],
            ['Courtney Vandersloot', 17, 225],
        ],
        'CONN': [
            ['DeWanna Bonner', 16, 285],
            ['Alyssa Thomas', 16, 241],
        ],
        'DAL': [
            ['Arike Ogunbowale', 16, 352],
            ['Satou Sabally', 12, 153],
        ],
        'IND': [
            ['Kelsey Mitchell', 16, 280],
            ['Tiffany Mitchell', 13, 172],
            ['Candice Dupree', 16, 202],
        ],
        'LA': [
            ['Nneka Ogwumike', 14, 172],
            ['Chelsea Gray', 16, 224],
            ['Candace Parker', 16, 211],
        ],
        'LV': [
            ['A’ja Wilson', 15, 304],
            ['Dearica Hamby', 15, 188],
            ['Angel McCoughtry', 15, 220],
        ],
        'MIN': [
            ['Napheesa Collier', 16, 262],
            ['Crystal Dangerfield', 16, 254],
        ],
        'NY': [
            ['Layshia Clarendon', 15, 188]
        ],
        'PHX': [
            ['Diana Taurasi', 13, 236],
            ['Brittney Griner', 12, 212],
            ['Skylar Diggins-Smith', 16, 261],
            ['Bria Hartley', 13, 190],
        ],
        'SEA': [
            ['Breanna Stewart', 16, 317],
            ['Jewell Loyd', 16, 223],
        ],
        'WSH': [
            ['Emma Meesseman', 13, 158],
            ['Ariel Atkins', 15, 212],
            ['Myisha Hines-Allen', 15, 236],
        ],
    }
    expected = [
        {'name': 'Arike Ogunbowale', 'ppg': 22, 'team': 'DAL'},
        {'name': 'A’ja Wilson', 'ppg': 20.266666666666666, 'team': 'LV'},
        {'name': 'Breanna Stewart', 'ppg': 19.8125, 'team': 'SEA'},
        {'name': 'DeWanna Bonner', 'ppg': 17.8125, 'team': 'CONN'},
        {'name': 'Kelsey Mitchell', 'ppg': 17.5, 'team': 'IND'},
        {'name': 'Betnijah Laney', 'ppg': 16.4375, 'team': 'ATL'},
        {'name': 'Napheesa Collier', 'ppg': 16.375, 'team': 'MIN'},
        {'name': 'Skylar Diggins-Smith', 'ppg': 16.3125, 'team': 'PHX'},
        {'name': 'Crystal Dangerfield', 'ppg': 15.875, 'team': 'MIN'},
        {'name': 'Myisha Hines-Allen', 'ppg': 15.733333333333333, 'team': 'WSH'}]
    assert top_ten_scorers(input) == expected


def test_interpret():
    assert [*interpret('1')] == []
    assert [*interpret('3 8 7 + PRINT 10 SWAP - PRINT')] == [15, -7]
    assert [*interpret('99 DUP * PRINT')] == [9801]
    with pytest.raises(ValueError):
        [*interpret('2 TIMES SWAP -')]
    with pytest.raises(ValueError):
        [*interpret('DUP')]