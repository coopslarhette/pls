import math


def stretched(array):
    result = []
    for index, element in enumerate(array):
        result += [element] * (index + 1)
    return result


def powers(base, limit):
    power = 1
    while power <= limit:
        yield power
        power *= base


def say(first=''):
    if not first:
        return ''

    def r(second=''):
        return first if not second else say(f'{first} {second}')

    return r


def top_ten_scorers(data):
    player_list = []
    for team, players in data.items():
        players_by_team = [{'name': name, 'ppg': total_points / num_games, 'team': team} for
                           name, num_games, total_points in players if num_games >= 15]
        player_list += players_by_team
    top_ten_sorted = sorted(player_list, key=lambda player: player['ppg'], reverse=True)[:10]
    return top_ten_sorted


def interpret(program):
    stack = []
    tokens = program.split(' ')
    two_operand_operators = ['SWAP', '+', '-', '*', '/']
    one_operand_operators = ['NEG', 'SQRT', 'PRINT', 'DUP']
    has_enough_operands = lambda op: (op in two_operand_operators and len(stack) >= 2) or (
            op in one_operand_operators and len(stack) >= 1)
    ops = {
        'NEG': lambda: stack.append(-1 * stack.pop()),
        'SQRT': lambda: stack.append(math.sqrt(stack.pop())),
        'DUP': lambda: stack.append(stack[-1]),
        'SWAP': lambda: stack.extend([stack.pop(), stack.pop()]),
        '+': lambda: stack.append(stack.pop() + stack.pop()),
        '-': lambda: stack.append(stack.pop() - stack.pop()),
        '*': lambda: stack.append(stack.pop() * stack.pop()),
        '/': lambda: stack.append(stack.pop() / stack.pop()),
    }

    for t in tokens:
        if t.isdigit():
            stack.append(int(t))
        elif t in ops:
            if not has_enough_operands(t):
                raise ValueError('Not enough operands')
            ops[t]()
        elif t == 'PRINT':
            yield stack.pop()
        else:
            raise ValueError('Illegal instruction')
