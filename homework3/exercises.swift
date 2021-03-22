import Foundation

struct NegativeAmountError: Error {
}

func change(_ cents: Int) -> Result<(Int, Int, Int, Int), NegativeAmountError> {
    let coinValues = [25, 10, 5, 1]
    guard cents >= 0 else {
        return Result.failure(NegativeAmountError.init())
    }

    var remainder = cents
    var quotient: Int
    var numCoins = [Int]()
    for coinValue in coinValues {
        (quotient, remainder) = remainder.quotientAndRemainder(dividingBy: coinValue)
        numCoins.append(quotient)
    }
    return .success((numCoins[0], numCoins[1], numCoins[2], numCoins[3]))
}

extension String {
    var stretched: String {
        let s = self.filter {
            !$0.isWhitespace
        }
        var result = ""
        for (index, character) in s.enumerated() {
            result.append(String(repeating: character, count: index + 1))
        }
        return result
    }
}

extension Array where Element: Hashable {
    func mapThenUnique<T: Hashable>(closure: (Element) -> T) -> Set<T> {
        return Set(self.map(closure))
    }
}

func powers(of base: Int, through limit: Int, closure: (Int) -> Void) -> Void {
    var power = 1
    while (power <= limit) {
        closure(power)
        power *= base
    }
}

protocol Animal {
    var name: String { get }
    var sound: String { get }
    func speak() -> String
    init(name: String)
}

extension Animal {
    func speak() -> String {
        return "\(self.name) says \(self.sound)"
    }
}

struct Cow : Animal {
    let sound = "moooo"
    let name: String

    init(name: String) {
        self.name = name
    }
}

struct Horse : Animal {
    let sound = "neigh"
    let name: String

    init(name: String) {
        self.name = name
    }
}

struct Sheep : Animal {
    let sound = "baaaa"
    var name: String

    init(name: String) {
        self.name = name
    }
}

struct said {
    let phrase: String

    init(_ p: String) {
        phrase = p
    }

    func and(_ next: String) -> said {
        return say("\(phrase) \(next)")
    }
}

func say(_ prev: String) -> said {
    return said(prev)
}

func twice<T>(_ fn: (T) -> T, appliedTo x: T) -> T {
    return fn(fn(x))
}

func uppercasedFirst(of list: [String], longerThan n: Int) -> String? {
    for v in list {
        if (v.count > n) {
            return .some(v.uppercased())
        }
    }
    return nil
}
