
export const parseInputCode = (data) => {
	const lines = data.split('\n')
	lines.pop()
	return lines.map(l => l.split(''))
}

const corruptedScore = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137
}

const openingCharByClosing = {
	')': '(',
	']': '[',
	'}': '{',
	'>': '<',
}

const analyzeCode = (code) => {
	const analisys = {
		'corrupted': {
			')': 0,
			']': 0,
			'}': 0,
			'>': 0
		},
		'incomplete': {}
	}

	code.forEach(line => {
		const stack = []
		let index = 0
		let isCorrupted = false
		stack.unshift(line[index])
		index++
		while ((!isCorrupted || stack.length > 0) && index < line.length) {
			const currentChar = line[index]

			const lastOpen = stack[0]
			if (corruptedScore[currentChar]) {
				stack.shift()
				if (lastOpen !== openingCharByClosing[currentChar]) {
					analisys.corrupted[currentChar]++
					isCorrupted = true
				}
			}
			else {
				stack.unshift(currentChar)
			}
			index++
		}

	})
	return analisys
}

export const getCorruptedLines = (code) => {

	const { corrupted } = analyzeCode(code)
	return Object.entries(corrupted).reduce((acc, [k, v]) => acc += (corruptedScore[k] * v), 0)
}
