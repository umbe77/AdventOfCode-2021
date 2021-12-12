
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

const incompletePoints = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4
}

const openingCharByClosing = {
	')': '(',
	']': '[',
	'}': '{',
	'>': '<',
}

const closingCharByOpening = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
}


const analyzeCode = (code) => {
	const analisys = {
		'corrupted': {
			')': 0,
			']': 0,
			'}': 0,
			'>': 0
		},
		'incomplete': []
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

		if (stack.length > 0 && !isCorrupted) {
			let score = 0
			let completionString = []
			while (stack.length) {
				const opening = stack.shift()
				const closing = closingCharByOpening[opening]
				completionString.push(closing)
				score = (score * 5) + incompletePoints[closing]
			}
			analisys.incomplete.push({ score, "completionString": completionString.join('') })
		}
	})
	return analisys
}

export const getCorruptedLines = (code) => {
	const { corrupted } = analyzeCode(code)
	return Object.entries(corrupted).reduce((acc, [k, v]) => acc += (corruptedScore[k] * v), 0)
}

export const getIncompleteLines = (code) => {
	const { incomplete } = analyzeCode(code)
	const length = incomplete.length
	return incomplete.sort((a, b) => a.score - b.score)[(length - 1) / 2].score
}
