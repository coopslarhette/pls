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


def interpret():
    return None
